"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StarRating } from "./star-rating"
import { AgencyDetails } from "./agency-details"
import { CommentModal } from "./comment-modal"
import { Building2, MapPin, Phone, Mail, MessageSquare, Search, Eye } from "lucide-react"

interface Agency {
  id: number
  nom: string
  ville: string
  quartier: string
  adresse?: string
  telephone?: string
  email?: string
  themeColorPrimary: string
  themeColorSecondary: string
  agenceCode: string
  rating: number
  totalReviews: number
  description?: string
  services: string[]
  isVerified: boolean
}

export function AgenciesList() {
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [commentAgencyId, setCommentAgencyId] = useState<number | null>(null)

  useEffect(() => {
    loadAgencies()
  }, [])

  useEffect(() => {
    filterAgencies()
  }, [searchTerm, selectedCity, agencies])

  const loadAgencies = () => {
    const mockAgencies: Agency[] = [
      {
        id: 1,
        nom: "Touristique Express",
        ville: "Yaoundé",
        quartier: "Mvog-Ada",
        adresse: "Avenue Kennedy, Mvog-Ada",
        telephone: "+237 222 123 456",
        email: "contact@touristique-express.cm",
        themeColorPrimary: "#22C55E",
        themeColorSecondary: "#16A34A",
        agenceCode: "AGR-CM-2024-001",
        rating: 4.5,
        totalReviews: 128,
        description: "Agence de transport leader au Cameroun avec plus de 20 ans d'expérience.",
        services: ["Transport interurbain", "Location de bus", "Colis express"],
        isVerified: true,
      },
      {
        id: 2,
        nom: "Garantie Express",
        ville: "Douala",
        quartier: "Akwa",
        adresse: "Rue Joss, Akwa",
        telephone: "+237 233 456 789",
        email: "info@garantie-express.cm",
        themeColorPrimary: "#3B82F6",
        themeColorSecondary: "#1E40AF",
        agenceCode: "AGR-CM-2024-002",
        rating: 4.2,
        totalReviews: 95,
        description: "Transport sûr et confortable vers toutes les destinations du Cameroun.",
        services: ["Transport VIP", "Réservation en ligne", "Assurance voyage"],
        isVerified: true,
      },
      {
        id: 3,
        nom: "Musango Transport",
        ville: "Bafoussam",
        quartier: "Centre",
        adresse: "Marché Central, Bafoussam",
        telephone: "+237 233 789 012",
        email: "contact@musango-transport.cm",
        themeColorPrimary: "#F59E0B",
        themeColorSecondary: "#D97706",
        agenceCode: "AGR-CM-2024-003",
        rating: 3.8,
        totalReviews: 67,
        description: "Spécialiste des trajets vers l'Ouest Cameroun.",
        services: ["Transport régional", "Fret", "Tourisme"],
        isVerified: false,
      },
      {
        id: 4,
        nom: "Binam Voyage",
        ville: "Bamenda",
        quartier: "Commercial Avenue",
        adresse: "Commercial Avenue, Bamenda",
        telephone: "+237 233 345 678",
        email: "binam@voyage.cm",
        themeColorPrimary: "#EF4444",
        themeColorSecondary: "#DC2626",
        agenceCode: "AGR-CM-2024-004",
        rating: 4.0,
        totalReviews: 82,
        description: "Transport fiable vers le Nord-Ouest et au-delà.",
        services: ["Transport longue distance", "Climatisation", "WiFi gratuit"],
        isVerified: true,
      },
      {
        id: 5,
        nom: "Cameroun Express",
        ville: "Ngaoundéré",
        quartier: "Gare",
        adresse: "Gare Routière, Ngaoundéré",
        telephone: "+237 222 567 890",
        email: "express@cameroun.cm",
        themeColorPrimary: "#8B5CF6",
        themeColorSecondary: "#7C3AED",
        agenceCode: "AGR-CM-2024-005",
        rating: 4.3,
        totalReviews: 156,
        description: "Connexion rapide vers le Nord Cameroun et le Tchad.",
        services: ["Transport international", "Couchettes", "Restauration"],
        isVerified: true,
      },
    ]
    setAgencies(mockAgencies)
  }

  const filterAgencies = () => {
    let filtered = agencies

    if (searchTerm) {
      filtered = filtered.filter(
        (agency) =>
          agency.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.quartier.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCity) {
      filtered = filtered.filter((agency) => agency.ville === selectedCity)
    }

    setFilteredAgencies(filtered)
  }

  const handleRating = (agencyId: number, rating: number) => {
    setAgencies((prev) =>
      prev.map((agency) =>
        agency.id === agencyId
          ? {
              ...agency,
              rating: (agency.rating * agency.totalReviews + rating) / (agency.totalReviews + 1),
              totalReviews: agency.totalReviews + 1,
            }
          : agency,
      ),
    )
  }

  const handleShowDetails = (agency: Agency) => {
    setSelectedAgency(agency)
    setShowDetails(true)
  }

  const handleShowComments = (agencyId: number) => {
    setCommentAgencyId(agencyId)
    setShowCommentModal(true)
  }

  const cities = [...new Set(agencies.map((agency) => agency.ville))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agences de Transport</h1>
          <p className="text-gray-600">Découvrez les meilleures agences de transport au Cameroun</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {filteredAgencies.length} agence{filteredAgencies.length > 1 ? "s" : ""} trouvée
          {filteredAgencies.length > 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une agence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Toutes les villes</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgencies.map((agency) => (
          <Card key={agency.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: agency.themeColorPrimary }}
                  >
                    {agency.nom.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agency.nom}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <StarRating
                        rating={agency.rating}
                        onRate={(rating) => handleRating(agency.id, rating)}
                        size="sm"
                      />
                      <span className="text-sm text-gray-500">({agency.totalReviews})</span>
                    </div>
                  </div>
                </div>
                {agency.isVerified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Vérifiée
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {agency.ville} - {agency.quartier}
                  </span>
                </div>
                {agency.telephone && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{agency.telephone}</span>
                  </div>
                )}
                {agency.email && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{agency.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-700 line-clamp-2">{agency.description}</p>
                <div className="flex flex-wrap gap-1">
                  {agency.services.slice(0, 2).map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {agency.services.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{agency.services.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => handleShowDetails(agency)} className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Détails
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShowComments(agency.id)} className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Commenter
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAgencies.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune agence trouvée</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche ou de filtrage.</p>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <AgencyDetails agency={selectedAgency} isOpen={showDetails} onClose={() => setShowDetails(false)} />

      <CommentModal agencyId={commentAgencyId} isOpen={showCommentModal} onClose={() => setShowCommentModal(false)} />
    </div>
  )
}
