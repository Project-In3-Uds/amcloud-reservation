"use client"

import type React from "react"

import { useAuth } from "../contexts/auth-context"
import type { UserRole } from "../lib/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallbackPath?: string
}

export function RoleGuard({ children, allowedRoles, fallbackPath = "/" }: RoleGuardProps) {
  const { userAccount, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/")
        return
      }

      if (userAccount && !allowedRoles.includes(userAccount.role)) {
        // Redirection selon le rôle de l'utilisateur
        switch (userAccount.role) {
          case "AGENCY":
            router.push("/agency/dashboard")
            break
          case "PERSONNEL":
            router.push("/personnel/dashboard")
            break
          case "CLIENT":
          default:
            router.push("/client/dashboard")
            break
        }
        return
      }
    }
  }, [userAccount, loading, isAuthenticated, allowedRoles, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated || !userAccount || !allowedRoles.includes(userAccount.role)) {
    return null
  }

  return <>{children}</>
}
