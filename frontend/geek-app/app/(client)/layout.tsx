import type React from "react"
import { RoleGuard } from "../../components/role-guard"
import { UserRole } from "../../lib/types"
import { Header } from "../../components/dashbord-layout"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRoles={[UserRole.CLIENT]} fallbackPath="/agency/dashboard">
      <Header />
      {children}
    </RoleGuard>
  )
}
