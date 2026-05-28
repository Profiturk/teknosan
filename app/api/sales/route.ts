export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SaleSchema } from '@/lib/schemas';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') ?? '';
    const customerId = searchParams.get('customerId') ?? '';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};
    if (search) {
      where.OR = [
        { productName: { contains: search, mode: 'insensitive' } },
        { customer: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    if (customerId) {
      where.customerId = customerId;
    }
    if (startDate || endDate) {
      where.saleDate = {};
      if (startDate) where.saleDate.gte = new Date(startDate);
      if (endDate) where.saleDate.lte = new Date(endDate);
    }

    const page = parseInt(searchParams.get('page') ?? '1');
    const pageSize = parseInt(searchParams.get('pageSize') ?? '50');
    const skip = (page - 1) * pageSize;

    const [sales, total] = await Promise.all([
      prisma.sale.findMany({
        where,
        include: { customer: { select: { id: true, name: true } } },
        orderBy: { saleDate: 'desc' },
        skip,
        take: pageSize,
      }),
      prisma.sale.count({ where }),
    ]);

    return NextResponse.json({ data: sales, total, page, pageSize });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const body = await req.json();
    const parsed = SaleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Ungültige Daten' },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const totalAmount = data.price * data.quantity;

    const sale = await prisma.sale.create({
      data: {
        productName: data.productName,
        productDetails: data.productDetails ?? null,
        price: data.price,
        quantity: data.quantity,
        totalAmount,
        saleDate: data.saleDate ? new Date(data.saleDate) : new Date(),
        customerId: data.customerId,
        productId: data.productId || null,
        taxType: data.taxType || null,
        paymentMethod: data.paymentMethod || null,
      },
      include: { customer: { select: { id: true, name: true } } },
    });

    // Stok düşür
    if (data.productId) {
      await prisma.product.update({
        where: { id: data.productId },
        data: { stock: { decrement: data.quantity } },
      });
    }

    return NextResponse.json(sale);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
