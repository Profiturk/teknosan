'use client';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function ReportBarChart({ data }: { data: Array<{ name: string; totalAmount: number; totalQuantity: number }> }) {
  const chartData = (data ?? []).map((d: any) => ({
    name: d?.name?.length > 15 ? (d.name.substring(0, 15) + '...') : (d?.name ?? ''),
    fullName: d?.name ?? '',
    betrag: d?.totalAmount ?? 0,
    menge: d?.totalQuantity ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <XAxis
          type="number"
          tickLine={false}
          tick={{ fontSize: 10 }}
          tickFormatter={(v: number) => `${(v / 1000)?.toFixed?.(0) ?? '0'}k`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          tick={{ fontSize: 10 }}
          width={120}
        />
        <Tooltip
          formatter={(value: any) => [`€${Number(value ?? 0)?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 }) ?? '0'}`, 'Betrag']}
          labelFormatter={(label: any) => {
            const item = chartData.find((d: any) => d.name === label);
            return item?.fullName ?? label;
          }}
          contentStyle={{ fontSize: 11 }}
        />
        <Bar dataKey="betrag" fill="#60B5FF" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
