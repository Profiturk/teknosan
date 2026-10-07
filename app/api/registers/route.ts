export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CashRegisterSchema } from '@/lib/schemas';
import { parseDateInput } from '@/lib/tse';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') ?? '';

    const where: any = {};
    if (search) {
      where.OR = [
        { model: { contains: search, mode: 'insensitive' as const } },
        { label: { contains: search, mode: 'insensitive' as const } },
        { serialNumber: { contains: search, mode: 'insensitive' as const } },
        { tseSerial: { contains: search, mode: 'insensitive' as const } },
        { customer: { name: { contains: search, mode: 'insensitive' as const } } },
      ];
    }

    const registers = await prisma.cashRegister.findMany({
      where,
      include: { customer: { select: { id: true, name: true, phone: true, email: true } } },
      // Frühestes Ablaufdatum zuerst, Einträge ohne Datum am Ende
      orderBy: [{ tseExpiry: { sort: 'asc', nulls: 'last' } }, { createdAt: 'desc' }],
    });

    return NextResponse.json(registers);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const body = await request.json();
    const parsed = CashRegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Ungültige Daten' },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const register = await prisma.cashRegister.create({
      data: {
        customerId: data.customerId,
        model: data.model,
        label: data.label || null,
        serialNumber: data.serialNumber || null,
        tseSerial: data.tseSerial || null,
        tseExpiry: parseDateInput(data.tseExpiry),
        installDate: parseDateInput(data.installDate),
        elsterStatus: data.elsterStatus,
        elsterDate: parseDateInput(data.elsterDate),
        notes: data.notes || null,
      },
    });
    return NextResponse.json(register, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
