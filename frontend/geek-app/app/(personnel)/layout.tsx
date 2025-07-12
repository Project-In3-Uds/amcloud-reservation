import type React from "react"
import { RoleGuard } from "@/components/role-guard"
import { UserRole } from "../../lib/types"

export default function PersonnelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RoleGuard allowedRoles={[UserRole.PERSONNEL]}>{children}</RoleGuard>
}
