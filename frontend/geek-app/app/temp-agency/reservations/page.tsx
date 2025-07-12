"use client"

import { useTempAgency } from "../../../contexts/temp-agency-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react"

export default function TempReservationsPage() {
  const { selectedAgency } = useTempAgency()

  const reservations = [
    {
      id: 1,
      voyageur: "Jean Mballa",
      telephone: "+237 6 78 90 12 34",
      email: "jean.mballa@email.com",
      trajet: "Yaoundé → Douala",
      date: "2024-01-15",
      heure: "08:00",
      place: 15,
      montant: 5000,
      statut: "Confirmée",
      paiement: "Payé",
      methodePaiement: "MTN Money",
    },
    {
      id: 2,
      voyageur: "Marie Fouda",
      telephone: "+237 6 55 44 33 22",
      email: "marie.fouda@email.com",
      trajet: "Yaoundé → Douala",
      date: "2024-01-15",
      heure: "08:00",
      place: 16,
      montant: 5000,
      statut: "En attente",
      paiement: "En attente",
      methodePaiement: "Orange Money",
    },
    {
      id: 3,
      voyageur: "Paul Nkomo",
      telephone: "+237 6 99 88 77 66",
      trajet: "Douala → Bafoussam",
      date: "2024-01-16",
      heure: "10:00",
      place: 8,
      montant: 7500,
      statut: "Annulée",
      paiement: "Remboursé",
      methodePaiement: "MTN Money",
    },
  ]

  const getStatusBadge = (statut: string) => {
    const config = {
      "En attente": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      Confirmée: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
      Payée: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      Annulée: { color: "bg-red-100 text-red-800", icon: XCircle },
      Terminée: { color: "bg-gray-100 text-gray-800", icon: CheckCircle },
    }

    const statusConfig = config[statut as keyof typeof config] || config["En attente"]
    const Icon = statusConfig.icon

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {statut}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Réservations</h1>
            <p className="text-gray-600">Réservations de {selectedAgency?.nom}</p>
          </div>
          <Button variant="outline" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Réservations</p>
              <p className="text-2xl font-bold text-gray-900">{reservations.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">En attente</p>
              <p className="text-2xl font-bold text-gray-900">
                {reservations.filter((r) => r.statut === "En attente").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Confirmées</p>
              <p className="text-2xl font-bold text-gray-900">
                {reservations.filter((r) => r.statut === "Confirmée").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenus</p>
              <p className="text-2xl font-bold text-gray-900">
                {reservations
                  .filter((r) => r.paiement === "Payé")
                  .reduce((sum, r) => sum + r.montant, 0)
                  .toLocaleString()}{" "}
                FCFA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Rechercher..." className="pl-10" />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option>Tous les statuts</option>
            <option>En attente</option>
            <option>Confirmée</option>
            <option>Annulée</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option>Tous les paiements</option>
            <option>Payé</option>
            <option>En attente</option>
            <option>Remboursé</option>
          </select>
          <Input type="date" placeholder="Filtrer par date" />
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Réservations ({reservations.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Réservation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voyageur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trajet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{reservation.id}</div>
                      <div className="text-sm text-gray-500">Place {reservation.place}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reservation.voyageur}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {reservation.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {reservation.trajet}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {reservation.date} à {reservation.heure}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {getStatusBadge(reservation.statut)}
                      <div className="text-xs text-gray-500">{reservation.methodePaiement}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.montant.toLocaleString()} FCFA</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {reservation.statut === "En attente" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
