"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "../contexts/auth-context"
import {
  Bus, LogOut, Menu, X, Navigation, Search, Building2, MessageSquare, Home, Settings, Bell
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!user && pathname !== "/login" && pathname !== "/register") {
      router.push("/login")
    }
  }, [user, pathname, router])

  const navigationItems = [
    { name: "Accueil", href: "/dashboard", icon: Home },
    { name: "Rechercher", href: "/search", icon: Search },
    { name: "Agences", href: "/agencies-public", icon: Building2, badge: 12 },
    { name: "Commentaires", href: "/comments", icon: MessageSquare, badge: 3 },
    { name: "Navigation", href: "/sitemap", icon: Navigation },
    { name: "Notifications", href: "/notifications", icon: Bell, badge: 5 },
    { name: "Paramètres", href: "/settings", icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Ne rien afficher si utilisateur non connecté
  if (!user && pathname !== "/login" && pathname !== "/register") return null

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <div className={`flex flex-col h-full overflow-hidden ${sidebarOpen ? "px-4 py-6" : "hidden"}`}>
          {/* Logo */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Bus className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">GeekTraveller</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-3 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
              <AvatarFallback>{user?.username?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-100 text-green-700 border-r-2 border-green-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="destructive" className="text-xs h-5 w-5 p-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="pt-6">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">
            {navigationItems.find((item) => pathname === item.href)?.name || ""}
          </h1>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
              5
            </Badge>
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  )
}
