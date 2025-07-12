"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../../../../contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Plus, Edit, Trash2, Route, Save, X, Bus } from "lucide-react"
import { CAMEROON_CITIES } from "../../../../lib/cameroon-data"

interface Trajet {
  id: number
  villeDepart: string
  villeArrivee: string
  distance: number
  duree: string
  heureDepart: string
  heureArrivee: string
  prix: number
  statut: "Actif" | "Suspendu"
  description?: string
}

export default function AgencyTrajetsPage() {
  const { agence } = useAuth()
  const [trajets, setTrajets] = useState<Trajet[]>([
    {
      id: 1,
      villeDepart: "Yaoundé",
      villeArrivee: "Douala",
      distance: 250,
      duree: "4h00",
      heureDepart: "08:00",
      heureArrivee: "12:00",
      prix: 5000,
      statut: "Actif",
      description: "Route principale, autoroute moderne",
    },
    {
      id: 2,
      villeDepart: "Douala",
      villeArrivee: "Bafoussam",
      distance: 200,
      duree: "3h30",
      heureDepart: "10:00",
      heureArrivee: "13:30",
      prix: 7500,
      statut: "Actif",
      description: "Route montagneuse, paysages magnifiques",
    },
    {
      id: 3,
      villeDepart: "Yaoundé",
      villeArrivee: "Bamenda",
      distance: 350,
      duree: "5h00",
      heureDepart: "16:00",
      heureArrivee: "21:00",
      prix: 8000,
      statut: "Suspendu",
      description: "Route vers la région anglophone",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTrajet, setEditingTrajet] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    villeDepart: "",
    villeArrivee: "",
    distance: "",
    duree: "",
    heureDepart: "",
    heureArrivee: "",
    prix: "",
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddTrajet = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.villeDepart || !formData.villeArrivee || !formData.prix) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setLoading(true)

    try {
      // Simuler l'ajout avec délai
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newTrajet: Trajet = {
        id: Date.now(),
        villeDepart: formData.villeDepart,
        villeArrivee: formData.villeArrivee,
        distance: Number.parseInt(formData.distance) || 0,
        duree: formData.duree,
        heureDepart: formData.heureDepart,
        heureArrivee: formData.heureArrivee,
        prix: Number.parseInt(formData.prix),
        statut: "Actif",
        description: formData.description,
      }

      setTrajets([...trajets, newTrajet])
      resetForm()
      setShowAddForm(false)

      // Notification de succès
      alert(`✅ Trajet ${newTrajet.villeDepart} → ${newTrajet.villeArrivee} ajouté avec succès !`)
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error)
      alert("❌ Erreur lors de l'ajout du trajet")
    } finally {
      setLoading(false)
    }
  }

  const handleEditTrajet = (trajet: Trajet) => {
    setEditingTrajet(trajet.id)
    setFormData({
      villeDepart: trajet.villeDepart,
      villeArrivee: trajet.villeArrivee,
      distance: trajet.distance.toString(),
      duree: trajet.duree,
      heureDepart: trajet.heureDepart,
      heureArrivee: trajet.heureArrivee,
      prix: trajet.prix.toString(),
      description: trajet.description || "",
    })
  }

  const handleUpdateTrajet = async () => {
    if (editingTrajet) {
      setLoading(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setTrajets(
          trajets.map((trajet) =>
            trajet.id === editingTrajet
              ? {
                  ...trajet,
                  villeDepart: formData.villeDepart,
                  villeArrivee: formData.villeArrivee,
                  distance: Number.parseInt(formData.distance) || 0,
                  duree: formData.duree,
                  heureDepart: formData.heureDepart,
                  heureArrivee: formData.heureArrivee,
                  prix: Number.parseInt(formData.prix),
                  description: formData.description,
                }
              : trajet,
          ),
        )
        resetForm()
        setEditingTrajet(null)
        alert("✅ Trajet mis à jour avec succès !")
      } catch (error) {
        alert("❌ Erreur lors de la mise à jour")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDeleteTrajet = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce trajet ?")) {
      setTrajets(trajets.filter((trajet) => trajet.id !== id))
      alert("🗑️ Trajet supprimé avec succès !")
    }
  }

  const toggleStatut = (id: number) => {
    setTrajets(
      trajets.map((trajet) =>
        trajet.id === id ? { ...trajet, statut: trajet.statut === "Actif" ? "Suspendu" : "Actif" } : trajet,
      ),
    )
  }

  const resetForm = () => {
    setFormData({
      villeDepart: "",
      villeArrivee: "",
      distance: "",
      duree: "",
      heureDepart: "",
      heureArrivee: "",
      prix: "",
      description: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Trajets</h1>
                <p className="text-gray-600">Routes configurées pour {agence?.nom}</p>
              </div>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={showAddForm || editingTrajet !== null}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau trajet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Route className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Trajets</p>
                <p className="text-2xl font-bold text-gray-900">{trajets.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Trajets Actifs</p>
                <p className="text-2xl font-bold text-gray-900">{trajets.filter((t) => t.statut === "Actif").length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Distance Totale</p>
                <p className="text-2xl font-bold text-gray-900">{trajets.reduce((sum, t) => sum + t.distance, 0)} km</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Route className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Prix Moyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {trajets.length > 0 ? Math.round(trajets.reduce((sum, t) => sum + t.prix, 0) / trajets.length) : 0}{" "}
                  FCFA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout/modification */}
        {(showAddForm || editingTrajet) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Bus className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">
                  {editingTrajet ? "Modifier le trajet" : "Ajouter un nouveau trajet"}
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingTrajet(null)
                  resetForm()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form
              onSubmit={
                editingTrajet
                  ? (e) => {
                      e.preventDefault()
                      handleUpdateTrajet()
                    }
                  : handleAddTrajet
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville de départ <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="villeDepart"
                    value={formData.villeDepart}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Sélectionner une ville</option>
                    {CAMEROON_CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} ({city.region})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville d'arrivée <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="villeArrivee"
                    value={formData.villeArrivee}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Sélectionner une ville</option>
                    {CAMEROON_CITIES.filter((city) => city.name !== formData.villeDepart).map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} ({city.region})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance (km)</label>
                  <Input
                    name="distance"
                    type="number"
                    value={formData.distance}
                    onChange={handleInputChange}
                    placeholder="Ex: 250"
                    min="1"
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée estimée</label>
                  <Input
                    name="duree"
                    value={formData.duree}
                    onChange={handleInputChange}
                    placeholder="Ex: 4h00"
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure de départ</label>
                  <Input
                    name="heureDepart"
                    type="time"
                    value={formData.heureDepart}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure d'arrivée</label>
                  <Input
                    name="heureArrivee"
                    type="time"
                    value={formData.heureArrivee}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix (FCFA) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="prix"
                    type="number"
                    value={formData.prix}
                    onChange={handleInputChange}
                    placeholder="Ex: 5000"
                    min="500"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description du trajet, points d'intérêt, conditions particulières..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingTrajet(null)
                    resetForm()
                  }}
                  disabled={loading}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingTrajet ? "Mise à jour..." : "Ajout..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingTrajet ? "Mettre à jour" : "Ajouter le trajet"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Liste des trajets */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Trajets configurés ({trajets.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance & Durée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horaires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trajets.map((trajet) => (
                  <tr key={trajet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {trajet.villeDepart} → {trajet.villeArrivee}
                        </div>
                        {trajet.description && <div className="text-sm text-gray-500 mt-1">{trajet.description}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{trajet.distance} km</div>
                      <div className="text-sm text-gray-500">{trajet.duree}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{trajet.heureDepart}</div>
                      <div className="text-sm text-gray-500">→ {trajet.heureArrivee}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-blue-600">{trajet.prix.toLocaleString()} FCFA</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatut(trajet.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          trajet.statut === "Actif"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {trajet.statut}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditTrajet(trajet)}
                          disabled={editingTrajet !== null || showAddForm}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTrajet(trajet.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
