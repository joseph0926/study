import { UserBaseSchmea } from "./user-base.schema";

export const UserCreateSchema = UserBaseSchmea.omit({
  id: true,
  createdAt: true,
  neighborhoodId: true,
});
