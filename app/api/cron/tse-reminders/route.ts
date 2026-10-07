export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { runTseReminders } from '@/lib/tse-reminder';

// Täglicher Aufruf durch Vercel Cron (siehe vercel.json).
// Vercel sendet automatisch "Authorization: Bearer <CRON_SECRET>".
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  try {
    return NextResponse.json(await runTseReminders());
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
