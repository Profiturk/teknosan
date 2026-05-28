export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};
    if (startDate || endDate) {
      where.saleDate = {};
      if (startDate) where.saleDate.gte = new Date(startDate);
      if (endDate) where.saleDate.lte = new Date(endDate + 'T23:59:59');
    }

    const sales = await prisma.sale.findMany({
      where,
      include: { customer: { select: { name: true } } },
      orderBy: { saleDate: 'desc' },
    });

    const BOM = '\uFEFF';
    const headers = ['Datum', 'Kunde', 'Produkt', 'Details', 'Preis (EUR)', 'Menge', 'Gesamt (EUR)', 'MwSt-Typ', 'Zahlungsart'];
    const rows = sales.map(s => [
      new Date(s.saleDate).toLocaleDateString('de-DE'),
      s.customer?.name ?? '',
      s.productName,
      s.productDetails ?? '',
      s.price.toFixed(2).replace('.', ','),
      s.quantity,
      s.totalAmount.toFixed(2).replace('.', ','),
      s.taxType ?? '',
      s.paymentMethod ?? '',
    ]);

    const csv = BOM + [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
      .join('\r\n');

    const filename = `verkaufe_${new Date().toISOString().split('T')[0]}.csv`;
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
