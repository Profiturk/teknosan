export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const [totalCustomers, totalSales, salesData, monthlySales] = await Promise.all([
      prisma.customer.count(),
      prisma.sale.aggregate({ _sum: { totalAmount: true }, _count: true }),
      prisma.sale.findMany({
        select: { productName: true, totalAmount: true, quantity: true },
      }),
      prisma.sale.findMany({
        select: { saleDate: true, totalAmount: true },
        orderBy: { saleDate: 'asc' },
      }),
    ]);

    const productMap: Record<string, { totalAmount: number; totalQuantity: number }> = {};
    for (const s of salesData ?? []) {
      const key = s.productName ?? 'Unbekannt';
      if (!productMap[key]) productMap[key] = { totalAmount: 0, totalQuantity: 0 };
      productMap[key].totalAmount += s.totalAmount ?? 0;
      productMap[key].totalQuantity += s.quantity ?? 0;
    }
    const topProducts = Object.entries(productMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 5);

    const monthMap: Record<string, number> = {};
    for (const s of monthlySales ?? []) {
      const d = new Date(s.saleDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthMap[key] = (monthMap[key] ?? 0) + (s.totalAmount ?? 0);
    }
    const monthlyRevenue = Object.entries(monthMap)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return NextResponse.json({
      totalCustomers,
      totalSalesCount: totalSales?._count ?? 0,
      totalRevenue: totalSales?._sum?.totalAmount ?? 0,
      topProducts,
      monthlyRevenue,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
