export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

const PRODUCT_MAP: Record<string, { name: string; width: string; length: string }> = {
  '57 - 15m': { name: 'Bonrolle 57mm x 15m', width: '57mm', length: '15m' },
  '57 - 18m': { name: 'Bonrolle 57mm x 18m', width: '57mm', length: '18m' },
  '57 - 25m': { name: 'Bonrolle 57mm x 25m', width: '57mm', length: '25m' },
  '57 - 40m': { name: 'Bonrolle 57mm x 40m', width: '57mm', length: '40m' },
  '57 - 50m': { name: 'Bonrolle 57mm x 50m', width: '57mm', length: '50m' },
  '80 - 30m': { name: 'Bonrolle 80mm x 30m', width: '80mm', length: '30m' },
  '80 - 50m': { name: 'Bonrolle 80mm x 50m', width: '80mm', length: '50m' },
  '80 - 70m': { name: 'Bonrolle 80mm x 70m', width: '80mm', length: '70m' },
  '80-80m':   { name: 'Bonrolle 80mm x 80m', width: '80mm', length: '80m' },
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'Keine Datei hochgeladen' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });

    // Ensure all products exist
    const productIds: Record<string, string> = {};
    for (const [key, info] of Object.entries(PRODUCT_MAP)) {
      const existing = await prisma.product.findFirst({ where: { name: info.name } });
      if (existing) {
        productIds[key] = existing.id;
      } else {
        const created = await prisma.product.create({
          data: {
            name: info.name,
            description: 'Thermopapier für Kassensysteme',
            width: info.width,
            length: info.length,
            price: 0,
            stock: 0,
            active: true,
          },
        });
        productIds[key] = created.id;
      }
    }

    let newCustomers = 0;
    let newSales = 0;

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: null });

      for (const row of rows) {
        const kundeName = row.KUNDE;
        if (!kundeName || typeof kundeName !== 'string' || kundeName.trim() === '') continue;
        const cleanName = kundeName.trim();

        // Parse date
        let saleDate: Date;
        if (row.DATUM instanceof Date) {
          saleDate = row.DATUM;
        } else if (typeof row.DATUM === 'number') {
          const ed = XLSX.SSF.parse_date_code(row.DATUM);
          saleDate = new Date(ed.y, ed.m - 1, ed.d);
        } else if (typeof row.DATUM === 'string' && row.DATUM) {
          saleDate = new Date(row.DATUM);
        } else {
          continue;
        }
        if (isNaN(saleDate.getTime())) continue;

        let customer = await prisma.customer.findFirst({
          where: { name: { equals: cleanName, mode: 'insensitive' } },
        });
        if (!customer) {
          customer = await prisma.customer.create({ data: { name: cleanName } });
          newCustomers++;
        }

        const taxType = row.Mwst && typeof row.Mwst === 'string' ? row.Mwst.trim() : null;
        const paymentMethod = row.SEPA && typeof row.SEPA === 'string' && row.SEPA.trim() === 'SEPA' ? 'SEPA' : 'Bar';

        // Group 1: 57-15m, 57-18m -> BOX
        for (const col of ['57 - 15m', '57 - 18m']) {
          const price = row[col] as number | null;
          if (price && typeof price === 'number' && price > 0) {
            const quantity = (row.BOX as number) || 1;
            await prisma.sale.create({
              data: {
                productName: PRODUCT_MAP[col].name,
                productDetails: `Thermopapier - ${PRODUCT_MAP[col].width} / ${PRODUCT_MAP[col].length}`,
                price, quantity, totalAmount: price * quantity,
                saleDate, taxType, paymentMethod,
                customerId: customer.id, productId: productIds[col],
              },
            });
            newSales++;
          }
        }

        // Group 2: 57-25m, 57-40m, 57-50m -> BOX.1
        for (const col of ['57 - 25m', '57 - 40m', '57 - 50m']) {
          const price = row[col] as number | null;
          if (price && typeof price === 'number' && price > 0) {
            const quantity = (row['BOX.1'] as number) || 1;
            await prisma.sale.create({
              data: {
                productName: PRODUCT_MAP[col].name,
                productDetails: `Thermopapier - ${PRODUCT_MAP[col].width} / ${PRODUCT_MAP[col].length}`,
                price, quantity, totalAmount: price * quantity,
                saleDate, taxType, paymentMethod,
                customerId: customer.id, productId: productIds[col],
              },
            });
            newSales++;
          }
        }

        // Group 3: 80-30m, 80-50m, 80-70m, 80-80m -> BOX.2
        for (const col of ['80 - 30m', '80 - 50m', '80 - 70m', '80-80m']) {
          const price = row[col] as number | null;
          if (price && typeof price === 'number' && price > 0) {
            const quantity = (row['BOX.2'] as number) || 1;
            await prisma.sale.create({
              data: {
                productName: PRODUCT_MAP[col].name,
                productDetails: `Thermopapier - ${PRODUCT_MAP[col].width} / ${PRODUCT_MAP[col].length}`,
                price, quantity, totalAmount: price * quantity,
                saleDate, taxType, paymentMethod,
                customerId: customer.id, productId: productIds[col],
              },
            });
            newSales++;
          }
        }
      }
    }

    return NextResponse.json({
      message: `Import erfolgreich: ${newCustomers} neue Kunden, ${newSales} neue Verkäufe`,
      newCustomers,
      newSales,
    });
  } catch (error: any) {
    console.error('Import error:', error);
    return NextResponse.json({ error: error?.message ?? 'Import fehlgeschlagen' }, { status: 500 });
  }
}
