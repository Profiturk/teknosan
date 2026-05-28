'use client';
import { useState, useEffect, useRef } from 'react';
import { Users, ShoppingCart, TrendingUp, Package } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const MonthlyChart = dynamic(() => import('@/components/charts/monthly-chart'), { ssr: false, loading: () => <div className="h-[300px] bg-gray-100 rounded-lg animate-pulse" /> });
const ProductChart = dynamic(() => import('@/components/charts/product-chart'), { ssr: false, loading: () => <div className="h-[300px] bg-gray-100 rounded-lg animate-pulse" /> });

interface DashboardStats {
  totalCustomers: number;
  totalSalesCount: number;
  totalRevenue: number;
  topProducts: Array<{ name: string; totalAmount: number; totalQuantity: number }>;
  monthlyRevenue: Array<{ month: string; total: number }>;
}

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref} className="font-mono">{prefix}{display?.toLocaleString?.('de-DE') ?? '0'}{suffix}</span>;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((r) => r.json())
      .then((data: any) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-white rounded-xl animate-pulse shadow-sm" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-[350px] bg-white rounded-xl animate-pulse shadow-sm" />
          <div className="h-[350px] bg-white rounded-xl animate-pulse shadow-sm" />
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Kunden gesamt', value: stats?.totalCustomers ?? 0, icon: Users, color: 'bg-blue-500', lightColor: 'bg-blue-50' },
    { label: 'Verkäufe gesamt', value: stats?.totalSalesCount ?? 0, icon: ShoppingCart, color: 'bg-emerald-500', lightColor: 'bg-emerald-50' },
    { label: 'Gesamtumsatz', value: stats?.totalRevenue ?? 0, icon: TrendingUp, color: 'bg-purple-500', lightColor: 'bg-purple-50', prefix: '€', isCurrency: true },
    { label: 'Produktarten', value: stats?.topProducts?.length ?? 0, icon: Package, color: 'bg-orange-500', lightColor: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Übersicht und Zusammenfassung</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">{card.label}</span>
                <div className={`w-9 h-9 ${card.lightColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${card.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                <AnimatedNumber value={card.value} prefix={(card as any).prefix ?? ''} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-5 shadow-sm"
        >
          <h2 className="text-base font-semibold text-gray-900 mb-4">Monatlicher Umsatz</h2>
          <div className="h-[300px]">
            <MonthlyChart data={stats?.monthlyRevenue ?? []} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-5 shadow-sm"
        >
          <h2 className="text-base font-semibold text-gray-900 mb-4">Meistverkaufte Produkte</h2>
          <div className="h-[300px]">
            <ProductChart data={stats?.topProducts ?? []} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
