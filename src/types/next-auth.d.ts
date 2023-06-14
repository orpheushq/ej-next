import type { User as ApiUser } from "@/models/user"
declare module "next-auth" {
  type User = ApiUser
}
