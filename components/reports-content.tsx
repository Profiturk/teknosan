'use client';
import { useState, useEffect } from 'react';
import { BarChart3, Filter, TrendingUp, Package, Users, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ReportBarChart = dynamic(() => import('@/components/charts/report-bar-chart'), { ssr: false, loading: () => <div className="h-[350px] bg-gray-100 rounded-lg animate-pulse" /> });

interface Sale {
  id: string;
  productName: string;
  productDetails: string | null;
  price: number;
  quantity: number;
  totalAmount: number;
  saleDate: string;
  customer?: { id: string; name: string };
}

export function ReportsContent() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = () => {
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    window.location.href = `/api/export?${params.toString()}`;
  };

  const fetchSales = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.set('startDate', startDate);
      if (endDate) params.set('endDate', endDate + 'T23:59:59');
      const res = await fetch(`/api/sales?${params.toString()}&pageSize=9999`);
      const data = await res.json();
      const list = data.data ?? data;
      setSales(Array.isArray(list) ? list : []);
    } catch { setSales([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSales(); }, []);

  const totalRevenue = (sales ?? []).reduce((sum: number, s: any) => sum + (s?.totalAmount ?? 0), 0);
  const totalQuantity = (sales ?? []).reduce((sum: number, s: any) => sum + (s?.quantity ?? 0), 0);

  const productMap: Record<string, { totalAmount: number; totalQuantity: number }> = {};
  for (const s of sales ?? []) {
    const key = s?.productName ?? 'Unbekannt';
    if (!productMap[key]) productMap[key] = { totalAmount: 0, totalQuantity: 0 };
    productMap[key].totalAmount += s?.totalAmount ?? 0;
    productMap[key].totalQuantity += s?.quantity ?? 0;
  }
  const productData = Object.entries(productMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const customerMap: Record<string, { name: string; totalAmount: number; count: number }> = {};
  for (const s of sales ?? []) {
    const cId = s?.customer?.id ?? 'unknown';
    const cName = s?.customer?.name ?? 'Unbekannt';
    if (!customerMap[cId]) customerMap[cId] = { name: cName, totalAmount: 0, count: 0 };
    customerMap[cId].totalAmount += s?.totalAmount ?? 0;
    customerMap[cId].count += 1;
  }
  const customerData = Object.values(customerMap)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-gray-900">Berichte</h1>
          <p className="text-sm text-gray-500 mt-1">Verkaufsberichte und Analysen</p>
        </div>
        <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          <Download className="w-4 h-4" /> CSV Export
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="w-4 h-4" /> Zeitraum:
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Von</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Bis</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
          </div>
          <button
            onClick={fetchSales}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Filtern
          </button>
          {(startDate || endDate) && (
            <button
              onClick={() => { setStartDate(''); setEndDate(''); setTimeout(fetchSales, 100); }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              Zurücksetzen
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-500">Gesamtumsatz</span>
          </div>
          <p className="text-2xl font-bold font-mono text-gray-900">€{totalRevenue?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 }) ?? '0'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-500">Gesamtverkauf</span>
          </div>
          <p className="text-2xl font-bold font-mono text-gray-900">{sales?.length ?? 0} Vorgänge / {totalQuantity} Stück</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-500">Kundenanzahl</span>
          </div>
          <p className="text-2xl font-bold font-mono text-gray-900">{Object.keys(customerMap ?? {})?.length ?? 0}</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Umsatz nach Produkt</h2>
        {loading ? (
          <div className="h-[350px] bg-gray-100 rounded-lg animate-pulse" />
        ) : (productData?.length ?? 0) === 0 ? (
          <div className="h-[200px] flex items-center justify-center text-gray-400">
            <BarChart3 className="w-8 h-8 mr-2" /> Keine Daten vorhanden
          </div>
        ) : (
          <div className="h-[350px]">
            <ReportBarChart data={productData} />
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Verkäufe nach Kunde</h2>
        {(customerData?.length ?? 0) === 0 ? (
          <p className="text-gray-400 text-center py-8">Keine Daten vorhanden</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 font-medium text-gray-500">Kunde</th>
                  <th className="text-right py-2 px-3 font-medium text-gray-500">Anzahl</th>
                  <th className="text-right py-2 px-3 font-medium text-gray-500">Gesamtbetrag</th>
                </tr>
              </thead>
              <tbody>
                {(customerData ?? []).map((c: any, i: number) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-gray-900">{c?.name ?? '-'}</td>
                    <td className="py-2.5 px-3 text-right text-gray-600">{c?.count ?? 0}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-gray-900">€{(c?.totalAmount ?? 0)?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 }) ?? '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
