import { z } from "zod";
import { UserBaseSchmea } from "./user-base.schema";

export const UserUpdateSchema = UserBaseSchmea.partial().extend({
  id: z.string().uuid(),
});
