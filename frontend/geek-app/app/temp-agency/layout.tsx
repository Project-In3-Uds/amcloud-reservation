"use client"

import type React from "react"

import { TempAgencyProvider } from "../../contexts/temp-agency-context"
import { AgencyNavigation } from "../../components/agency-navigation"

export default function TempAgencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TempAgencyProvider>
      <div className="min-h-screen bg-gray-50">
        <AgencyNavigation />
        <main>{children}</main>
      </div>
    </TempAgencyProvider>
  )
}
