export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProductSchema } from '@/lib/schemas';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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
    const product = await prisma.product.update({
      where: { id: params.id },
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

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Produkt gelöscht' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
