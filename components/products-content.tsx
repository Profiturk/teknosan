'use client';
import { useState, useEffect, useCallback } from 'react';
import { Package, Plus, Search, Edit2, Trash2, X, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string | null;
  width: string | null;
  length: string | null;
  price: number;
  stock: number;
  active: boolean;
  _count?: { sales: number };
}

function ProductModal({
  open,
  onClose,
  onSave,
  product,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  product: Product | null;
}) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    width: '',
    length: '',
    price: '',
    stock: '0',
    active: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product?.name ?? '',
        description: product?.description ?? '',
        width: product?.width ?? '',
        length: product?.length ?? '',
        price: String(product?.price ?? ''),
        stock: String(product?.stock ?? 0),
        active: product?.active !== false,
      });
    } else {
      setForm({ name: '', description: '', width: '', length: '', price: '', stock: '0', active: true });
    }
  }, [product, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) { toast.error('Produktname ist erforderlich'); return; }
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
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            {product ? 'Produkt bearbeiten' : 'Neues Produkt'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produktname *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="z.B. Bonrolle Thermopapier" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" placeholder="z.B. Thermopapier für Kassensysteme" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breite</label>
              <select value={form.width} onChange={(e) => setForm({ ...form, width: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                <option value="">Auswählen...</option>
                <option value="57mm">57 mm</option>
                <option value="80mm">80 mm</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Länge</label>
              <select value={form.length} onChange={(e) => setForm({ ...form, length: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                <option value="">Auswählen...</option>
                <option value="15m">15 m</option>
                <option value="18m">18 m</option>
                <option value="25m">25 m</option>
                <option value="50m">50 m</option>
                <option value="80m">80 m</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preis (€) *</label>
              <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bestand</label>
              <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">Aktiv</label>
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

export function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(async (q = '') => {
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(q)}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    const timer = setTimeout(() => fetchProducts(search), 300);
    return () => clearTimeout(timer);
  }, [search, fetchProducts]);

  const handleSave = async (formData: any) => {
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error();
      toast.success(editingProduct ? 'Produkt aktualisiert' : 'Produkt hinzugefügt');
      setModalOpen(false);
      setEditingProduct(null);
      fetchProducts(search);
    } catch { toast.error('Ein Fehler ist aufgetreten'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie dieses Produkt wirklich löschen?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      toast.success('Produkt gelöscht');
      fetchProducts(search);
    } catch { toast.error('Ein Fehler ist aufgetreten'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-gray-900">Produkte</h1>
          <p className="text-sm text-gray-500 mt-1">Verwalten Sie Ihr Produktsortiment</p>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setModalOpen(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Neues Produkt
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Produkt suchen (Name, Breite)..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-white rounded-xl animate-pulse shadow-sm" />)}
        </div>
      ) : (products?.length ?? 0) === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Noch keine Produkte vorhanden</p>
        </div>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence>
            {(products ?? []).map((p: Product, i: number) => (
              <motion.div
                key={p?.id ?? i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{p?.name ?? '-'}</h3>
                      {p?.active ? (
                        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Aktiv
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Inaktiv
                        </span>
                      )}
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        {p?._count?.sales ?? 0} Verkäufe
                      </span>
                    </div>
                    {p?.description && (
                      <p className="text-sm text-gray-500 mb-1">{p.description}</p>
                    )}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                      {p?.width && <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">Breite: {p.width}</span>}
                      {p?.length && <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">Länge: {p.length}</span>}
                      <span className="font-mono font-semibold text-emerald-700">€{(p?.price ?? 0)?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 })}</span>
                      <span className="text-gray-400">Bestand: {p?.stock ?? 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingProduct(p); setModalOpen(true); }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p?.id ?? '')}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ProductModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingProduct(null); }}
        onSave={handleSave}
        product={editingProduct}
      />
    </div>
  );
}
