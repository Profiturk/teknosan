export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProductSchema } from '@/lib/schemas';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') ?? '';

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        { width: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: { _count: { select: { sales: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const body = await request.json();
    const parsed = ProductSchema.safeParse({
      ...body,
      price: parseFloat(body.price) || 0,
      stock: parseInt(body.stock) || 0,
    });
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Ungültige Daten' },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        width: data.width || null,
        length: data.length || null,
        price: data.price,
        stock: data.stock,
        active: data.active,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
