import { UserBaseSchema } from "./user-base.schema";

export const UserCreateSchema = UserBaseSchema.omit({
  id: true,
  createdAt: true,
  neighborhoodId: true,
});
