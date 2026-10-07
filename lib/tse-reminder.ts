import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { daysLabel, daysUntil, formatDateDE, isReminderDue, reminderStage } from '@/lib/tse';

export type ReminderResult = {
  sent: boolean;
  due: number;
  pending: number;
  unreported: number;
  message: string;
};

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function smtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 587);
  return { host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } };
}

/**
 * Sendet eine Sammel-E-Mail über ablaufende TSE-Zertifikate.
 * Ohne `force` nur, wenn mindestens eine Kasse eine neue Stufe (90/60/30/14/7/0 Tage) erreicht hat.
 */
export async function runTseReminders({ force = false, now = new Date() } = {}): Promise<ReminderResult> {
  const registers = await prisma.cashRegister.findMany({
    include: { customer: { select: { name: true, phone: true } } },
  });

  const rows = registers
    .map((r) => ({ r, days: daysUntil(r.tseExpiry, now) }))
    .filter((x) => x.r.elsterStatus !== 'ABGEMELDET');

  const pending = rows
    .filter((x) => reminderStage(x.days) !== null)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0));
  const due = pending.filter((x) => isReminderDue(x.days, x.r.reminderStage));
  const unreported = rows.filter((x) => x.r.elsterStatus === 'OFFEN');

  const base = { due: due.length, pending: pending.length, unreported: unreported.length };

  if (!force && due.length === 0) {
    return { ...base, sent: false, message: 'Keine neuen Erinnerungen fällig' };
  }
  if (pending.length === 0 && unreported.length === 0) {
    return { ...base, sent: false, message: 'Nichts fällig – keine E-Mail gesendet' };
  }

  const config = smtpConfig();
  if (!config) {
    return { ...base, sent: false, message: 'SMTP ist nicht konfiguriert (SMTP_HOST, SMTP_USER, SMTP_PASS)' };
  }

  const dueIds = new Set(due.map((x) => x.r.id));
  const line = (x: (typeof rows)[number]) =>
    `<tr>
      <td style="padding:6px 10px;border-bottom:1px solid #eee">${dueIds.has(x.r.id) ? '<b>NEU</b> ' : ''}${esc(x.r.customer?.name)}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #eee">${esc(x.r.model)}${x.r.label ? ` (${esc(x.r.label)})` : ''}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #eee">${esc(x.r.tseSerial || x.r.serialNumber || '-')}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #eee">${esc(formatDateDE(x.r.tseExpiry))}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #eee;color:${(x.days ?? 1) < 0 ? '#b91c1c' : '#92400e'}">${esc(daysLabel(x.days))}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #eee">${esc(x.r.customer?.phone || '-')}</td>
    </tr>`;

  const table = (items: typeof rows) =>
    `<table style="border-collapse:collapse;font-size:14px;width:100%">
      <tr style="text-align:left;background:#f3f4f6">
        <th style="padding:6px 10px">Kunde</th><th style="padding:6px 10px">Kasse</th>
        <th style="padding:6px 10px">TSE / Seriennr.</th><th style="padding:6px 10px">Ablauf</th>
        <th style="padding:6px 10px">Status</th><th style="padding:6px 10px">Telefon</th>
      </tr>${items.map(line).join('')}</table>`;

  const html = `<div style="font-family:Arial,sans-serif;color:#111">
    <h2 style="margin:0 0 12px">TSE-Erinnerung – Teknosan</h2>
    ${pending.length ? `<h3 style="margin:16px 0 8px">TSE-Zertifikate (≤ 90 Tage oder abgelaufen): ${pending.length}</h3>${table(pending)}` : ''}
    ${unreported.length ? `<h3 style="margin:20px 0 8px">Finanzamt-Meldung offen: ${unreported.length}</h3>${table(unreported)}` : ''}
  </div>`;

  const text = [
    ...pending.map(
      (x) => `${dueIds.has(x.r.id) ? '[NEU] ' : ''}${x.r.customer?.name} – ${x.r.model} – TSE-Ablauf ${formatDateDE(x.r.tseExpiry)} (${daysLabel(x.days)})`
    ),
    ...(unreported.length ? ['', 'Finanzamt-Meldung offen:'] : []),
    ...unreported.map((x) => `${x.r.customer?.name} – ${x.r.model}`),
  ].join('\n');

  const expired = pending.filter((x) => (x.days ?? 0) < 0).length;
  const subject = `TSE-Erinnerung: ${pending.length} Kasse(n) fällig${expired ? `, ${expired} abgelaufen` : ''}`;

  await nodemailer.createTransport(config).sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.REMINDER_EMAIL || 'info@teknosan.de',
    subject,
    text,
    html,
  });

  // Erst nach erfolgreichem Versand merken, welche Stufe gemeldet wurde
  await Promise.all(
    due.map((x) =>
      prisma.cashRegister.update({
        where: { id: x.r.id },
        data: { reminderStage: reminderStage(x.days) },
      })
    )
  );

  return { ...base, sent: true, message: 'Erinnerung gesendet' };
}
