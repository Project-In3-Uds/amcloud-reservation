"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "../../../../contexts/auth-context"
import type { Personnel } from "../../../../lib/types"
import { Plus, Users, Edit, Trash2, UserCheck, X, Save, User } from "lucide-react"

export default function PersonnelManagementPage() {
  const { agence } = useAuth()
  const [personnel, setPersonnel] = useState<Personnel[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPersonnel, setEditingPersonnel] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    poste: "",
    telephone: "",
    email: "",
    adresse: "",
    username: "",
    password: "",
    dateEmbauche: "",
    salaire: "",
  })

  useEffect(() => {
    loadPersonnel()
  }, [])

  const loadPersonnel = async () => {
    // Simuler le chargement du personnel
    const mockPersonnel: Personnel[] = [
      {
        id: 1,
        nom: "Jean Mballa",
        poste: "Chauffeur",
        idAgence: agence?.id || 1,
        userAccountId: 10,
        userAccount: {
          id: 10,
          iamId: 100,
          username: "jean.mballa",
          role: "PERSONNEL" as any,
        },
      },
      {
        id: 2,
        nom: "Marie Fouda",
        poste: "Contrôleuse",
        idAgence: agence?.id || 1,
        userAccountId: 11,
        userAccount: {
          id: 11,
          iamId: 101,
          username: "marie.fouda",
          role: "PERSONNEL" as any,
        },
      },
    ]
    setPersonnel(mockPersonnel)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddPersonnel = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nom || !formData.prenom || !formData.poste || !formData.username || !formData.password) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setLoading(true)

    try {
      // Simuler l'ajout avec délai
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newPerson: Personnel = {
        id: Date.now(),
        nom: `${formData.prenom} ${formData.nom}`,
        poste: formData.poste,
        idAgence: agence?.id || 1,
        userAccount: {
          id: Date.now(),
          iamId: Date.now(),
          username: formData.username,
          role: "PERSONNEL" as any,
        },
      }

      setPersonnel([...personnel, newPerson])
      resetForm()
      setShowAddForm(false)

      // Notification de succès
      alert(`✅ ${formData.prenom} ${formData.nom} ajouté(e) avec succès comme ${formData.poste} !`)
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error)
      alert("❌ Erreur lors de l'ajout du personnel")
    } finally {
      setLoading(false)
    }
  }

  const handleEditPersonnel = (person: Personnel) => {
    setEditingPersonnel(person.id)
    const [prenom, ...nomParts] = person.nom.split(" ")
    setFormData({
      nom: nomParts.join(" "),
      prenom: prenom,
      poste: person.poste || "",
      telephone: "",
      email: "",
      adresse: "",
      username: person.userAccount?.username || "",
      password: "",
      dateEmbauche: "",
      salaire: "",
    })
  }

  const handleUpdatePersonnel = async () => {
    if (editingPersonnel) {
      setLoading(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setPersonnel(
          personnel.map((person) =>
            person.id === editingPersonnel
              ? {
                  ...person,
                  nom: `${formData.prenom} ${formData.nom}`,
                  poste: formData.poste,
                  userAccount: {
                    ...person.userAccount!,
                    username: formData.username,
                  },
                }
              : person,
          ),
        )
        resetForm()
        setEditingPersonnel(null)
        alert("✅ Personnel mis à jour avec succès !")
      } catch (error) {
        alert("❌ Erreur lors de la mise à jour")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDeletePersonnel = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce membre du personnel ?")) {
      setPersonnel(personnel.filter((p) => p.id !== id))
      alert("🗑️ Personnel supprimé avec succès !")
    }
  }

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      poste: "",
      telephone: "",
      email: "",
      adresse: "",
      username: "",
      password: "",
      dateEmbauche: "",
      salaire: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestion du Personnel</h1>
                <p className="mt-2 text-gray-600">Gérez les employés de {agence?.nom}</p>
              </div>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={showAddForm || editingPersonnel !== null}
              >
                <Plus className="h-5 w-5 mr-2" />
                Ajouter du personnel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Personnel</p>
                <p className="text-2xl font-bold text-gray-900">{personnel.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Actifs</p>
                <p className="text-2xl font-bold text-gray-900">{personnel.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Chauffeurs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {personnel.filter((p) => p.poste?.toLowerCase().includes("chauffeur")).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout/modification */}
        {(showAddForm || editingPersonnel) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <User className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPersonnel ? "Modifier le personnel" : "Ajouter un nouveau membre du personnel"}
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingPersonnel(null)
                  resetForm()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form
              onSubmit={
                editingPersonnel
                  ? (e) => {
                      e.preventDefault()
                      handleUpdatePersonnel()
                    }
                  : handleAddPersonnel
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    placeholder="Ex: Jean"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Ex: Mballa"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poste <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="poste"
                    value={formData.poste}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Sélectionner un poste</option>
                    <option value="Chauffeur">Chauffeur</option>
                    <option value="Contrôleur">Contrôleur</option>
                    <option value="Mécanicien">Mécanicien</option>
                    <option value="Agent de gare">Agent de gare</option>
                    <option value="Superviseur">Superviseur</option>
                    <option value="Caissier">Caissier</option>
                    <option value="Agent de sécurité">Agent de sécurité</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <Input
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="Ex: +237 6 XX XX XX XX"
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ex: jean.mballa@email.com"
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date d'embauche</label>
                  <Input
                    name="dateEmbauche"
                    type="date"
                    value={formData.dateEmbauche}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom d'utilisateur <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Ex: jean.mballa"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe temporaire <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required={!editingPersonnel}
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salaire (FCFA)</label>
                  <Input
                    name="salaire"
                    type="number"
                    value={formData.salaire}
                    onChange={handleInputChange}
                    placeholder="Ex: 150000"
                    min="50000"
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <Input
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    placeholder="Ex: Quartier Mvog-Ada, Yaoundé"
                    className="focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingPersonnel(null)
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
                      {editingPersonnel ? "Mise à jour..." : "Ajout..."}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingPersonnel ? "Mettre à jour" : "Ajouter le personnel"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Liste du personnel */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Personnel de l'agence ({personnel.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Poste
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom d'utilisateur
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
                {personnel.map((person) => (
                  <tr key={person.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{person.nom}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.poste}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.userAccount?.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Actif
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditPersonnel(person)}
                          disabled={editingPersonnel !== null || showAddForm}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeletePersonnel(person.id)}
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
