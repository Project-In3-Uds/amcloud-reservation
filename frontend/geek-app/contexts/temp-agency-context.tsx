"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Agence } from "../lib/types"

interface TempAgencyContextType {
  selectedAgency: Agence | null
  setSelectedAgency: (agency: Agence) => void
  availableAgencies: Agence[]
}

const TempAgencyContext = createContext<TempAgencyContextType | undefined>(undefined)

export function TempAgencyProvider({ children }: { children: React.ReactNode }) {
  const availableAgencies: Agence[] = [
    {
      id: 1,
      nom: "Touristique Express",
      ville: "Yaoundé",
      quartier: "Mvog-Ada",
      themeColorPrimary: "#22C55E",
      themeColorSecondary: "#16A34A",
      description: "Spécialisée dans les voyages longue distance avec un service premium.",
      agenceCode: "AGR-CM-2024-001",
      adresse: undefined
    },
    {
      id: 2,
      nom: "Garantie Express",
      ville: "Douala",
      quartier: "Akwa",
      themeColorPrimary: "#3B82F6",
      themeColorSecondary: "#1E40AF",
      description: "Transport économique et fiable pour tous vos déplacements.",
      agenceCode: "AGR-CM-2024-002",
      adresse: undefined
    },
    {
      id: 3,
      nom: "Musango Transport",
      ville: "Bafoussam",
      quartier: "Centre",
      themeColorPrimary: "#F59E0B",
      themeColorSecondary: "#D97706",
      description: "Le confort avant tout ! Sièges premium, WiFi gratuit.",
      agenceCode: "AGR-CM-2024-003",
      adresse: undefined
    },
  ]

  const [selectedAgency, setSelectedAgency] = useState<Agence | null>(availableAgencies[0])

  return (
    <TempAgencyContext.Provider value={{ selectedAgency, setSelectedAgency, availableAgencies }}>
      {children}
    </TempAgencyContext.Provider>
  )
}

export function useTempAgency() {
  const context = useContext(TempAgencyContext)
  if (context === undefined) {
    throw new Error("useTempAgency must be used within a TempAgencyProvider")
  }
  return context
}
