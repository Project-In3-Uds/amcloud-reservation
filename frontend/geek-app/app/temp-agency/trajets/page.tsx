"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Clock, Users, DollarSign, Edit, Trash2, CheckCircle } from "lucide-react"
import { CAMEROON_CITIES } from "../../../lib/cameroon-data"

interface Trajet {
  id: string
  villeDepart: string
  villeArrivee: string
  distance: number
  duree: string
  heureDepart: string
  heureArrivee: string
  prix: number
  placesDisponibles: number
  placesTotales: number
  description: string
  status: "actif" | "suspendu"
  dateCreation: string
}

export default function TrajetsPage() {
  const [trajets, setTrajets] = useState<Trajet[]>([
    {
      id: "1",
      villeDepart: "Yaoundé",
      villeArrivee: "Douala",
      distance: 250,
      duree: "3h 30min",
      heureDepart: "06:00",
      heureArrivee: "09:30",
      prix: 3500,
      placesDisponibles: 45,
      placesTotales: 50,
      description: "Trajet direct avec climatisation et WiFi",
      status: "actif",
      dateCreation: "2024-01-15",
    },
    {
      id: "2",
      villeDepart: "Douala",
      villeArrivee: "Bafoussam",
      distance: 280,
      duree: "4h 15min",
      heureDepart: "14:00",
      heureArrivee: "18:15",
      prix: 4200,
      placesDisponibles: 30,
      placesTotales: 45,
      description: "Route panoramique avec arrêts techniques",
      status: "actif",
      dateCreation: "2024-01-20",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [formData, setFormData] = useState({
    villeDepart: "",
    villeArrivee: "",
    distance: "",
    duree: "",
    heureDepart: "",
    heureArrivee: "",
    prix: "",
    placesTotales: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (formData.villeDepart === formData.villeArrivee) {
      setNotification({ type: "error", message: "Les villes de départ et d'arrivée doivent être différentes" })
      setLoading(false)
      return
    }

    // Simulation d'ajout avec délai
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const nouveauTrajet: Trajet = {
      id: Date.now().toString(),
      villeDepart: formData.villeDepart,
      villeArrivee: formData.villeArrivee,
      distance: Number.parseInt(formData.distance),
      duree: formData.duree,
      heureDepart: formData.heureDepart,
      heureArrivee: formData.heureArrivee,
      prix: Number.parseInt(formData.prix),
      placesDisponibles: Number.parseInt(formData.placesTotales),
      placesTotales: Number.parseInt(formData.placesTotales),
      description: formData.description,
      status: "actif",
      dateCreation: new Date().toISOString().split("T")[0],
    }

    setTrajets([...trajets, nouveauTrajet])
    setFormData({
      villeDepart: "",
      villeArrivee: "",
      distance: "",
      duree: "",
      heureDepart: "",
      heureArrivee: "",
      prix: "",
      placesTotales: "",
      description: "",
    })
    setShowForm(false)
    setLoading(false)
    setNotification({ type: "success", message: "Trajet ajouté avec succès !" })

    // Masquer la notification après 3 secondes
    setTimeout(() => setNotification(null), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const supprimerTrajet = (id: string) => {
    setTrajets(trajets.filter((t) => t.id !== id))
    setNotification({ type: "success", message: "Trajet supprimé avec succès" })
    setTimeout(() => setNotification(null), 3000)
  }

  const toggleStatus = (id: string) => {
    setTrajets(trajets.map((t) => (t.id === id ? { ...t, status: t.status === "actif" ? "suspendu" : "actif" } : t)))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
            notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {notification.type === "success" && <CheckCircle className="h-5 w-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Trajets</h1>
          <p className="text-gray-600 mt-1">Gérez vos itinéraires et horaires</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un Trajet
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Trajets</p>
                <p className="text-2xl font-bold">{trajets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Trajets Actifs</p>
                <p className="text-2xl font-bold">{trajets.filter((t) => t.status === "actif").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Places Totales</p>
                <p className="text-2xl font-bold">{trajets.reduce((sum, t) => sum + t.placesTotales, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Prix Moyen</p>
                <p className="text-2xl font-bold">
                  {Math.round(trajets.reduce((sum, t) => sum + t.prix, 0) / trajets.length || 0)} FCFA
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Nouveau Trajet</CardTitle>
            <CardDescription>Ajoutez un nouveau trajet à votre réseau</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ville de départ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville de départ *</label>
                  <select
                    name="villeDepart"
                    value={formData.villeDepart}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionner une ville</option>
                    {CAMEROON_CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} ({city.region})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ville d'arrivée */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville d'arrivée *</label>
                  <select
                    name="villeArrivee"
                    value={formData.villeArrivee}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionner une ville</option>
                    {CAMEROON_CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} ({city.region})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Distance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km) *</label>
                  <Input
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 250"
                    min="1"
                  />
                </div>

                {/* Durée */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée estimée *</label>
                  <Input
                    name="duree"
                    value={formData.duree}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 3h 30min"
                  />
                </div>

                {/* Heure de départ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure de départ *</label>
                  <Input type="time" name="heureDepart" value={formData.heureDepart} onChange={handleChange} required />
                </div>

                {/* Heure d'arrivée */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure d'arrivée *</label>
                  <Input
                    type="time"
                    name="heureArrivee"
                    value={formData.heureArrivee}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Prix */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA) *</label>
                  <Input
                    type="number"
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 3500"
                    min="100"
                  />
                </div>

                {/* Places totales */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de places *</label>
                  <Input
                    type="number"
                    name="placesTotales"
                    value={formData.placesTotales}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 50"
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Décrivez les services inclus, arrêts, etc..."
                />
              </div>

              {/* Boutons */}
              <div className="flex space-x-4">
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Ajout en cours...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter le Trajet
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} disabled={loading}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Liste des trajets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {trajets.map((trajet) => (
          <Card key={trajet.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>
                      {trajet.villeDepart} → {trajet.villeArrivee}
                    </span>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {trajet.distance} km • {trajet.duree}
                  </CardDescription>
                </div>
                <Badge variant={trajet.status === "actif" ? "default" : "secondary"}>{trajet.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Horaires */}
                <div className="flex items-center space-x-4">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    Départ: {trajet.heureDepart} • Arrivée: {trajet.heureArrivee}
                  </span>
                </div>

                {/* Prix et places */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-600">{trajet.prix.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">
                      {trajet.placesDisponibles}/{trajet.placesTotales} places
                    </span>
                  </div>
                </div>

                {/* Description */}
                {trajet.description && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{trajet.description}</p>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => toggleStatus(trajet.id)} className="flex-1">
                    {trajet.status === "actif" ? "Suspendre" : "Activer"}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => supprimerTrajet(trajet.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {trajets.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun trajet configuré</h3>
            <p className="text-gray-600 mb-4">Commencez par ajouter votre premier trajet</p>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un Trajet
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
