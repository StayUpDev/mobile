import { UserRole } from "../types";

export type User = {
  id: String;
  email: String;
  role: UserRole;
};
