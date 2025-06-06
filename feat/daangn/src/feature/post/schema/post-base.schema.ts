import { z } from 'zod';

const CategoryEnumSchema = z.enum([
  'DIGITAL',
  'FURNITURE',
  'BABY',
  'FASHION',
  'BOOK',
  'ETC',
]);
const TradeStatusEnumSchema = z.enum(['ON_SALE', 'RESERVED', 'SOLD_OUT']);

export const PostBaseSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, { message: 'title은 최소 1자 이상이어야합니다.' })
    .max(100, { message: 'title은 최대 100자입니다.' }),
  content: z
    .string()
    .min(1, { message: 'content는 최소 1자 이상이어야합니다.' }),
  price: z.number().int().nonnegative().nullable(),
  category: CategoryEnumSchema,
  status: TradeStatusEnumSchema.optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

  authorId: z.string().uuid(),
  neighborhoodId: z.string().uuid(),
});
export type PostBaseSchemaType = z.infer<typeof PostBaseSchema>;
