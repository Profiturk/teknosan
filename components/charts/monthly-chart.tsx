'use client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const MONTHS: Record<string, string> = {
  '01': 'Jan', '02': 'Feb', '03': 'Mär', '04': 'Apr', '05': 'Mai', '06': 'Jun',
  '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Dez',
};

export default function MonthlyChart({ data }: { data: Array<{ month: string; total: number }> }) {
  const chartData = (data ?? []).map((d: any) => {
    const parts = (d?.month ?? '').split('-');
    const monthKey = parts?.[1] ?? '';
    return {
      name: MONTHS[monthKey] ?? monthKey,
      total: d?.total ?? 0,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 20 }}>
        <XAxis
          dataKey="name"
          tickLine={false}
          tick={{ fontSize: 10 }}
          interval="preserveStartEnd"
          label={{ value: 'Monat', position: 'insideBottom', offset: -15, style: { textAnchor: 'middle', fontSize: 11 } }}
        />
        <YAxis
          tickLine={false}
          tick={{ fontSize: 10 }}
          tickFormatter={(v: number) => `${(v / 1000)?.toFixed?.(0) ?? '0'}k`}
          label={{ value: 'Umsatz (€)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
        />
        <Tooltip
          formatter={(value: any) => [`€${Number(value ?? 0)?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 }) ?? '0'}`, 'Umsatz']}
          contentStyle={{ fontSize: 11 }}
        />
        <Bar dataKey="total" fill="#60B5FF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
