"use client"

import { useTempAgency } from "../../../contexts/temp-agency-context"
import { Users, MapPin, TrendingUp, Calendar, Bus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TempAgencyDashboard() {
  const { selectedAgency } = useTempAgency()

  const quickStats = [
    { name: "Personnel actif", value: "12", icon: Users, color: "text-blue-600", href: "/temp-agency/personnel" },
    { name: "Trajets configurés", value: "8", icon: MapPin, color: "text-green-600", href: "/temp-agency/trajets" },
    { name: "Voyages ce mois", value: "45", icon: Bus, color: "text-purple-600", href: "/temp-agency/voyages" },
    { name: "Réservations", value: "156", icon: Calendar, color: "text-orange-600", href: "/temp-agency/reservations" },
  ]

  const recentActivities = [
    { type: "reservation", message: "Nouvelle réservation pour Yaoundé → Douala", time: "Il y a 5 min" },
    { type: "personnel", message: "Jean Mballa a terminé son voyage", time: "Il y a 15 min" },
    { type: "payment", message: "Paiement reçu: 5,000 FCFA (MTN Money)", time: "Il y a 30 min" },
    { type: "trip", message: "Voyage Douala → Bafoussam programmé", time: "Il y a 1h" },
  ]

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600">Vue d'ensemble de {selectedAgency?.nom}</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/temp-agency/voyages">
              <Button className="bg-green-600 hover:bg-green-700">
                <Bus className="h-4 w-4 mr-2" />
                Nouveau voyage
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.name} href={stat.href}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activités récentes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Activités récentes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/temp-agency/personnel">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                  <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 text-center">Gérer le personnel</p>
                </div>
              </Link>
              <Link href="/temp-agency/trajets">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 text-center">Configurer trajets</p>
                </div>
              </Link>
              <Link href="/temp-agency/reservations">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors cursor-pointer">
                  <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 text-center">Voir réservations</p>
                </div>
              </Link>
              <Link href="/temp-agency/stats">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors cursor-pointer">
                  <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 text-center">Voir statistiques</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
