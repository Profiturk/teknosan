export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SaleSchema } from '@/lib/schemas';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

    // Eski satışı al (stok farkı için)
    const oldSale = await prisma.sale.findUnique({ where: { id: params.id } });
    if (!oldSale) return NextResponse.json({ error: 'Verkauf nicht gefunden' }, { status: 404 });

    const sale = await prisma.sale.update({
      where: { id: params.id },
      data: {
        productName: data.productName,
        productDetails: data.productDetails ?? null,
        price: data.price,
        quantity: data.quantity,
        totalAmount,
        saleDate: data.saleDate ? new Date(data.saleDate) : undefined,
        customerId: data.customerId,
        productId: data.productId || null,
        taxType: data.taxType || null,
        paymentMethod: data.paymentMethod || null,
      },
      include: { customer: { select: { id: true, name: true } } },
    });

    // Stok farkını güncelle
    const oldProductId = oldSale.productId;
    const newProductId = data.productId || null;

    if (oldProductId && oldProductId === newProductId) {
      // Aynı ürün — miktar farkını uygula
      const diff = data.quantity - oldSale.quantity;
      if (diff !== 0) {
        await prisma.product.update({
          where: { id: oldProductId },
          data: { stock: { decrement: diff } },
        });
      }
    } else {
      // Ürün değişti — eski stoku geri ver, yeni stoktan düş
      if (oldProductId) {
        await prisma.product.update({
          where: { id: oldProductId },
          data: { stock: { increment: oldSale.quantity } },
        });
      }
      if (newProductId) {
        await prisma.product.update({
          where: { id: newProductId },
          data: { stock: { decrement: data.quantity } },
        });
      }
    }

    return NextResponse.json(sale);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    // Silmeden önce stoku geri ver
    const sale = await prisma.sale.findUnique({ where: { id: params.id } });
    if (sale?.productId) {
      await prisma.product.update({
        where: { id: sale.productId },
        data: { stock: { increment: sale.quantity } },
      });
    }

    await prisma.sale.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
