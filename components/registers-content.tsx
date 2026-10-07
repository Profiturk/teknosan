'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Receipt, Plus, Search, Edit2, Trash2, X, Mail, CalendarClock, Hash, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  ELSTER_LABELS,
  ELSTER_STATUSES,
  type ElsterStatus,
  type TseStatus,
  daysLabel,
  daysUntil,
  formatDateDE,
  toDateInput,
  tseStatus,
} from '@/lib/tse';

interface CustomerOption {
  id: string;
  name: string;
}

interface Register {
  id: string;
  customerId: string;
  customer?: { id: string; name: string; phone: string | null; email: string | null };
  label: string | null;
  model: string;
  serialNumber: string | null;
  tseSerial: string | null;
  tseExpiry: string | null;
  installDate: string | null;
  elsterStatus: ElsterStatus;
  elsterDate: string | null;
  notes: string | null;
}

type Filter = 'ALLE' | 'ABGELAUFEN' | 'KRITISCH' | 'BALD' | 'MELDUNG';

const STATUS_STYLES: Record<TseStatus, { badge: string; border: string; label: string }> = {
  ABGELAUFEN: { badge: 'bg-red-100 text-red-700', border: 'border-l-red-500', label: 'Abgelaufen' },
  KRITISCH: { badge: 'bg-orange-100 text-orange-700', border: 'border-l-orange-500', label: 'Kritisch' },
  BALD: { badge: 'bg-amber-100 text-amber-700', border: 'border-l-amber-400', label: 'Bald fällig' },
  OK: { badge: 'bg-green-100 text-green-700', border: 'border-l-green-500', label: 'Gültig' },
  UNBEKANNT: { badge: 'bg-gray-100 text-gray-600', border: 'border-l-gray-300', label: 'Kein Datum' },
};

const ELSTER_STYLES: Record<ElsterStatus, string> = {
  OFFEN: 'bg-red-50 text-red-700',
  GEMELDET: 'bg-blue-50 text-blue-700',
  ABGEMELDET: 'bg-gray-100 text-gray-600',
};

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none';

const emptyForm = {
  customerId: '',
  model: '',
  label: '',
  serialNumber: '',
  tseSerial: '',
  tseExpiry: '',
  installDate: '',
  elsterStatus: 'OFFEN' as ElsterStatus,
  elsterDate: '',
  notes: '',
};

function RegisterModal({
  open,
  onClose,
  onSave,
  register,
  customers,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: typeof emptyForm) => Promise<void>;
  register: Register | null;
  customers: CustomerOption[];
}) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (register) {
      setForm({
        customerId: register.customerId ?? '',
        model: register.model ?? '',
        label: register.label ?? '',
        serialNumber: register.serialNumber ?? '',
        tseSerial: register.tseSerial ?? '',
        tseExpiry: toDateInput(register.tseExpiry),
        installDate: toDateInput(register.installDate),
        elsterStatus: register.elsterStatus ?? 'OFFEN',
        elsterDate: toDateInput(register.elsterDate),
        notes: register.notes ?? '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [register, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerId) { toast.error('Bitte einen Kunden auswählen'); return; }
    if (!form.model?.trim()) { toast.error('Kassenmodell ist erforderlich'); return; }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            {register ? 'Kasse bearbeiten' : 'Neue Kasse'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kunde *</label>
            <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} className={`${inputClass} bg-white`} required>
              <option value="">Kunde auswählen...</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kassenmodell *</label>
              <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="z.B. SAM4S SPS-2000" className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Standort / Bezeichnung</label>
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="z.B. Theke 1" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seriennummer Kasse</label>
              <input value={form.serialNumber} onChange={(e) => setForm({ ...form, serialNumber: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Installationsdatum</label>
              <input type="date" value={form.installDate} onChange={(e) => setForm({ ...form, installDate: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TSE-Seriennummer</label>
              <input value={form.tseSerial} onChange={(e) => setForm({ ...form, tseSerial: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TSE-Ablaufdatum</label>
              <input type="date" value={form.tseExpiry} onChange={(e) => setForm({ ...form, tseExpiry: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Finanzamt-Meldung (ELSTER)</label>
              <select value={form.elsterStatus} onChange={(e) => setForm({ ...form, elsterStatus: e.target.value as ElsterStatus })} className={`${inputClass} bg-white`}>
                {ELSTER_STATUSES.map((s) => <option key={s} value={s}>{ELSTER_LABELS[s]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meldedatum</label>
              <input type="date" value={form.elsterDate} onChange={(e) => setForm({ ...form, elsterDate: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notizen</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Abbrechen</button>
            <button type="submit" disabled={saving} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50">
              {saving ? 'Wird gespeichert...' : 'Speichern'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export function RegistersContent() {
  const [registers, setRegisters] = useState<Register[]>([]);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('ALLE');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Register | null>(null);
  const [sending, setSending] = useState(false);

  const fetchRegisters = useCallback(async (q = '') => {
    try {
      const res = await fetch(`/api/registers?search=${encodeURIComponent(q)}`);
      const data = await res.json();
      setRegisters(Array.isArray(data) ? data : []);
    } catch { setRegisters([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetch('/api/customers')
      .then((r) => r.json())
      .then((data) => {
        const list: CustomerOption[] = Array.isArray(data) ? data.map((c: any) => ({ id: c.id, name: c.name })) : [];
        setCustomers(list.sort((a, b) => a.name.localeCompare(b.name, 'de')));
      })
      .catch(() => setCustomers([]));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchRegisters(search), search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [search, fetchRegisters]);

  const rows = useMemo(
    () =>
      (registers ?? []).map((r) => {
        const days = daysUntil(r.tseExpiry);
        // Abgemeldete Kassen zählen nicht mehr als fällig
        const status: TseStatus = r.elsterStatus === 'ABGEMELDET' && days !== null ? 'OK' : tseStatus(days);
        return { r, days, status };
      }),
    [registers]
  );

  const counts = useMemo(
    () => ({
      ALLE: rows.length,
      ABGELAUFEN: rows.filter((x) => x.status === 'ABGELAUFEN').length,
      KRITISCH: rows.filter((x) => x.status === 'KRITISCH').length,
      BALD: rows.filter((x) => x.status === 'BALD').length,
      MELDUNG: rows.filter((x) => x.r.elsterStatus === 'OFFEN').length,
    }),
    [rows]
  );

  const visible = rows.filter((x) => {
    if (filter === 'ALLE') return true;
    if (filter === 'MELDUNG') return x.r.elsterStatus === 'OFFEN';
    return x.status === filter;
  });

  const handleSave = async (formData: typeof emptyForm) => {
    try {
      const url = editing ? `/api/registers/${editing.id}` : '/api/registers';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error);
      }
      toast.success(editing ? 'Kasse aktualisiert' : 'Kasse hinzugefügt');
      setModalOpen(false);
      setEditing(null);
      fetchRegisters(search);
    } catch (e: any) { toast.error(e?.message || 'Ein Fehler ist aufgetreten'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diese Kasse wirklich löschen?')) return;
    try {
      const res = await fetch(`/api/registers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Kasse gelöscht');
      fetchRegisters(search);
    } catch { toast.error('Ein Fehler ist aufgetreten'); }
  };

  const handleSendReminder = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/registers/remind', { method: 'POST' });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.sent) toast.success('Erinnerung per E-Mail gesendet');
      else toast.error(data?.message || data?.error || 'E-Mail konnte nicht gesendet werden');
    } catch { toast.error('E-Mail konnte nicht gesendet werden'); }
    finally { setSending(false); }
  };

  const tiles: { key: Filter; label: string; color: string }[] = [
    { key: 'ALLE', label: 'Kassen gesamt', color: 'text-gray-900' },
    { key: 'ABGELAUFEN', label: 'TSE abgelaufen', color: 'text-red-600' },
    { key: 'KRITISCH', label: 'Ablauf ≤ 30 Tage', color: 'text-orange-600' },
    { key: 'BALD', label: 'Ablauf ≤ 90 Tage', color: 'text-amber-600' },
    { key: 'MELDUNG', label: 'Meldung offen', color: 'text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-gray-900">Kassen & TSE</h1>
          <p className="text-sm text-gray-500 mt-1">TSE-Ablaufdaten und Finanzamt-Meldungen im Blick behalten</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSendReminder}
            disabled={sending}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <Mail className="w-4 h-4" /> {sending ? 'Wird gesendet...' : 'Erinnerung senden'}
          </button>
          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Neue Kasse
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tiles.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`text-left bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border-2 ${
              filter === t.key ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <div className={`text-2xl font-bold font-mono ${t.color}`}>{counts[t.key]}</div>
            <div className="text-xs text-gray-500 mt-1">{t.label}</div>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Kasse suchen (Kunde, Modell, Seriennummer)..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-white rounded-xl animate-pulse shadow-sm" />)}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            {rows.length === 0 ? 'Noch keine Kassen vorhanden' : 'Keine Kassen in dieser Ansicht'}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence>
            {visible.map(({ r, days, status }, i) => {
              const style = STATUS_STYLES[status];
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 1, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: Math.min(i, 10) * 0.03 }}
                  className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border-l-4 ${style.border}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {r.model}{r.label ? ` · ${r.label}` : ''}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.badge}`}>
                          {status === 'UNBEKANNT' || r.elsterStatus === 'ABGEMELDET' ? style.label : daysLabel(days)}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ELSTER_STYLES[r.elsterStatus] ?? ELSTER_STYLES.OFFEN}`}>
                          {ELSTER_LABELS[r.elsterStatus] ?? r.elsterStatus}
                          {r.elsterStatus !== 'OFFEN' && r.elsterDate ? ` · ${formatDateDE(r.elsterDate)}` : ''}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{r.customer?.name ?? '-'}</span>
                        <span className="flex items-center gap-1"><CalendarClock className="w-3 h-3" />TSE-Ablauf: {formatDateDE(r.tseExpiry)}</span>
                        {r.tseSerial && <span className="flex items-center gap-1"><Hash className="w-3 h-3" />TSE {r.tseSerial}</span>}
                        {r.serialNumber && <span className="flex items-center gap-1"><Hash className="w-3 h-3" />SN {r.serialNumber}</span>}
                      </div>
                      {r.notes && <p className="text-sm text-gray-500 mt-1 truncate">{r.notes}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditing(r); setModalOpen(true); }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <RegisterModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
        register={editing}
        customers={customers}
      />
    </div>
  );
}
