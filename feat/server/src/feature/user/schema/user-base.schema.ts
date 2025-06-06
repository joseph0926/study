import { z } from "zod";

export const UserBaseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  nickname: z
    .string()
    .min(1, { message: "nickname은 최소 1자 이상이어야합니다." })
    .max(12, { message: "nickname은 최대 12자입니다." }),

  createdAt: z.date().optional(),

  neighborhoodId: z.string().uuid(),
});
