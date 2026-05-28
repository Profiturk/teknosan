'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ShoppingCart, Plus, Search, Edit2, Trash2, X, Calendar, User, Upload, FileSpreadsheet, CreditCard, Receipt, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Sale {
  id: string;
  productName: string;
  productDetails: string | null;
  price: number;
  quantity: number;
  totalAmount: number;
  saleDate: string;
  customerId: string;
  productId: string | null;
  taxType: string | null;
  paymentMethod: string | null;
  customer?: { id: string; name: string };
}

interface Customer { id: string; name: string; }
interface Product { id: string; name: string; description: string | null; width: string | null; length: string | null; price: number; }

// ─── Silme onay modal'ı ─────────────────────────────────────────────────────
function DeleteConfirmModal({
  open, onClose, onConfirm, itemName,
}: { open: boolean; onClose: () => void; onConfirm: () => void; itemName: string; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Verkauf löschen?</h2>
            <p className="text-sm text-gray-500 mt-0.5">„{itemName}" wird dauerhaft gelöscht.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Abbrechen
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
            Löschen
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Arama + seçim dropdown'u ───────────────────────────────────────────────
function SearchableSelect({ label, placeholder, items, value, onChange, required }: {
  label: string; placeholder: string; items: { id: string; name: string }[];
  value: string; onChange: (id: string) => void; required?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedItem = items.find(i => i.id === value);
  const filtered = query.trim() ? items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())) : items;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white flex items-center gap-2 cursor-text ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}`}
        onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}
      >
        <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? query : (selectedItem?.name ?? '')}
          onChange={(e) => { setQuery(e.target.value); if (!isOpen) setIsOpen(true); }}
          onFocus={() => { setIsOpen(true); setQuery(''); }}
          placeholder={selectedItem ? selectedItem.name : placeholder}
          className="flex-1 outline-none bg-transparent text-sm min-w-0"
        />
        {value && (
          <button type="button" onClick={(e) => { e.stopPropagation(); onChange(''); setQuery(''); }} className="p-0.5 hover:bg-gray-100 rounded">
            <X className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-400">Kein Ergebnis</div>
          ) : (
            filtered.map(item => (
              <button key={item.id} type="button"
                onClick={() => { onChange(item.id); setQuery(''); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${item.id === value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
              >
                {item.name}
              </button>
            ))
          )}
        </div>
      )}
      {required && <input type="text" value={value} required tabIndex={-1} className="absolute opacity-0 h-0 w-0 pointer-events-none" onChange={() => {}} />}
    </div>
  );
}

// ─── Satış formu modal'ı ────────────────────────────────────────────────────
function SaleModal({ open, onClose, onSave, sale, customers, products }: {
  open: boolean; onClose: () => void; onSave: (data: any) => void;
  sale: Sale | null; customers: Customer[]; products: Product[];
}) {
  const [form, setForm] = useState({
    productName: '', productDetails: '', price: '', quantity: '1',
    saleDate: new Date().toISOString().split('T')[0], customerId: '',
    productId: '', taxType: 'B', paymentMethod: 'Bar',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (sale) {
      setForm({
        productName: sale?.productName ?? '',
        productDetails: sale?.productDetails ?? '',
        price: String(sale?.price ?? ''),
        quantity: String(sale?.quantity ?? 1),
        saleDate: (sale?.saleDate ?? '').split('T')[0] ?? '',
        customerId: sale?.customerId ?? '',
        productId: sale?.productId ?? '',
        taxType: sale?.taxType ?? 'B',
        paymentMethod: sale?.paymentMethod ?? 'Bar',
      });
    } else {
      setForm({ productName: '', productDetails: '', price: '', quantity: '1', saleDate: new Date().toISOString().split('T')[0], customerId: '', productId: '', taxType: 'B', paymentMethod: 'Bar' });
    }
  }, [sale, open]);

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const desc = [product.width, product.length].filter(Boolean).join(' / ');
      setForm({ ...form, productId: product.id, productName: product.name, productDetails: product.description ? `${product.description}${desc ? ' - ' + desc : ''}` : desc, price: String(product.price) });
    } else {
      setForm({ ...form, productId: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productName?.trim()) { toast.error('Produktname ist erforderlich'); return; }
    if (!form.customerId) { toast.error('Kundenauswahl ist erforderlich'); return; }
    if (!form.price || Number(form.price) <= 0) { toast.error('Bitte geben Sie einen gültigen Preis ein'); return; }
    setSaving(true);
    await onSave({ ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) || 1, productId: form.productId || null });
    setSaving(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">{sale ? 'Verkauf bearbeiten' : 'Neuer Verkauf'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SearchableSelect label="Kunde *" placeholder="Kunde suchen..." items={(customers ?? []).map(c => ({ id: c.id, name: c.name }))} value={form.customerId} onChange={(id) => setForm({ ...form, customerId: id })} required />
          {products.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Produkt auswählen</label>
              <select value={form.productId} onChange={(e) => handleProductSelect(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                <option value="">-- Manuell eingeben --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} {p.width ? `(${p.width}` : ''}{p.length ? ` ${p.length})` : p.width ? ')' : ''} - €{p.price?.toFixed(2)}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produktname *</label>
            <input value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produktdetails</label>
            <textarea value={form.productDetails} onChange={(e) => setForm({ ...form, productDetails: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preis (€) *</label>
              <input type="number" step="0.01" min="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Menge *</label>
              <input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verkaufsdatum</label>
            <input type="date" value={form.saleDate} onChange={(e) => setForm({ ...form, saleDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MwSt-Typ</label>
              <select value={form.taxType} onChange={(e) => setForm({ ...form, taxType: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                <option value="B">Brutto (B)</option>
                <option value="N">Netto (N)</option>
                <option value="B-N">Brutto-Netto (B-N)</option>
                <option value="N-B">Netto-Brutto (N-B)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zahlungsart</label>
              <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                <option value="Bar">Bar</option>
                <option value="SEPA">SEPA</option>
                <option value="Überweisung">Überweisung</option>
                <option value="Karte">Karte</option>
              </select>
            </div>
          </div>
          {form.price && form.quantity && (
            <div className="bg-blue-50 rounded-lg p-3 text-sm">
              <span className="text-gray-600">Gesamt: </span>
              <span className="font-semibold text-blue-700">€{((parseFloat(form.price) || 0) * (parseInt(form.quantity) || 1))?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 }) ?? '0'}</span>
            </div>
          )}
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

// ─── Ana component ───────────────────────────────────────────────────────────
const PAGE_SIZE = 50;

export function SalesContent() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Sale | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSales = useCallback(async (q = '', p = 1) => {
    try {
      const res = await fetch(`/api/sales?search=${encodeURIComponent(q)}&page=${p}&pageSize=${PAGE_SIZE}`);
      const data = await res.json();
      if (data.data) {
        setSales(Array.isArray(data.data) ? data.data : []);
        setTotal(data.total ?? 0);
      } else {
        // Eski format uyumluluğu
        setSales(Array.isArray(data) ? data : []);
      }
    } catch { setSales([]); }
    finally { setLoading(false); }
  }, []);

  const fetchCustomers = useCallback(async () => {
    try { const res = await fetch('/api/customers'); const data = await res.json(); setCustomers(Array.isArray(data) ? data : []); } catch { setCustomers([]); }
  }, []);

  const fetchProducts = useCallback(async () => {
    try { const res = await fetch('/api/products'); const data = await res.json(); setProducts(Array.isArray(data) ? data : []); } catch { setProducts([]); }
  }, []);

  useEffect(() => { fetchSales(); fetchCustomers(); fetchProducts(); }, [fetchSales, fetchCustomers, fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); fetchSales(search, 1); }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchSales]);

  const handleSave = async (formData: any) => {
    try {
      const url = editingSale ? `/api/sales/${editingSale.id}` : '/api/sales';
      const method = editingSale ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler');
      toast.success(editingSale ? 'Verkauf aktualisiert' : 'Verkauf hinzugefügt');
      setModalOpen(false);
      setEditingSale(null);
      fetchSales(search, page);
      fetchProducts();
    } catch (err: any) { toast.error(err?.message || 'Ein Fehler ist aufgetreten'); }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.match(/\.(xlsx|xls)$/i)) { toast.error('Bitte wählen Sie eine Excel-Datei (.xlsx oder .xls)'); return; }
    setImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/import', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        // Satır bazlı hata göster
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.slice(0, 3).forEach((err: string) => toast.error(err));
          if (data.errors.length > 3) toast.error(`... und ${data.errors.length - 3} weitere Fehler`);
        } else {
          throw new Error(data.error || 'Import fehlgeschlagen');
        }
      } else {
        toast.success(data.message || 'Import erfolgreich!');
        fetchSales(search, 1);
        fetchCustomers();
        setPage(1);
      }
    } catch (err: any) {
      toast.error(err?.message || 'Import fehlgeschlagen');
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/sales/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Verkauf gelöscht');
      fetchSales(search, page);
      fetchProducts();
    } catch { toast.error('Ein Fehler ist aufgetreten'); }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const formatDate = (d: string) => { try { return new Date(d).toLocaleDateString('de-DE'); } catch { return '-'; } };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-gray-900">Verkäufe</h1>
          <p className="text-sm text-gray-500 mt-1">Alle Verkaufsdaten verwalten</p>
        </div>
        <div className="flex gap-2">
          <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleImport} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} disabled={importing} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50">
            {importing ? <><FileSpreadsheet className="w-4 h-4 animate-spin" /> Importiert...</> : <><Upload className="w-4 h-4" /> Excel Import</>}
          </button>
          <button onClick={() => { setEditingSale(null); setModalOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Neuer Verkauf
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nach Produkt oder Kunde suchen..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm" />
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-24 bg-white rounded-xl animate-pulse shadow-sm" />)}</div>
      ) : (sales?.length ?? 0) === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Noch keine Verkaufsdaten vorhanden</p>
        </div>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence>
            {(sales ?? []).map((s: Sale, i: number) => (
              <motion.div key={s?.id ?? i} initial={{ opacity: 1, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ delay: i * 0.02 }} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{s?.productName ?? '-'}</h3>
                      <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-mono font-medium">€{(s?.totalAmount ?? 0)?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 }) ?? '0'}</span>
                    </div>
                    {s?.productDetails && <p className="text-sm text-gray-500 mb-1 truncate">{s.productDetails}</p>}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{s?.customer?.name ?? '-'}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(s?.saleDate ?? '')}</span>
                      <span>Preis: €{(s?.price ?? 0)?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 }) ?? '0'} x {s?.quantity ?? 1}</span>
                      {s?.taxType && <span className="flex items-center gap-1"><Receipt className="w-3 h-3" />MwSt: {s.taxType}</span>}
                      {s?.paymentMethod && <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" />{s.paymentMethod}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditingSale(s); setModalOpen(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteTarget(s)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm">
          <span className="text-sm text-gray-500">{total} kayıttan {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, total)} arası</span>
          <div className="flex items-center gap-2">
            <button onClick={() => { const p = page - 1; setPage(p); fetchSales(search, p); }} disabled={page <= 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700">{page} / {totalPages}</span>
            <button onClick={() => { const p = page + 1; setPage(p); fetchSales(search, p); }} disabled={page >= totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <SaleModal open={modalOpen} onClose={() => { setModalOpen(false); setEditingSale(null); }} onSave={handleSave} sale={editingSale} customers={customers} products={products} />
      <DeleteConfirmModal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => deleteTarget && handleDelete(deleteTarget.id)} itemName={deleteTarget?.productName ?? ''} />
    </div>
  );
}
