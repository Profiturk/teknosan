'use client';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#80D8C3', '#A19AD3'];

export default function ProductChart({ data }: { data: Array<{ name: string; totalAmount: number; totalQuantity: number }> }) {
  const chartData = (data ?? []).map((d: any) => ({
    name: d?.name ?? 'Unbekannt',
    value: d?.totalAmount ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="55%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((_: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any) => [`€${Number(value ?? 0)?.toLocaleString?.('de-DE', { minimumFractionDigits: 2 }) ?? '0'}`, 'Betrag']}
          contentStyle={{ fontSize: 11 }}
        />
        <Legend
          verticalAlign="top"
          wrapperStyle={{ fontSize: 11 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
