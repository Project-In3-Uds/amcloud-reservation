"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../../contexts/auth-context"
import type { Ticket, AgencyStats } from "../../../../lib/types"
import { ReservationStatus, PaymentStatus, PaymentMethod } from "../../../../lib/types"
import { CheckCircle, XCircle, Clock, CreditCard, AlertCircle, Bell } from "lucide-react"

export default function AgencyReservationsPage() {
  const { agence } = useAuth()
  const [reservations, setReservations] = useState<Ticket[]>([])
  const [filteredReservations, setFilteredReservations] = useState<Ticket[]>([])
  const [stats, setStats] = useState<AgencyStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "ALL">("ALL")
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "ALL">("ALL")
  const [dateFilter, setDateFilter] = useState("")
  const [newReservationAlert, setNewReservationAlert] = useState(false)

  useEffect(() => {
    loadReservations()
    loadStats()
    
    // Simuler les mises à jour en temps réel
    const interval = setInterval(() => {
      checkForNewReservations()
    }, 10000) // Vérifier toutes les 10 secondes

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filterReservations()
  }, [reservations, searchTerm, statusFilter, paymentFilter, dateFilter])

  const loadReservations = async () => {
    // Simuler le chargement des réservations avec plus de données
    const mockReservations: Ticket[] = [
      {
        id: 1,
        idTrip: 1,
        idSeat: 15,
        idUserAccount: 5,
        dateReservation: "2024-01-10T10:30:00",
        status: ReservationStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID,
        paymentMethod: PaymentMethod.MTN_MONEY,
        amount: 5000,
        travelerName: "Jean Mballa",
        travelerPhone: "+237 6 78 90 12 34",
        travelerEmail: "jean.mballa@email.com",
        trip: {
          id: 1,
          dateDepart: "2024-01-15T08:00:00",
          idTrajet: 1,
          idBus: 1,
          idAgence: agence?.id || 1,
          trajet: {
            id: 1,
            villeDepart: "Yaoundé",
            villeArrivee: "Douala",
            distance: 250,
            idAgence: agence?.id || 1,
            heureDepart: "08:00:00",
            heureArrivee: "12:00:00",
          },
          bus: {
            id: 1,
            immatriculation: "CE-1234-YA",
            capacite: 70,
            idTrajet: 1,
            idAgence: agence?.id || 1,
          },
        },
        seat: {
          id: 15,
          numero: 15,
          etat: "occupe",
          idBus: 1,
        },
      },
      {
        id: 2,
        idTrip: 1,
        idSeat: 16,
        idUserAccount: 6,
        dateReservation: "2024-01-10T14:15:00",
        status: ReservationStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: PaymentMethod.ORANGE_MONEY,
        amount: 5000,
        travelerName: "Marie Fouda",
        travelerPhone: "+237 6 55 44 33 22",
        travelerEmail: "marie.fouda@email.com",
        trip: {
          id: 1,
          dateDepart: "2024-01-15T08:00:00",
          idTrajet: 1,
          idBus: 1,
          idAgence: agence?.id || 1,
          trajet: {
            id: 1,
            villeDepart: "Yaoundé",
            villeArrivee: "Douala",
            distance: 250,
            idAgence: agence?.id || 1,
            heureDepart: "08:00:00",
            heureArrivee: "12:00:00",
          },
          bus: {
            id: 1,
            immatriculation: "CE-1234-YA",
            capacite: 70,
            idTrajet: 1,
            idAgence: agence?.id || 1,
          },
        },
        seat: {
          id: 16,
          numero: 16,
          etat: "reserve",
          idBus: 1,
        },
      },
      // Nouvelle réservation récente (simulée)
      {
        id: Date.now(),
        idTrip: 2,
        idSeat: 8,
        idUserAccount: 7,
        dateReservation: new Date().toISOString(),
        status: ReservationStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: PaymentMethod.MTN_MONEY,
        amount: 7500,
        travelerName: "Paul Nkomo",
        travelerPhone: "+237 6 99 88 77 66",
        travelerEmail: "paul.nkomo@email.com",
        trip: {
          id: 2,
          dateDepart: "2024-01-16T10:00:00",
          idTrajet: 2,
          idBus: 2,
          idAgence: agence?.id || 1,
          trajet: {
            id: 2,
            villeDepart: "Douala",
            villeArrivee: "Bafoussam",
            distance: 200,
            idAgence: agence?.id || 1,
            heureDepart: "10:00:00",
            heureArrivee: "13:30:00",
          },
          bus: {
            id: 2,
            immatriculation: "OU-5678-BF",
            capacite: 50,
            idTrajet: 2,
            idAgence: agence?.id || 1,
          },
        },
        seat: {
          id: 8,
          numero: 8,
          etat: "reserve",
          idBus: 2,
        },
      },
    ]
    setReservations(mockReservations)
    setLoading(false)
  }

  const checkForNewReservations = async () => {
    // Simuler la vérification de nouvelles réservations
    const hasNewReservation = Math.random() > 0.8 // 20% de chance
    
    if (hasNewReservation) {
      setNewReservationAlert(true)
      
      // Ajouter une nouvelle réservation simulée
      const newReservation: Ticket = {
        id: Date.now(),
        idTrip: 1,
        idSeat: Math.floor(Math.random() * 50) + 1,
        idUserAccount: Math.floor(Math.random() * 100) + 10,
        dateReservation: new Date().toISOString(),
        status: ReservationStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: PaymentMethod.MTN_MONEY,
        amount: 5000,
        travelerName: `Voyageur ${Math.floor(Math.random() * 1000)}`,
        travelerPhone: `+237 6 ${Math.floor(Math.random() * 90000000) + 10000000}`,
        trip: {
          id: 1,
          dateDepart: "2024-01-15T08:00:00",
          idTrajet: 1,
          idBus: 1,
          idAgence: agence?.id || 1,
          trajet: {
            id: 1,
            villeDepart: "Yaoundé",
            villeArrivee: "Douala",
            distance: 250,
            idAgence: agence?.id || 1,
            heureDepart: "08:00:00",
            heureArrivee: "12:00:00",
          },
          bus: {
            id: 1,
            immatriculation: "CE-1234-YA",
            capacite: 70,
            idTrajet: 1,
            idAgence: agence?.id || 1,
          },
        },
        seat: {
          id: Math.floor(Math.random() * 50) + 1,
          numero: Math.floor(Math.random() * 50) + 1,
          etat: "reserve",
          idBus: 1,
        },
      }

      setReservations(prev => [newReservation, ...prev])
      
      // Masquer l'alerte après 5 secondes
      setTimeout(() => {
        setNewReservationAlert(false)
      }, 5000)
    }
  }

  const loadStats = async () => {
    // Calculer les statistiques basées sur les réservations
    const mockStats: AgencyStats = {
      totalReservations: reservations.length,
      pendingReservations: reservations.filter(r => r.status === ReservationStatus.PENDING).length,
      confirmedReservations: reservations.filter(r => r.status === ReservationStatus.CONFIRMED).length,
      completedReservations: reservations.filter(r => r.status === ReservationStatus.COMPLETED).length,
      cancelledReservations: reservations.filter(r => r.status === ReservationStatus.CANCELLED).length,
      totalRevenue: reservations.filter(r => r.paymentStatus === PaymentStatus.PAID).reduce((sum, r) => sum + r.amount, 0),
      monthlyRevenue: reservations.filter(r => r.paymentStatus === PaymentStatus.PAID).reduce((sum, r) => sum + r.amount, 0),
    }
    setStats(mockStats)
  }

  const filterReservations = () => {
    let filtered = reservations

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (reservation) =>
          reservation.travelerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reservation.travelerPhone?.includes(searchTerm) ||
          reservation.id.toString().includes(searchTerm),
      )
    }

    // Filtrer par statut
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((reservation) => reservation.status === statusFilter)
    }

    // Filtrer par statut de paiement
    if (paymentFilter !== "ALL") {
      filtered = filtered.filter((reservation) => reservation.paymentStatus === paymentFilter)
    }

    // Filtrer par date
    if (dateFilter) {
      filtered = filtered.filter((reservation) => reservation.trip?.dateDepart?.startsWith(dateFilter))
    }

    // Trier par date de réservation (plus récent en premier)
    filtered.sort((a, b) => new Date(b.dateReservation).getTime() - new Date(a.dateReservation).getTime())

    setFilteredReservations(filtered)
  }

  const getStatusBadge = (status: ReservationStatus) => {
    const statusConfig = {
      [ReservationStatus.PENDING]: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "En attente" },
      [ReservationStatus.CONFIRMED]: { color: "bg-blue-100 text-blue-800", icon: CheckCircle, label: "Confirmée" },
      [ReservationStatus.PAID]: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Payée" },
      [ReservationStatus.CANCELLED]: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Annulée" },
      [ReservationStatus.COMPLETED]: { color: "bg-gray-100 text-gray-800", icon: CheckCircle, label: "Terminée" },
      [ReservationStatus.NO_SHOW]: { color: "bg-orange-100 text-orange-800", icon: AlertCircle, label: "Absent" },
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    )
  }

  const getPaymentBadge = (status: PaymentStatus) => {
    const statusConfig = {
      [PaymentStatus.PENDING]: { color: "bg-yellow-100 text-yellow-800", label: "En attente" },
      [PaymentStatus.PAID]: { color: "bg-green-100 text-green-800", label: "Payé" },
      [PaymentStatus.FAILED]: { color: "bg-red-100 text-red-800", label: "Échec" },
      [PaymentStatus.REFUNDED]: { color: "bg-gray-100 text-gray-800", label: "Remboursé" },
    }

    const config = statusConfig[status]

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.MTN_MONEY:
        return <span className="text-yellow-600 font-bold text-xs">MTN</span>
      case PaymentMethod.ORANGE_MONEY:
        return <span className="text-orange-600 font-bold text-xs">OM</span>
      case PaymentMethod.CASH:
        return <span className="text-green-600 font-bold text-xs">CASH</span>
      default:
        return <CreditCard className="h-4 w-4 text-gray-400" />
    }
  }

  const updateReservationStatus = async (reservationId: number, newStatus: ReservationStatus) => {
    // Ici vous ajouteriez l'appel API
    setReservations(reservations.map((r) => (r.id === reservationId ? { ...r, status: newStatus } : r)))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des réservations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alerte nouvelle réservation */}
      {newReservationAlert && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span className="font-medium">Nouvelle réservation reçue !</span>
          </div>
        </div>
      )}

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Réservations</h1>
                <p className\
