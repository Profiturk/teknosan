import { z } from 'zod';

export const SaleSchema = z.object({
  productName: z.string().min(1, 'Produktname ist erforderlich').max(200),
  productDetails: z.string().max(500).optional().nullable(),
  price: z.number({ invalid_type_error: 'Preis muss eine Zahl sein' }).positive('Preis muss größer als 0 sein'),
  quantity: z.number().int().positive('Menge muss mindestens 1 sein').default(1),
  saleDate: z.string().optional(),
  customerId: z.string().min(1, 'Kunde ist erforderlich'),
  productId: z.string().optional().nullable(),
  taxType: z.enum(['B', 'N', 'B-N', 'N-B']).optional().nullable(),
  paymentMethod: z.enum(['Bar', 'SEPA', 'Überweisung', 'Karte']).optional().nullable(),
});

export const CustomerSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(200),
  phone: z.string().max(50).optional().nullable(),
  email: z.string().email('Ungültige E-Mail-Adresse').max(200).optional().nullable().or(z.literal('')),
  address: z.string().max(500).optional().nullable(),
});

export const ProductSchema = z.object({
  name: z.string().min(1, 'Produktname ist erforderlich').max(200),
  description: z.string().max(500).optional().nullable(),
  width: z.string().max(50).optional().nullable(),
  length: z.string().max(50).optional().nullable(),
  price: z.number({ invalid_type_error: 'Preis muss eine Zahl sein' }).min(0),
  stock: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
});
