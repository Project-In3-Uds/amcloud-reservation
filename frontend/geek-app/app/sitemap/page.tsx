import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, User, Building, Users, Search, Settings, Home, CreditCard, BarChart3, Clock } from "lucide-react"

export default function SitemapPage() {
  const pageCategories = [
    {
      title: "Pages Principales",
      icon: <Home className="h-5 w-5" />,
      links: [
        { href: "/", label: "Accueil" },
        { href: "/search", label: "Recherche" },
        { href: "/agencies-public", label: "Agences Publiques" },
        { href: "/test-agencies", label: "Test Agences" },
      ],
    },
    {
      title: "Espace Client",
      icon: <User className="h-5 w-5" />,
      links: [
        { href: "/client/dashboard", label: "Dashboard Client" },
        { href: "/client/agencies", label: "Agences" },
        { href: "/client/agencies/1", label: "Détail Agence" },
      ],
    },
    {
      title: "Espace Agence",
      icon: <Building className="h-5 w-5" />,
      links: [
        { href: "/agency/dashboard", label: "Dashboard Agence" },
        { href: "/agency/trajets", label: "Gestion Trajets" },
        { href: "/agency/personnel", label: "Gestion Personnel" },
        { href: "/agency/reservations", label: "Réservations" },
        { href: "/agency/settings", label: "Paramètres" },
      ],
    },
    {
      title: "Espace Personnel",
      icon: <Users className="h-5 w-5" />,
      links: [{ href: "/personnel/dashboard", label: "Dashboard Personnel" }],
    },
    {
      title: "Agence Temporaire (Demo)",
      icon: <Clock className="h-5 w-5" />,
      links: [
        { href: "/temp-agency", label: "Sélection Agence" },
        { href: "/temp-agency/dashboard", label: "Dashboard Temp" },
        { href: "/temp-agency/trajets", label: "Trajets Temp" },
        { href: "/temp-agency/personnel", label: "Personnel Temp" },
        { href: "/temp-agency/reservations", label: "Réservations Temp" },
        { href: "/temp-agency/voyages", label: "Voyages Temp" },
        { href: "/temp-agency/stats", label: "Statistiques Temp" },
        { href: "/temp-agency/settings", label: "Paramètres Temp" },
      ],
    },
    {
      title: "Réservations & Paiements",
      icon: <CreditCard className="h-5 w-5" />,
      links: [{ href: "/reservation/1", label: "Réservation Route 1" }],
    },
    {
      title: "Outils & Debug",
      icon: <Settings className="h-5 w-5" />,
      links: [{ href: "/debug", label: "Debug" }],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Navigation - Toutes les Pages</h1>
                <p className="mt-2 text-gray-600">Accès direct à toutes les pages de l'application</p>
              </div>
              <Link href="/">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Home className="h-4 w-4 mr-2" />
                  Retour Accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  {category.icon}
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="block p-3 border border-gray-200 rounded-md hover:border-green-500 hover:bg-green-50 transition-all"
                    >
                      <div className="font-medium text-green-700 hover:text-green-800">{link.label}</div>
                      <div className="text-xs text-gray-400 mt-1 font-mono">{link.href}</div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actions Rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/search">
              <Button className="w-full h-16 flex flex-col items-center space-y-1 bg-green-600 hover:bg-green-700">
                <Search className="h-5 w-5" />
                <span className="text-sm">Rechercher</span>
              </Button>
            </Link>
            <Link href="/temp-agency/stats">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center space-y-1 bg-transparent">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm">Statistiques</span>
              </Button>
            </Link>
            <Link href="/temp-agency/voyages">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center space-y-1 bg-transparent">
                <Bus className="h-5 w-5" />
                <span className="text-sm">Voyages</span>
              </Button>
            </Link>
            <Link href="/temp-agency/settings">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center space-y-1 bg-transparent">
                <Settings className="h-5 w-5" />
                <span className="text-sm">Paramètres</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
