// Gemeinsame Logik für TSE-Ablaufdaten (Server und Client).

export const REMINDER_STAGES = [90, 60, 30, 14, 7, 0] as const;
export const ELSTER_STATUSES = ['OFFEN', 'GEMELDET', 'ABGEMELDET'] as const;
export type ElsterStatus = (typeof ELSTER_STATUSES)[number];

export const ELSTER_LABELS: Record<ElsterStatus, string> = {
  OFFEN: 'Meldung offen',
  GEMELDET: 'Gemeldet',
  ABGEMELDET: 'Abgemeldet',
};

export type TseStatus = 'ABGELAUFEN' | 'KRITISCH' | 'BALD' | 'OK' | 'UNBEKANNT';

const DAY_MS = 86_400_000;

/** 'YYYY-MM-DD' -> Date (UTC-Mitternacht), sonst null. */
export function parseDateInput(value?: string | null): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value) return null;
  return d;
}

/** Date/ISO-String -> 'YYYY-MM-DD' für <input type="date">. */
export function toDateInput(value?: Date | string | null): string {
  if (!value) return '';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

export function formatDateDE(value?: Date | string | null): string {
  const iso = toDateInput(value);
  if (!iso) return '-';
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

/** Heutiges Kalenderdatum in Berlin als UTC-Mitternacht. */
export function berlinToday(now: Date = new Date()): Date {
  const iso = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  return new Date(`${iso}T00:00:00.000Z`);
}

/** Tage bis zum Ablauf (negativ = abgelaufen), null ohne Datum. */
export function daysUntil(expiry?: Date | string | null, now: Date = new Date()): number | null {
  const iso = toDateInput(expiry);
  if (!iso) return null;
  const target = new Date(`${iso}T00:00:00.000Z`).getTime();
  return Math.round((target - berlinToday(now).getTime()) / DAY_MS);
}

export function tseStatus(days: number | null): TseStatus {
  if (days === null) return 'UNBEKANNT';
  if (days < 0) return 'ABGELAUFEN';
  if (days <= 30) return 'KRITISCH';
  if (days <= 90) return 'BALD';
  return 'OK';
}

export function daysLabel(days: number | null): string {
  if (days === null) return 'Kein Ablaufdatum';
  if (days < 0) return `Seit ${Math.abs(days)} ${Math.abs(days) === 1 ? 'Tag' : 'Tagen'} abgelaufen`;
  if (days === 0) return 'Läuft heute ab';
  return `Noch ${days} ${days === 1 ? 'Tag' : 'Tage'}`;
}

/** Kleinste Erinnerungsstufe, die bereits erreicht ist (null = noch nicht fällig). */
export function reminderStage(days: number | null): number | null {
  if (days === null) return null;
  let stage: number | null = null;
  for (const s of REMINDER_STAGES) if (days <= s) stage = s;
  return stage;
}

/** Fällig, wenn eine neue (kleinere) Stufe erreicht wurde als zuletzt gemeldet. */
export function isReminderDue(days: number | null, lastStage?: number | null): boolean {
  const stage = reminderStage(days);
  if (stage === null) return false;
  return lastStage === null || lastStage === undefined || stage < lastStage;
}
