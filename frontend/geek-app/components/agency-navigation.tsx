"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTempAgency } from "../contexts/temp-agency-context"
import { LayoutDashboard, Users, Calendar, MapPin, Settings, Bus, BarChart3 } from "lucide-react"
import { AgencyVerificationService } from "@/lib/agency-verification"


export function AgencyNavigation() {
  const pathname = usePathname()
  const { selectedAgency } = useTempAgency()

  const navigationItems = [
    {
      name: "Tableau de bord",
      href: "/temp-agency/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/temp-agency/dashboard",
    },
    {
      name: "Personnel",
      href: "/temp-agency/personnel",
      icon: Users,
      current: pathname === "/temp-agency/personnel",
    },
    {
      name: "Trajets",
      href: "/temp-agency/trajets",
      icon: MapPin,
      current: pathname === "/temp-agency/trajets",
    },
    {
      name: "Voyages",
      href: "/temp-agency/voyages",
      icon: Bus,
      current: pathname === "/temp-agency/voyages",
    },
    {
      name: "Réservations",
      href: "/temp-agency/reservations",
      icon: Calendar,
      current: pathname === "/temp-agency/reservations",
    },
    {
      name: "Statistiques",
      href: "/temp-agency/stats",
      icon: BarChart3,
      current: pathname === "/temp-agency/stats",
    },
    {
      name: "Paramètres",
      href: "/temp-agency/settings",
      icon: Settings,
      current: pathname === "/temp-agency/settings",
    },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3 py-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: selectedAgency?.themeColorPrimary || "#3B82F6" }}
              >
                {selectedAgency?.nom?.charAt(0) || "A"}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{selectedAgency?.nom}</h2>
                <p className="text-sm text-gray-500">
                  {selectedAgency?.ville} - {selectedAgency?.quartier}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current ? "text-blue-700 bg-blue-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
