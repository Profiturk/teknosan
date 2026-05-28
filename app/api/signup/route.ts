export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email ve şifre gereklidir' }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Bu email zaten kayıtlı' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name: name ?? null },
    });
    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Bir hata oluştu' }, { status: 500 });
  }
}
