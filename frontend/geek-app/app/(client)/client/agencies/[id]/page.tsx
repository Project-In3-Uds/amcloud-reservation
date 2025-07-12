"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AgencyVerificationService } from "@/lib/agency-verification"

interface SimpleAgence {
  id: number
  nom: string
  description: string
  ville: string
  themeColorPrimary: string
  themeColorSecondary: string
}

export default function AgencyDetailPage() {
  const params = useParams()
  const agenceId = Number.parseInt(params.id as string)
  const [agence, setAgence] = useState<SimpleAgence | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      const mockAgence: SimpleAgence = {
        id: agenceId,
        nom: `Agence ${agenceId}`,
        description: "Description détaillée de l'agence avec tous ses services et avantages.",
        ville: "Paris",
        themeColorPrimary: "#3B82F6",
        themeColorSecondary: "#1E40AF",
      }
      setAgence(mockAgence)
      setLoading(false)
    }, 500)
  }, [agenceId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'agence...</p>
        </div>
      </div>
    )
  }

  if (!agence) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Agence non trouvée</h2>
          <p className="text-gray-600 mt-2">L'agence #{agenceId} n'existe pas.</p>
          <Link href="/client/agencies">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux agences
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="relative h-64"
        style={{
          background: `linear-gradient(135deg, ${agence.themeColorPrimary} 0%, ${agence.themeColorSecondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <Link href="/client/agencies">
              <Button variant="secondary" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-2">{agence.nom}</h1>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{agence.ville}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-1 fill-current" />
                <span>4.8 (124 avis)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos de {agence.nom}</h2>
          <p className="text-gray-700 mb-6">{agence.description}</p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">✅ Page de détail de l'agence #{agenceId} chargée avec succès !</p>
          </div>
        </div>
      </div>
    </div>
  )
}
