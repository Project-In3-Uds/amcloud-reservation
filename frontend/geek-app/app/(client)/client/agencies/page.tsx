"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Star, Bus, ArrowRight } from "lucide-react"
import Link from "next/link"
import { AgencyVerificationService } from "@/lib/agency-verification"


// Interface simplifiée
interface SimpleAgence {
  id: number
  nom: string
  description: string
  ville: string
  themeColorPrimary: string
  themeColorSecondary: string
}

export default function AgenciesPage() {
  const [agences, setAgences] = useState<SimpleAgence[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Données simplifiées pour test
    const mockAgences: SimpleAgence[] = [
      {
        id: 1,
        nom: "Transport Express",
        description: "Spécialisée dans les voyages longue distance avec un service premium.",
        ville: "Paris",
        themeColorPrimary: "#3B82F6",
        themeColorSecondary: "#1E40AF",
      },
      {
        id: 2,
        nom: "Voyage Rapide",
        description: "Transport économique et fiable pour tous vos déplacements.",
        ville: "Lyon",
        themeColorPrimary: "#10B981",
        themeColorSecondary: "#047857",
      },
      {
        id: 3,
        nom: "Bus Confort",
        description: "Le confort avant tout ! Sièges premium, WiFi gratuit.",
        ville: "Marseille",
        themeColorPrimary: "#F59E0B",
        themeColorSecondary: "#D97706",
      },
    ]

    setAgences(mockAgences)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des agences...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900">Nos Agences Partenaires</h1>
            <p className="mt-2 text-gray-600">Découvrez toutes nos agences de transport</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barre de recherche simple */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input placeholder="Rechercher une agence..." className="pl-10" />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Rechercher</Button>
          </div>
        </div>

        {/* Liste des agences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agences.map((agence) => (
            <div
              key={agence.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Header avec couleurs */}
              <div
                className="h-20 relative"
                style={{
                  background: `linear-gradient(135deg, ${agence.themeColorPrimary} 0%, ${agence.themeColorSecondary} 100%)`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              </div>

              <div className="p-6 -mt-10 relative">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                    <Bus className="h-8 w-8" style={{ color: agence.themeColorPrimary }} />
                  </div>
                </div>

                {/* Informations */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{agence.nom}</h3>
                  <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{agence.ville}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">4.8</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 text-center">{agence.description}</p>

                {/* Actions */}
                <div className="space-y-2">
                  <Link href={`/client/agencies/${agence.id}`}>
                    <Button
                      className="w-full"
                      style={{
                        backgroundColor: agence.themeColorPrimary,
                        borderColor: agence.themeColorPrimary,
                      }}
                    >
                      Voir les voyages
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    Voir le profil
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message de test */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">✅ Page des agences chargée avec succès ! {agences.length} agences trouvées.</p>
        </div>
      </div>
    </div>
  )
}
