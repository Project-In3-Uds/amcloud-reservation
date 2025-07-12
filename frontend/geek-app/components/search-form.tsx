"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Building, Search } from "lucide-react"
import { CAMEROON_CITIES } from "../lib/cameroon-data"
import { SearchResults } from "./search-results"
import type { Agence, Trip } from "../lib/types"

interface SearchFormProps {
  showResults?: boolean
}

export function SearchForm({ showResults = true }: SearchFormProps) {
  const [agences, setAgences] = useState<Agence[]>([])
  const [allTrips, setAllTrips] = useState<Trip[]>([])
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: "",
    passengers: "1",
    agenceId: "",
  })

  // Listes filtrées pour les dropdowns
  const [availableDepartures, setAvailableDepartures] = useState<string[]>([])
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([])
  const [availableAgencies, setAvailableAgencies] = useState<Agence[]>([])

  useEffect(() => {
    loadAgences()
    loadAllTrips()
  }, [])

  useEffect(() => {
    updateAvailableOptions()
  }, [formData.departure, formData.destination, formData.agenceId, allTrips])

  const loadAgences = async () => {
    const mockAgences: Agence[] = [
      {
        id: 1,
        nom: "Touristique Express",
        ville: "Yaoundé",
        quartier: "Mvog-Ada",
        themeColorPrimary: "#22C55E",
        themeColorSecondary: "#16A34A",
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
        agenceCode: "AGR-CM-2024-003",
        adresse: undefined
      },
      {
        id: 4,
        nom: "Binam Voyage",
        ville: "Bamenda",
        quartier: "Commercial Avenue",
        themeColorPrimary: "#EF4444",
        themeColorSecondary: "#DC2626",
        agenceCode: "AGR-CM-2024-004",
        adresse: undefined
      },
      {
        id: 5,
        nom: "Cameroun Express",
        ville: "Ngaoundéré",
        quartier: "Gare",
        themeColorPrimary: "#8B5CF6",
        themeColorSecondary: "#7C3AED",
        agenceCode: "AGR-CM-2024-005",
        adresse: undefined
      },
    ]
    setAgences(mockAgences)
  }

  const loadAllTrips = async () => {
    const mockTrips: Trip[] = [
      // Touristique Express (Yaoundé-Douala)
      {
        id: 1,
        dateDepart: "2024-01-15T08:00:00",
        idTrajet: 1,
        idBus: 1,
        idAgence: 1,
        price: 5000,
        trajet: {
          id: 1,
          villeDepart: "Yaoundé",
          villeArrivee: "Douala",
          distance: 250,
          idAgence: 1,
          heureDepart: "08:00:00",
          heureArrivee: "12:00:00",
        },
        bus: {
          id: 1,
          immatriculation: "CE-1234-YA",
          capacite: 70,
          idTrajet: 1,
          idAgence: 1,
        },
        agence: {
          id: 1,
          nom: "Touristique Express",
          ville: "Yaoundé",
          themeColorPrimary: "#22C55E",
          themeColorSecondary: "#16A34A",
          agenceCode: "AGR-CM-2024-001",
          adresse: undefined
        },
        availableSeats: Array.from({ length: 45 }, (_, i) => ({
          id: i + 1,
          numero: i + 1,
          etat: "libre" as const,
          idBus: 1,
        })),
      },
      // Garantie Express (Douala-Bafoussam)
      {
        id: 2,
        dateDepart: "2024-01-15T10:00:00",
        idTrajet: 2,
        idBus: 2,
        idAgence: 2,
        price: 7500,
        trajet: {
          id: 2,
          villeDepart: "Douala",
          villeArrivee: "Bafoussam",
          distance: 200,
          idAgence: 2,
          heureDepart: "10:00:00",
          heureArrivee: "13:30:00",
        },
        bus: {
          id: 2,
          immatriculation: "LT-5678-DLA",
          capacite: 50,
          idTrajet: 2,
          idAgence: 2,
        },
        agence: {
          id: 2,
          nom: "Garantie Express",
          ville: "Douala",
          themeColorPrimary: "#3B82F6",
          themeColorSecondary: "#1E40AF",
          agenceCode: "AGR-CM-2024-002",
          adresse: undefined
        },
        availableSeats: Array.from({ length: 30 }, (_, i) => ({
          id: i + 51,
          numero: i + 1,
          etat: "libre" as const,
          idBus: 2,
        })),
      },
      // Binam Voyage (Yaoundé-Bamenda)
      {
        id: 3,
        dateDepart: "2024-01-15T16:00:00",
        idTrajet: 3,
        idBus: 3,
        idAgence: 4,
        price: 8000,
        trajet: {
          id: 3,
          villeDepart: "Yaoundé",
          villeArrivee: "Bamenda",
          distance: 350,
          idAgence: 4,
          heureDepart: "16:00:00",
          heureArrivee: "21:00:00",
        },
        bus: {
          id: 3,
          immatriculation: "NO-3456-BD",
          capacite: 60,
          idTrajet: 3,
          idAgence: 4,
        },
        agence: {
          id: 4,
          nom: "Binam Voyage",
          ville: "Bamenda",
          themeColorPrimary: "#EF4444",
          themeColorSecondary: "#DC2626",
          agenceCode: "AGR-CM-2024-004",
          adresse: undefined
        },
        availableSeats: Array.from({ length: 40 }, (_, i) => ({
          id: i + 151,
          numero: i + 1,
          etat: "libre" as const,
          idBus: 3,
        })),
      },
      // Touristique Express (Yaoundé-Kribi)
      {
        id: 4,
        dateDepart: "2024-01-15T09:00:00",
        idTrajet: 4,
        idBus: 4,
        idAgence: 1,
        price: 4500,
        trajet: {
          id: 4,
          villeDepart: "Yaoundé",
          villeArrivee: "Kribi",
          distance: 180,
          idAgence: 1,
          heureDepart: "09:00:00",
          heureArrivee: "12:00:00",
        },
        bus: {
          id: 4,
          immatriculation: "CE-7890-YA",
          capacite: 45,
          idTrajet: 4,
          idAgence: 1,
        },
        agence: {
          id: 1,
          nom: "Touristique Express",
          ville: "Yaoundé",
          themeColorPrimary: "#22C55E",
          themeColorSecondary: "#16A34A",
          agenceCode: "AGR-CM-2024-001",
          adresse: undefined
        },
        availableSeats: Array.from({ length: 35 }, (_, i) => ({
          id: i + 201,
          numero: i + 1,
          etat: "libre" as const,
          idBus: 4,
        })),
      },
      // Cameroun Express (Douala-Ngaoundéré)
      {
        id: 5,
        dateDepart: "2024-01-15T06:00:00",
        idTrajet: 5,
        idBus: 5,
        idAgence: 5,
        price: 12000,
        trajet: {
          id: 5,
          villeDepart: "Douala",
          villeArrivee: "Ngaoundéré",
          distance: 500,
          idAgence: 5,
          heureDepart: "06:00:00",
          heureArrivee: "14:00:00",
        },
        bus: {
          id: 5,
          immatriculation: "AD-1111-NG",
          capacite: 55,
          idTrajet: 5,
          idAgence: 5,
        },
        agence: {
          id: 5,
          nom: "Cameroun Express",
          ville: "Ngaoundéré",
          themeColorPrimary: "#8B5CF6",
          themeColorSecondary: "#7C3AED",
          agenceCode: "AGR-CM-2024-005",
          adresse: undefined
        },
        availableSeats: Array.from({ length: 25 }, (_, i) => ({
          id: i + 251,
          numero: i + 1,
          etat: "libre" as const,
          idBus: 5,
        })),
      },
    ]
    setAllTrips(mockTrips)
  }

  const updateAvailableOptions = () => {
    let filteredTrips = allTrips

    // Filtrer par agence si sélectionnée
    if (formData.agenceId) {
      filteredTrips = filteredTrips.filter((trip) => trip.idAgence === Number.parseInt(formData.agenceId))
    }

    // Filtrer par ville de départ si sélectionnée
    if (formData.departure) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.trajet?.villeDepart?.toLowerCase().includes(formData.departure.toLowerCase()),
      )
    }

    // Filtrer par ville d'arrivée si sélectionnée
    if (formData.destination) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.trajet?.villeArrivee?.toLowerCase().includes(formData.destination.toLowerCase()),
      )
    }

    // Extraire les villes de départ disponibles
    const departures = [...new Set(filteredTrips.map((trip) => trip.trajet?.villeDepart).filter(Boolean))]
    setAvailableDepartures(departures)

    // Extraire les villes d'arrivée disponibles
    const destinations = [...new Set(filteredTrips.map((trip) => trip.trajet?.villeArrivee).filter(Boolean))]
    setAvailableDestinations(destinations)

    // Extraire les agences disponibles
    const agencyIds = [...new Set(filteredTrips.map((trip) => trip.idAgence))]
    const availableAgenciesFiltered = agences.filter((agence) => agencyIds.includes(agence.id))
    setAvailableAgencies(availableAgenciesFiltered)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSearchPerformed(true)

    // Simuler un délai de recherche
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Filtrer les trajets selon les critères
    const filtered = await filterTrips()
    setFilteredTrips(filtered)
    setLoading(false)
  }

  const filterTrips = async (): Promise<Trip[]> => {
    let filtered = allTrips

    // Filtrer par ville de départ
    if (formData.departure) {
      filtered = filtered.filter((trip) =>
        trip.trajet?.villeDepart?.toLowerCase().includes(formData.departure.toLowerCase()),
      )
    }

    // Filtrer par ville d'arrivée
    if (formData.destination) {
      filtered = filtered.filter((trip) =>
        trip.trajet?.villeArrivee?.toLowerCase().includes(formData.destination.toLowerCase()),
      )
    }

    // Filtrer par agence
    if (formData.agenceId) {
      filtered = filtered.filter((trip) => trip.idAgence === Number.parseInt(formData.agenceId))
    }

    // Filtrer par nombre de places disponibles
    const passengersNeeded = Number.parseInt(formData.passengers)
    filtered = filtered.filter((trip) => (trip.availableSeats?.length || 0) >= passengersNeeded)

    // Trier par heure de départ
    filtered.sort((a, b) => {
      const timeA = a.trajet?.heureDepart || "00:00:00"
      const timeB = b.trajet?.heureDepart || "00:00:00"
      return timeA.localeCompare(timeB)
    })

    return filtered
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Réinitialiser les champs dépendants
    if (name === "departure" && value !== formData.departure) {
      setFormData({
        ...formData,
        [name]: value,
        destination: "", // Réinitialiser la destination
      })
    } else if (name === "agenceId" && value !== formData.agenceId) {
      setFormData({
        ...formData,
        [name]: value,
        departure: "", // Réinitialiser le départ
        destination: "", // Réinitialiser la destination
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const resetSearch = () => {
    setFormData({
      departure: "",
      destination: "",
      date: "",
      passengers: "1",
      agenceId: "",
    })
    setSearchPerformed(false)
    setFilteredTrips([])
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Agence (en premier pour filtrer les autres options) */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Agence</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="agenceId"
                  value={formData.agenceId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Toutes les agences</option>
                  {(formData.agenceId ? agences : availableAgencies.length > 0 ? availableAgencies : agences).map(
                    (agence) => (
                      <option key={agence.id} value={agence.id}>
                        {agence.nom}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            {/* Départ */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ville de départ</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="departure"
                  value={formData.departure}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Toutes les villes</option>
                  {(availableDepartures.length > 0 ? availableDepartures : CAMEROON_CITIES.map((c) => c.name)).map(
                    (city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            {/* Arrivée */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ville d'arrivée</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Toutes les villes</option>
                  {(availableDestinations.length > 0 ? availableDestinations : CAMEROON_CITIES.map((c) => c.name)).map(
                    (city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de voyage</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="pl-10"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Passagers */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Passagers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="1">1 passager</option>
                  <option value="2">2 passagers</option>
                  <option value="3">3 passagers</option>
                  <option value="4">4 passagers</option>
                  <option value="5">5+ passagers</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <Button type="submit" disabled={loading} className="#ffffff ">
              <Search className="h-5 w-5 mr-2" />
              {loading ? "Recherche..." : " rechercher un trajet"}
            </Button>
            {searchPerformed && (
              <Button type="button" variant="outline" onClick={resetSearch} className="px-6 py-3 bg-transparent">
                Nouvelle recherche
              </Button>
            )}
          </div>

          {/* Indicateur de filtrage intelligent */}
          {(formData.agenceId || formData.departure || formData.destination) && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                <span>
                  Filtrage intelligent activé •{" "}
                  {formData.agenceId &&
                    `Agence: ${agences.find((a) => a.id === Number.parseInt(formData.agenceId))?.nom}`}
                  {formData.departure && ` • Départ: ${formData.departure}`}
                  {formData.destination && ` • Arrivée: ${formData.destination}`}
                </span>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Résultats de recherche */}
      {showResults && (
        <div className="max-w-5xl mx-auto">
          <SearchResults trips={filteredTrips} loading={loading} searchPerformed={searchPerformed} />
        </div>
      )}
    </div>
  )
}
