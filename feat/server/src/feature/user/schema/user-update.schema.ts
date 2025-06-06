import { z } from "zod";
import { UserBaseSchema } from "./user-base.schema";

export const UserUpdateSchema = UserBaseSchema.partial().extend({
  id: z.string().uuid(),
});
