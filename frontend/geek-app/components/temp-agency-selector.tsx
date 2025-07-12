"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Calendar,
  MapPin,
  Settings,
  Bus,
  BarChart3,
  Menu,
  X,
  LogOut,
  User,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useTempAgency } from "../contexts/temp-agency-context" // Assurez-vous que ce contexte est bien défini
import { useAuth } from "../contexts/auth-context" // Pour la déconnexion

interface TempAgencyDashboardLayoutProps {
  children: React.ReactNode
}

export function TempAgencyDashboardLayout({ children }: TempAgencyDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { selectedAgency } = useTempAgency() // Contexte de l'agence sélectionnée
  const { user, logout } = useAuth() // Contexte d'authentification

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!user && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
      router.push("/login")
    }
  }, [user, pathname, router])

  const handleLogout = () => {
    logout()
    router.push("/login") // Rediriger vers la page de connexion après déconnexion
  }

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
      badge: 12, // Exemple de badge
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
      badge: 3, // Voyages en attente
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

  // Ne pas afficher le layout si l'utilisateur n'est pas connecté et n'est pas sur les pages de login/register
  if (!user && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
    return null // Ou un loader si vous préférez
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo et Nom de l'agence */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link href="/temp-agency/dashboard" className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Agence Dashboard</span>
            </Link>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Informations de l'agence */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedAgency?.logo || "/placeholder.svg"} alt={selectedAgency?.nom} />
                <AvatarFallback
                  className="text-white font-bold"
                  style={{ backgroundColor: selectedAgency?.themeColorPrimary || "#3B82F6" }}
                >
                  {selectedAgency?.nom?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{selectedAgency?.nom || "Mon Agence"}</p>
                <p className="text-xs text-gray-500 truncate">
                  {selectedAgency?.ville && selectedAgency?.quartier
                    ? `${selectedAgency.ville} - ${selectedAgency.quartier}`
                    : "Localisation non définie"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation de l'agence */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bouton de déconnexion */}
          <div className="p-4 border-t">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full bg-transparent border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* En-tête du contenu principal */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">
              {navigationItems.find((item) => item.current)?.name || "Tableau de bord Agence"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications pour l'agence */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                5
              </Badge>
            </Button>
            {/* Profil utilisateur (si différent de l'agence) */}
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} alt={user?.username} />
              <AvatarFallback className="bg-gray-200 text-gray-700">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Contenu de la page */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
