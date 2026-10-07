export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CashRegisterSchema } from '@/lib/schemas';
import { parseDateInput, toDateInput } from '@/lib/tse';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

    const existing = await prisma.cashRegister.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Kasse nicht gefunden' }, { status: 404 });

    const data = parsed.data;
    const tseExpiry = parseDateInput(data.tseExpiry);
    // Neues Ablaufdatum (z.B. TSE getauscht) -> Erinnerungen beginnen von vorn
    const expiryChanged = toDateInput(existing.tseExpiry) !== toDateInput(tseExpiry);

    const register = await prisma.cashRegister.update({
      where: { id: params.id },
      data: {
        customerId: data.customerId,
        model: data.model,
        label: data.label || null,
        serialNumber: data.serialNumber || null,
        tseSerial: data.tseSerial || null,
        tseExpiry,
        installDate: parseDateInput(data.installDate),
        elsterStatus: data.elsterStatus,
        elsterDate: parseDateInput(data.elsterDate),
        notes: data.notes || null,
        ...(expiryChanged ? { reminderStage: null } : {}),
      },
    });
    return NextResponse.json(register);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    await prisma.cashRegister.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Kasse gelöscht' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
