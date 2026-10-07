export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { runTseReminders } from '@/lib/tse-reminder';

// Manueller Versand aus dem Panel (auch zum Testen der SMTP-Einstellungen).
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const result = await runTseReminders({ force: true });
    return NextResponse.json(result, { status: result.sent ? 200 : 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Fehler' }, { status: 500 });
  }
}
