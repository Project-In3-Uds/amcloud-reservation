"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  MapPin,
  Clock,
  Star,
  Users,
  Phone,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowLeft,
  Bus,
  Calendar,
} from "lucide-react"


// Données des routes (normalement viendraient de l'API)
const routesData = {
  1: {
    id: 1,
    from: "Yaoundé",
    to: "Douala",
    price: 5000,
    duration: "4h00",
    distance: "250 km",
    date: "2024-01-15",
    time: "08:00",
    agence: {
      id: 1,
      nom: "Touristique Express",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviews: 1250,
      phone: "+237 6 78 90 12 34",
      email: "contact@touristique-express.cm",
      themeColor: "#22C55E",
      services: ["WiFi gratuit", "Climatisation", "Sièges confortables", "Arrêts sécurisés"],
    },
    availableSeats: 25,
    totalSeats: 50,
  },
  2: {
    id: 2,
    from: "Douala",
    to: "Bafoussam",
    price: 7500,
    duration: "3h30",
    distance: "200 km",
    date: "2024-01-16",
    time: "10:00",
    agence: {
      id: 2,
      nom: "Garantie Express",
      logo: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      reviews: 890,
      phone: "+237 6 55 44 33 22",
      email: "info@garantie-express.cm",
      themeColor: "#3B82F6",
      services: ["Assurance voyage", "Bagages sécurisés", "Personnel qualifié", "Ponctualité garantie"],
    },
    availableSeats: 18,
    totalSeats: 45,
  },
}

export default function ReservationPage() {
  const params = useParams()
  const router = useRouter()
  const routeId = Number.parseInt(params.routeId as string)
  const route = routesData[routeId as keyof typeof routesData]

  const [step, setStep] = useState(1) // 1: Détails, 2: Formulaire, 3: Confirmation
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    email: "",
    nombrePassagers: 1,
    methodePaiement: "MTN_MONEY",
    commentaires: "",
  })

  if (!route) {
    return (
      
      <div className="min-h-screen bg-gray-50">
        <DashboardLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Route non trouvée</h1>
          <Button onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
        </DashboardLayout>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleReservation = async () => {
    setLoading(true)

    try {
      // Simuler l'appel API pour créer la réservation
      const reservationData = {
        routeId: route.id,
        agenceId: route.agence.id,
        voyageur: formData,
        trajet: {
          from: route.from,
          to: route.to,
          date: route.date,
          time: route.time,
        },
        montant: route.price * formData.nombrePassagers,
        dateReservation: new Date().toISOString(),
      }

      // Appel API (simulé)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Envoyer notification SMS/Email
      await sendNotification(reservationData)

      // Mettre à jour les réservations de l'agence
      await updateAgencyReservations(reservationData)

      setStep(3)
    } catch (error) {
      console.error("Erreur lors de la réservation:", error)
      alert("Erreur lors de la réservation. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  const sendNotification = async (reservationData: any) => {
    // Simuler l'envoi de SMS via service email
    const smsContent = `
🎫 GEEKTRAVELLER - Réservation confirmée !

Bonjour ${reservationData.voyageur.nom},

Votre réservation est confirmée :
📍 ${reservationData.trajet.from} → ${reservationData.trajet.to}
📅 ${new Date(reservationData.trajet.date).toLocaleDateString("fr-FR")} à ${reservationData.trajet.time}
🚌 ${route.agence.nom}
💰 ${reservationData.montant.toLocaleString()} FCFA

Présentez-vous 30min avant le départ.
Support: +237 6 00 00 00 00

Bon voyage ! 🇨🇲
    `

    console.log("SMS envoyé:", smsContent)

    // En production, ici vous appelleriez votre service d'envoi de SMS/Email
    // await fetch('/api/send-sms', { method: 'POST', body: JSON.stringify({ phone: reservationData.voyageur.telephone, message: smsContent }) })
  }

  const updateAgencyReservations = async (reservationData: any) => {
    // Simuler la mise à jour des réservations de l'agence
    console.log("Nouvelle réservation ajoutée pour l'agence:", reservationData.agenceId)

    // En production, ici vous mettriez à jour la base de données
    // et notifieriez l'agence via WebSocket ou Server-Sent Events
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <button onClick={() => router.back()} className="hover:text-gray-900">
              Accueil
            </button>
            <span>/</span>
            <span className="text-gray-900">Réservation</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Détails du voyage */}
            <div className="lg:col-span-2 space-y-6">
              {/* En-tête du voyage */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {route.from} → {route.to}
                  </h1>
                  <span className="text-2xl font-bold text-green-600">{route.price.toLocaleString()} FCFA</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(route.date).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>
                      {route.time} ({route.duration})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{route.availableSeats} places libres</span>
                  </div>
                </div>
              </div>

              {/* Informations de l'agence */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Agence de transport</h2>

                <div className="flex items-start space-x-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: route.agence.themeColor }}
                  >
                    {route.agence.nom.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{route.agence.nom}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>
                          {route.agence.rating} ({route.agence.reviews} avis)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{route.agence.phone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {route.agence.services.map((service, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditions de voyage */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Conditions de voyage</h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Présentez-vous 30 minutes avant le départ</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Pièce d'identité obligatoire</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Bagages limités à 20kg par personne</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Annulation gratuite jusqu'à 2h avant le départ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar de réservation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Réserver ce voyage</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prix par personne</span>
                    <span className="font-semibold">{route.price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Places disponibles</span>
                    <span className="font-semibold text-green-600">{route.availableSeats}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full mb-4"
                  style={{ backgroundColor: route.agence.themeColor }}
                >
                  Continuer la réservation
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Paiement sécurisé • Confirmation immédiate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <button onClick={() => setStep(1)} className="hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Retour
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Informations voyageur</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleReservation()
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <Input
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Ex: Jean Mballa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <Input
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="+237 6 XX XX XX XX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de passagers</label>
                  <select
                    name="nombrePassagers"
                    value={formData.nombrePassagers}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} passager{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label>
                  <select
                    name="methodePaiement"
                    value={formData.methodePaiement}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="MTN_MONEY">MTN Mobile Money</option>
                    <option value="ORANGE_MONEY">Orange Money</option>
                    <option value="CASH">Espèces au guichet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commentaires (optionnel)</label>
                <textarea
                  name="commentaires"
                  value={formData.commentaires}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Demandes spéciales, allergies, etc."
                />
              </div>

              {/* Récapitulatif */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Récapitulatif</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Trajet:</span>
                    <span>
                      {route.from} → {route.to}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>
                      {new Date(route.date).toLocaleDateString("fr-FR")} à {route.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passagers:</span>
                    <span>{formData.nombrePassagers}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{(route.price * formData.nombrePassagers).toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                style={{ backgroundColor: route.agence.themeColor }}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Confirmation en cours...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Confirmer la réservation
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Confirmation
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Réservation confirmée !</h1>
          <p className="text-gray-600 mb-6">
            Votre réservation a été enregistrée avec succès. Un SMS de confirmation a été envoyé au {formData.telephone}
            .
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Détails de votre réservation</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Voyageur:</span>
                <span className="font-medium">{formData.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trajet:</span>
                <span className="font-medium">
                  {route.from} → {route.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Heure:</span>
                <span className="font-medium">
                  {new Date(route.date).toLocaleDateString("fr-FR")} à {route.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Agence:</span>
                <span className="font-medium">{route.agence.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passagers:</span>
                <span className="font-medium">{formData.nombrePassagers}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-600">Total payé:</span>
                <span className="font-bold text-lg">
                  {(route.price * formData.nombrePassagers).toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <Bus className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-left text-sm text-blue-800">
                <p className="font-medium">Instructions importantes :</p>
                <ul className="mt-2 space-y-1">
                  <li>• Présentez-vous 30 minutes avant le départ</li>
                  <li>• Munissez-vous d'une pièce d'identité</li>
                  <li>• Contactez {route.agence.phone} en cas de problème</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => router.push("/")} variant="outline" className="flex-1 bg-transparent">
              Retour à l'accueil
            </Button>
            <Button
              onClick={() => router.push("/client/reservations")}
              className="flex-1"
              style={{ backgroundColor: route.agence.themeColor }}
            >
              Mes réservations
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
