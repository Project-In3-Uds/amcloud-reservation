"use client"

import { useState } from "react"
import { useTempAgency } from "../../../contexts/temp-agency-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bus,
  MapPin,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface Voyage {
  id: number
  trajet: string
  dateDepart: string
  heureDepart: string
  heureArrivee: string
  bus: string
  chauffeur: string
  placesTotales: number
  placesReservees: number
  placesLibres: number
  prix: number
  statut: "planifie" | "en_cours" | "termine" | "annule"
  revenus: number
}

export default function TempVoyagesPage() {
  const { selectedAgency } = useTempAgency()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("tous")
  const [showAddForm, setShowAddForm] = useState(false)

  // Données de démonstration pour les voyages
  const [voyages] = useState<Voyage[]>([
    {
      id: 1,
      trajet: "Yaoundé → Douala",
      dateDepart: "2024-01-15",
      heureDepart: "08:00",
      heureArrivee: "12:00",
      bus: "Bus A1 - ABC123CM",
      chauffeur: "Jean Mballa",
      placesTotales: 50,
      placesReservees: 45,
      placesLibres: 5,
      prix: 5000,
      statut: "planifie",
      revenus: 225000,
    },
    {
      id: 2,
      trajet: "Douala → Bafoussam",
      dateDepart: "2024-01-15",
      heureDepart: "10:30",
      heureArrivee: "14:00",
      bus: "Bus B2 - DEF456CM",
      chauffeur: "Paul Nkomo",
      placesTotales: 45,
      placesReservees: 38,
      placesLibres: 7,
      prix: 7500,
      statut: "en_cours",
      revenus: 285000,
    },
    {
      id: 3,
      trajet: "Yaoundé → Bamenda",
      dateDepart: "2024-01-14",
      heureDepart: "16:00",
      heureArrivee: "21:00",
      bus: "Bus C3 - GHI789CM",
      chauffeur: "Marie Fotso",
      placesTotales: 48,
      placesReservees: 48,
      placesLibres: 0,
      prix: 8000,
      statut: "termine",
      revenus: 384000,
    },
    {
      id: 4,
      trajet: "Douala → Kribi",
      dateDepart: "2024-01-16",
      heureDepart: "09:00",
      heureArrivee: "12:30",
      bus: "Bus D4 - JKL012CM",
      chauffeur: "André Biya",
      placesTotales: 40,
      placesReservees: 25,
      placesLibres: 15,
      prix: 4500,
      statut: "planifie",
      revenus: 112500,
    },
    {
      id: 5,
      trajet: "Bafoussam → Garoua",
      dateDepart: "2024-01-13",
      heureDepart: "06:00",
      heureArrivee: "14:00",
      bus: "Bus E5 - MNO345CM",
      chauffeur: "Samuel Ateba",
      placesTotales: 52,
      placesReservees: 30,
      placesLibres: 22,
      prix: 12000,
      statut: "annule",
      revenus: 0,
    },
  ])

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "planifie":
        return <Clock className="h-4 w-4" />
      case "en_cours":
        return <Bus className="h-4 w-4" />
      case "termine":
        return <CheckCircle className="h-4 w-4" />
      case "annule":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "planifie":
        return "bg-blue-100 text-blue-800"
      case "en_cours":
        return "bg-yellow-100 text-yellow-800"
      case "termine":
        return "bg-green-100 text-green-800"
      case "annule":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "planifie":
        return "Planifié"
      case "en_cours":
        return "En cours"
      case "termine":
        return "Terminé"
      case "annule":
        return "Annulé"
      default:
        return "Inconnu"
    }
  }

  const filteredVoyages = voyages.filter((voyage) => {
    const matchesSearch =
      voyage.trajet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voyage.chauffeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voyage.bus.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "tous" || voyage.statut === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: voyages.length,
    planifies: voyages.filter((v) => v.statut === "planifie").length,
    enCours: voyages.filter((v) => v.statut === "en_cours").length,
    termines: voyages.filter((v) => v.statut === "termine").length,
    annules: voyages.filter((v) => v.statut === "annule").length,
    revenus: voyages.filter((v) => v.statut === "termine").reduce((sum, v) => sum + v.revenus, 0),
    placesVendues: voyages.reduce((sum, v) => sum + v.placesReservees, 0),
    tauxOccupation: Math.round(
      (voyages.reduce((sum, v) => sum + v.placesReservees, 0) / voyages.reduce((sum, v) => sum + v.placesTotales, 0)) *
        100,
    ),
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Voyages</h1>
            <p className="text-gray-600">Planification et suivi des voyages de {selectedAgency?.nom}</p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau voyage
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Voyages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Bus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenus Réalisés</p>
                <p className="text-2xl font-bold text-gray-900">{stats.revenus.toLocaleString()} FCFA</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Places Vendues</p>
                <p className="text-2xl font-bold text-gray-900">{stats.placesVendues}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Taux d'Occupation</p>
                <p className="text-2xl font-bold text-gray-900">{stats.tauxOccupation}%</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par trajet, chauffeur ou bus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="tous">Tous les statuts</option>
              <option value="planifie">Planifiés</option>
              <option value="en_cours">En cours</option>
              <option value="termine">Terminés</option>
              <option value="annule">Annulés</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Plus de filtres
            </Button>
          </div>
        </div>
      </div>

      {/* Résumé des filtres */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">
          {filteredVoyages.length} voyage{filteredVoyages.length > 1 ? "s" : ""} trouvé
          {filteredVoyages.length > 1 ? "s" : ""}
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {stats.planifies} planifiés
        </Badge>
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
          {stats.enCours} en cours
        </Badge>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          {stats.termines} terminés
        </Badge>
        <Badge variant="outline" className="bg-red-50 text-red-700">
          {stats.annules} annulés
        </Badge>
      </div>

      {/* Liste des voyages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVoyages.map((voyage) => (
          <Card key={voyage.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  {voyage.trajet}
                </CardTitle>
                <Badge className={`${getStatusColor(voyage.statut)} flex items-center gap-1`}>
                  {getStatusIcon(voyage.statut)}
                  {getStatusLabel(voyage.statut)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Informations de base */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{new Date(voyage.dateDepart).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span>
                      {voyage.heureDepart} - {voyage.heureArrivee}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bus className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="truncate">{voyage.bus}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{voyage.chauffeur}</span>
                  </div>
                </div>

                {/* Occupation des places */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Occupation</span>
                    <span className="font-medium">
                      {voyage.placesReservees}/{voyage.placesTotales} places
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        voyage.placesReservees / voyage.placesTotales > 0.8
                          ? "bg-red-500"
                          : voyage.placesReservees / voyage.placesTotales > 0.6
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${(voyage.placesReservees / voyage.placesTotales) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{voyage.placesLibres} places libres</span>
                    <span>{Math.round((voyage.placesReservees / voyage.placesTotales) * 100)}%</span>
                  </div>
                </div>

                {/* Revenus */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <div>
                    <span className="text-sm text-gray-600">Prix: </span>
                    <span className="font-medium">{voyage.prix.toLocaleString()} FCFA</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Revenus: </span>
                    <span className="font-bold text-green-600">{voyage.revenus.toLocaleString()} FCFA</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  {voyage.statut === "planifie" && (
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVoyages.length === 0 && (
        <div className="text-center py-12">
          <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun voyage trouvé</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== "tous"
              ? "Essayez de modifier vos critères de recherche"
              : "Commencez par créer votre premier voyage"}
          </p>
          {!searchTerm && statusFilter === "tous" && (
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Créer un voyage
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
