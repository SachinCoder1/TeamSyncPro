export type Role = "ADMIN" | "MEMBER" | "VIEWER"

export const ROLES = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
  VIEWER: "VIEWER",
} as const
