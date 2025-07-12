"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, User, Phone, Mail, MapPin, Calendar, DollarSign, Edit, Trash2, CheckCircle } from "lucide-react"

interface Personnel {
  id: string
  prenom: string
  nom: string
  poste: string
  telephone: string
  email: string
  adresse: string
  username: string
  dateEmbauche: string
  salaire: number
  status: "actif" | "inactif"
}

const POSTES_DISPONIBLES = [
  "Chauffeur",
  "Contrôleur",
  "Mécanicien",
  "Agent de billetterie",
  "Superviseur",
  "Agent de sécurité",
  "Responsable maintenance",
]

export default function PersonnelPage() {
  const [personnel, setPersonnel] = useState<Personnel[]>([
    {
      id: "1",
      prenom: "Jean",
      nom: "Mballa",
      poste: "Chauffeur",
      telephone: "+237 690 123 456",
      email: "jean.mballa@email.com",
      adresse: "Yaoundé, Mvog-Ada",
      username: "jean_mballa",
      dateEmbauche: "2024-01-15",
      salaire: 150000,
      status: "actif",
    },
    {
      id: "2",
      prenom: "Marie",
      nom: "Nguema",
      poste: "Contrôleur",
      telephone: "+237 677 987 654",
      email: "marie.nguema@email.com",
      adresse: "Douala, Akwa",
      username: "marie_nguema",
      dateEmbauche: "2024-02-01",
      salaire: 120000,
      status: "actif",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    poste: "",
    telephone: "",
    email: "",
    adresse: "",
    username: "",
    password: "",
    dateEmbauche: "",
    salaire: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (personnel.some((p) => p.username === formData.username)) {
      setNotification({ type: "error", message: "Ce nom d'utilisateur existe déjà" })
      setLoading(false)
      return
    }

    if (personnel.some((p) => p.email === formData.email)) {
      setNotification({ type: "error", message: "Cette adresse email est déjà utilisée" })
      setLoading(false)
      return
    }

    // Simulation d'ajout avec délai
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const nouveauPersonnel: Personnel = {
      id: Date.now().toString(),
      prenom: formData.prenom,
      nom: formData.nom,
      poste: formData.poste,
      telephone: formData.telephone,
      email: formData.email,
      adresse: formData.adresse,
      username: formData.username,
      dateEmbauche: formData.dateEmbauche,
      salaire: Number.parseInt(formData.salaire),
      status: "actif",
    }

    setPersonnel([...personnel, nouveauPersonnel])
    setFormData({
      prenom: "",
      nom: "",
      poste: "",
      telephone: "",
      email: "",
      adresse: "",
      username: "",
      password: "",
      dateEmbauche: "",
      salaire: "",
    })
    setShowForm(false)
    setLoading(false)
    setNotification({ type: "success", message: "Personnel ajouté avec succès !" })

    // Masquer la notification après 3 secondes
    setTimeout(() => setNotification(null), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const supprimerPersonnel = (id: string) => {
    setPersonnel(personnel.filter((p) => p.id !== id))
    setNotification({ type: "success", message: "Personnel supprimé avec succès" })
    setTimeout(() => setNotification(null), 3000)
  }

  const toggleStatus = (id: string) => {
    setPersonnel(personnel.map((p) => (p.id === id ? { ...p, status: p.status === "actif" ? "inactif" : "actif" } : p)))
  }

  const getInitials = (prenom: string, nom: string) => {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase()
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
          <h1 className="text-3xl font-bold text-gray-900">Gestion du Personnel</h1>
          <p className="text-gray-600 mt-1">Gérez votre équipe et leurs accès</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter du Personnel
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Personnel</p>
                <p className="text-2xl font-bold">{personnel.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Personnel Actif</p>
                <p className="text-2xl font-bold">{personnel.filter((p) => p.status === "actif").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Chauffeurs</p>
                <p className="text-2xl font-bold">{personnel.filter((p) => p.poste === "Chauffeur").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Salaire Moyen</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    personnel.reduce((sum, p) => sum + p.salaire, 0) / personnel.length || 0,
                  ).toLocaleString()}
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
            <CardTitle className="text-blue-600">Nouveau Personnel</CardTitle>
            <CardDescription>Ajoutez un nouveau membre à votre équipe</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Informations personnelles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                  <Input
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Jean"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                  <Input name="nom" value={formData.nom} onChange={handleChange} required placeholder="Ex: Mballa" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poste *</label>
                  <select
                    name="poste"
                    value={formData.poste}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionner un poste</option>
                    {POSTES_DISPONIBLES.map((poste) => (
                      <option key={poste} value={poste}>
                        {poste}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                  <Input
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    placeholder="Ex: +237 690 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Ex: jean.mballa@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
                  <Input
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Yaoundé, Mvog-Ada"
                  />
                </div>

                {/* Informations de compte */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur *</label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Ex: jean_mballa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe temporaire *</label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d'embauche *</label>
                  <Input
                    type="date"
                    name="dateEmbauche"
                    value={formData.dateEmbauche}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salaire mensuel (FCFA) *</label>
                  <Input
                    type="number"
                    name="salaire"
                    value={formData.salaire}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 150000"
                    min="50000"
                  />
                </div>
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
                      Ajouter le Personnel
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

      {/* Liste du personnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {personnel.map((person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {getInitials(person.prenom, person.nom)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {person.prenom} {person.nom}
                      </CardTitle>
                      <CardDescription className="text-blue-600 font-medium">{person.poste}</CardDescription>
                    </div>
                    <Badge variant={person.status === "actif" ? "default" : "secondary"}>{person.status}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Contact */}
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{person.telephone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{person.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{person.adresse}</span>
                </div>

                {/* Informations professionnelles */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Embauché le {new Date(person.dateEmbauche).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm font-semibold text-green-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{person.salaire.toLocaleString()} FCFA</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => toggleStatus(person.id)} className="flex-1">
                    {person.status === "actif" ? "Désactiver" : "Activer"}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => supprimerPersonnel(person.id)}
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

      {personnel.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun personnel enregistré</h3>

            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun personnel enregistré</h3>
            <p className="text-gray-600 mb-4">Commencez par ajouter votre premier membre d'équipe</p>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter du Personnel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
