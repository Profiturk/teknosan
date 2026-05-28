import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('johndoe123', 10);

  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });

  const hashedPasswordTekno = await bcrypt.hash('Kaya-2026!', 10);
  await prisma.user.upsert({
    where: { email: 'teknosanberlin@gmail.com' },
    update: {},
    create: {
      email: 'teknosanberlin@gmail.com',
      name: 'Teknosan Admin',
      password: hashedPasswordTekno,
    },
  });

  // Seed customers
  const customers = [
    { id: 'cust1', name: 'Ahmet Yılmaz', phone: '0532 111 2233', email: 'ahmet@email.com', address: 'Berlin, Kreuzberg' },
    { id: 'cust2', name: 'Fatma Demir', phone: '0533 222 3344', email: 'fatma@email.com', address: 'München, Schwabing' },
    { id: 'cust3', name: 'Mehmet Kaya', phone: '0534 333 4455', email: 'mehmet@email.com', address: 'Hamburg, Altona' },
    { id: 'cust4', name: 'Ayşe Öztürk', phone: '0535 444 5566', email: 'ayse@email.com', address: 'Köln, Ehrenfeld' },
    { id: 'cust5', name: 'Ali Can', phone: '0536 555 6677', email: 'ali@email.com', address: 'Frankfurt, Bornheim' },
  ];

  for (const c of customers) {
    await prisma.customer.upsert({
      where: { id: c.id },
      update: {},
      create: c,
    });
  }

  // Seed Bonrollen products
  const products = [
    { id: 'prod1', name: 'Bonrolle 57mm x 15m', description: 'Thermopapier für Kassensysteme', width: '57mm', length: '15m', price: 0.35, stock: 500, active: true },
    { id: 'prod2', name: 'Bonrolle 57mm x 18m', description: 'Thermopapier für Kassensysteme', width: '57mm', length: '18m', price: 0.40, stock: 400, active: true },
    { id: 'prod3', name: 'Bonrolle 57mm x 25m', description: 'Thermopapier für Kassensysteme', width: '57mm', length: '25m', price: 0.50, stock: 300, active: true },
    { id: 'prod4', name: 'Bonrolle 57mm x 50m', description: 'Thermopapier für Kassensysteme', width: '57mm', length: '50m', price: 0.75, stock: 200, active: true },
    { id: 'prod5', name: 'Bonrolle 80mm x 50m', description: 'Thermopapier für Kassensysteme', width: '80mm', length: '50m', price: 0.85, stock: 250, active: true },
    { id: 'prod6', name: 'Bonrolle 80mm x 80m', description: 'Thermopapier für Kassensysteme', width: '80mm', length: '80m', price: 1.10, stock: 150, active: true },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  // Seed sales with Bonrollen products
  const sales = [
    { id: 'sale1', productName: 'Bonrolle 57mm x 15m', productDetails: 'Thermopapier - 57mm / 15m', price: 0.35, quantity: 100, totalAmount: 35, saleDate: new Date('2026-01-15'), customerId: 'cust1', productId: 'prod1' },
    { id: 'sale2', productName: 'Bonrolle 80mm x 50m', productDetails: 'Thermopapier - 80mm / 50m', price: 0.85, quantity: 200, totalAmount: 170, saleDate: new Date('2026-01-20'), customerId: 'cust2', productId: 'prod5' },
    { id: 'sale3', productName: 'Bonrolle 57mm x 25m', productDetails: 'Thermopapier - 57mm / 25m', price: 0.50, quantity: 150, totalAmount: 75, saleDate: new Date('2026-02-05'), customerId: 'cust3', productId: 'prod3' },
    { id: 'sale4', productName: 'Bonrolle 80mm x 80m', productDetails: 'Thermopapier - 80mm / 80m', price: 1.10, quantity: 300, totalAmount: 330, saleDate: new Date('2026-02-18'), customerId: 'cust4', productId: 'prod6' },
    { id: 'sale5', productName: 'Bonrolle 57mm x 50m', productDetails: 'Thermopapier - 57mm / 50m', price: 0.75, quantity: 250, totalAmount: 187.5, saleDate: new Date('2026-03-10'), customerId: 'cust1', productId: 'prod4' },
    { id: 'sale6', productName: 'Bonrolle 57mm x 18m', productDetails: 'Thermopapier - 57mm / 18m', price: 0.40, quantity: 500, totalAmount: 200, saleDate: new Date('2026-03-22'), customerId: 'cust5', productId: 'prod2' },
    { id: 'sale7', productName: 'Bonrolle 80mm x 50m', productDetails: 'Thermopapier - 80mm / 50m', price: 0.85, quantity: 400, totalAmount: 340, saleDate: new Date('2026-04-05'), customerId: 'cust3', productId: 'prod5' },
    { id: 'sale8', productName: 'Bonrolle 57mm x 15m', productDetails: 'Thermopapier - 57mm / 15m', price: 0.35, quantity: 600, totalAmount: 210, saleDate: new Date('2026-04-15'), customerId: 'cust2', productId: 'prod1' },
    { id: 'sale9', productName: 'Bonrolle 80mm x 80m', productDetails: 'Thermopapier - 80mm / 80m', price: 1.10, quantity: 200, totalAmount: 220, saleDate: new Date('2026-05-01'), customerId: 'cust4', productId: 'prod6' },
    { id: 'sale10', productName: 'Bonrolle 57mm x 25m', productDetails: 'Thermopapier - 57mm / 25m', price: 0.50, quantity: 350, totalAmount: 175, saleDate: new Date('2026-05-10'), customerId: 'cust5', productId: 'prod3' },
  ];

  for (const s of sales) {
    await prisma.sale.upsert({
      where: { id: s.id },
      update: {},
      create: s,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
