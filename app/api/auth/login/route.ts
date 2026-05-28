export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email ve şifre gereklidir' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 401 });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Geçersiz şifre' }, { status: 401 });
    }
    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Bir hata oluştu' }, { status: 500 });
  }
}
