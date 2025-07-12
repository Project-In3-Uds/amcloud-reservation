"use client"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Star, Bus } from "lucide-react"
import Link from "next/link"
import type { Trip } from "../lib/types"

interface SearchResultsProps {
  trips: Trip[]
  loading: boolean
  searchPerformed: boolean
}

export function SearchResults({ trips, loading, searchPerformed }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Recherche des trajets disponibles...</p>
      </div>
    )
  }

  if (!searchPerformed) {
    return null
  }

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun trajet trouvé</h3>
        <p className="text-gray-600">Essayez de modifier vos critères de recherche ou choisissez une autre date.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {trips.length} trajet{trips.length > 1 ? "s" : ""} trouvé{trips.length > 1 ? "s" : ""}
        </h2>
        <div className="text-sm text-gray-600">Triés par heure de départ</div>
      </div>

      {trips.map((trip) => (
        <div key={trip.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
          <div className="flex items-center justify-between">
            {/* Informations du trajet */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                {/* Logo/Couleur de l'agence */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: trip.agence?.themeColorPrimary || "#3B82F6" }}
                >
                  {trip.agence?.nom?.charAt(0) || "A"}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{trip.agence?.nom}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>4.5 (120 avis)</span>
                  </div>
                </div>
              </div>

              {/* Route et horaires */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="font-medium text-gray-900">{trip.trajet?.villeDepart}</p>
                    <p className="text-sm text-gray-600">
                      {trip.trajet?.heureDepart
                        ? new Date(`2000-01-01T${trip.trajet.heureDepart}`).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Heure à confirmer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <Bus className="h-4 w-4" />
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="font-medium text-gray-900">{trip.trajet?.villeArrivee}</p>
                    <p className="text-sm text-gray-600">
                      {trip.trajet?.heureArrivee
                        ? new Date(`2000-01-01T${trip.trajet.heureArrivee}`).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Heure à confirmer"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Durée: {trip.trajet?.distance ? `${Math.round(trip.trajet.distance / 60)}h` : "4h"}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{trip.availableSeats?.length || trip.bus?.capacite || 0} places disponibles</span>
                </div>
                <div className="flex items-center">
                  <Bus className="h-4 w-4 mr-1" />
                  <span>Bus {trip.bus?.immatriculation || "confortable"}</span>
                </div>
              </div>
            </div>

            {/* Prix et réservation */}
            <div className="text-right ml-6">
              <div className="mb-4">
                <p className="text-2xl font-bold text-gray-900">
                  {trip.price ? `${trip.price.toLocaleString()} FCFA` : "5 000 FCFA"}
                </p>
                <p className="text-sm text-gray-600">par personne</p>
              </div>
              <Link href={`/reservation/${trip.id}`}>
                <Button
                  className="w-full"
                  style={{
                    backgroundColor: trip.agence?.themeColorPrimary || "#22C55E",
                    borderColor: trip.agence?.themeColorPrimary || "#22C55E",
                  }}
                >
                  Réserver
                </Button>
              </Link>
              <p className="text-xs text-gray-500 mt-2">Paiement sécurisé</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
