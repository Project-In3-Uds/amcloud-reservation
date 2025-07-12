import type React from "react"
import { RoleGuard } from "@/components/role-guard"
import { UserRole } from "../../lib/types"

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRoles={[UserRole.AGENCY]} fallbackPath="/client/dashboard">
      {children}
    </RoleGuard>
  )
}
