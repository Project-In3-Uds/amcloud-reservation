"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTempAgency } from "../../../contexts/temp-agency-context"
import { Settings, Palette, Bell, Shield, CreditCard, Users, Save, Upload, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const { selectedAgency, setSelectedAgency } = useTempAgency()
  const [activeTab, setActiveTab] = useState("general")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [settings, setSettings] = useState({
    // Général
    nom: selectedAgency?.nom || "",
    description: selectedAgency?.description || "",
    ville: selectedAgency?.ville || "",
    quartier: selectedAgency?.quartier || "",
    telephone: "+237 6 XX XX XX XX",
    email: "contact@agence.cm",
    adresse: "Quartier Central, Yaoundé",

    // Apparence
    themeColorPrimary: selectedAgency?.themeColorPrimary || "#2563eb",
    themeColorSecondary: selectedAgency?.themeColorSecondary || "#1e40af",
    logoUrl: selectedAgency?.logoUrl || "",

    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    reservationAlerts: true,
    paymentAlerts: true,
    marketingEmails: false,

    // Sécurité
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
    sessionTimeout: "30",

    // Paiements
    mtnMoney: true,
    orangeMoney: true,
    bankTransfer: false,
    cashPayment: true,
    autoConfirmPayment: false,

    // Personnel
    maxPersonnel: "50",
    personnelCanModifyReservations: true,
    personnelCanViewReports: false,
    personnelCanManageRoutes: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSave = async () => {
    setLoading(true)

    try {
      // Simuler la sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mettre à jour l'agence sélectionnée
      if (selectedAgency) {
        setSelectedAgency({
          ...selectedAgency,
          nom: settings.nom,
          description: settings.description,
          ville: settings.ville,
          quartier: settings.quartier,
          themeColorPrimary: settings.themeColorPrimary,
          themeColorSecondary: settings.themeColorSecondary,
          logoUrl: settings.logoUrl,
        })
      }

      alert("✅ Paramètres sauvegardés avec succès !")
    } catch (error) {
      alert("❌ Erreur lors de la sauvegarde")
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: "general", label: "Général", icon: Settings },
    { id: "appearance", label: "Apparence", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "payments", label: "Paiements", icon: CreditCard },
    { id: "personnel", label: "Personnel", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-600">Configurez votre agence {selectedAgency?.nom}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation des onglets */}
          <div className="lg:w-1/4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Onglet Général */}
              {activeTab === "general" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Informations générales</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'agence</label>
                      <Input
                        name="nom"
                        value={settings.nom}
                        onChange={handleInputChange}
                        placeholder="Ex: Express Voyage"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                      <Input
                        name="ville"
                        value={settings.ville}
                        onChange={handleInputChange}
                        placeholder="Ex: Yaoundé"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quartier</label>
                      <Input
                        name="quartier"
                        value={settings.quartier}
                        onChange={handleInputChange}
                        placeholder="Ex: Mvog-Ada"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <Input
                        name="telephone"
                        value={settings.telephone}
                        onChange={handleInputChange}
                        placeholder="+237 6 XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        placeholder="contact@agence.cm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse complète</label>
                      <Input
                        name="adresse"
                        value={settings.adresse}
                        onChange={handleInputChange}
                        placeholder="Adresse complète"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={settings.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description de votre agence..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Apparence */}
              {activeTab === "appearance" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Personnalisation</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Logo de l'agence</label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          {settings.logoUrl ? (
                            <img
                              src={settings.logoUrl || "/placeholder.svg"}
                              alt="Logo"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <Upload className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Télécharger un logo
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Couleur principale</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            name="themeColorPrimary"
                            value={settings.themeColorPrimary}
                            onChange={handleInputChange}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <Input
                            value={settings.themeColorPrimary}
                            onChange={handleInputChange}
                            name="themeColorPrimary"
                            placeholder="#2563eb"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Couleur secondaire</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            name="themeColorSecondary"
                            value={settings.themeColorSecondary}
                            onChange={handleInputChange}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <Input
                            value={settings.themeColorSecondary}
                            onChange={handleInputChange}
                            name="themeColorSecondary"
                            placeholder="#1e40af"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Aperçu</h3>
                      <div
                        className="p-4 rounded-lg text-white"
                        style={{ backgroundColor: settings.themeColorPrimary }}
                      >
                        <h4 className="font-bold">{settings.nom || "Nom de l'agence"}</h4>
                        <p className="opacity-90">Exemple de contenu avec votre thème</p>
                        <button
                          className="mt-2 px-4 py-2 rounded"
                          style={{ backgroundColor: settings.themeColorSecondary }}
                        >
                          Bouton exemple
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Notifications */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Préférences de notification</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Notifications générales</h3>
                      {[
                        { key: "emailNotifications", label: "Notifications par email" },
                        { key: "smsNotifications", label: "Notifications par SMS" },
                        { key: "reservationAlerts", label: "Alertes de réservation" },
                        { key: "paymentAlerts", label: "Alertes de paiement" },
                        { key: "marketingEmails", label: "Emails marketing" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <label className="text-sm text-gray-700">{item.label}</label>
                          <input
                            type="checkbox"
                            name={item.key}
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Sécurité */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Sécurité du compte</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Changer le mot de passe</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              name="currentPassword"
                              value={settings.currentPassword}
                              onChange={handleInputChange}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                          <Input
                            type="password"
                            name="newPassword"
                            value={settings.newPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmer le nouveau mot de passe
                          </label>
                          <Input
                            type="password"
                            name="confirmPassword"
                            value={settings.confirmPassword}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Authentification à deux facteurs</label>
                          <p className="text-xs text-gray-500">Sécurité renforcée pour votre compte</p>
                        </div>
                        <input
                          type="checkbox"
                          name="twoFactorAuth"
                          checked={settings.twoFactorAuth}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeout de session (minutes)
                        </label>
                        <select
                          name="sessionTimeout"
                          value={settings.sessionTimeout}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 heure</option>
                          <option value="120">2 heures</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Paiements */}
              {activeTab === "payments" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Méthodes de paiement</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Méthodes acceptées</h3>
                      <div className="space-y-4">
                        {[
                          { key: "mtnMoney", label: "MTN Mobile Money", desc: "Paiements via MTN MoMo" },
                          { key: "orangeMoney", label: "Orange Money", desc: "Paiements via Orange Money" },
                          { key: "bankTransfer", label: "Virement bancaire", desc: "Virements bancaires directs" },
                          { key: "cashPayment", label: "Paiement en espèces", desc: "Paiement à la gare" },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                          >
                            <div>
                              <label className="text-sm font-medium text-gray-700">{item.label}</label>
                              <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                            <input
                              type="checkbox"
                              name={item.key}
                              checked={settings[item.key as keyof typeof settings] as boolean}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Confirmation automatique des paiements
                        </label>
                        <p className="text-xs text-gray-500">Confirmer automatiquement les paiements Mobile Money</p>
                      </div>
                      <input
                        type="checkbox"
                        name="autoConfirmPayment"
                        checked={settings.autoConfirmPayment}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Personnel */}
              {activeTab === "personnel" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Gestion du personnel</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre maximum de personnel
                      </label>
                      <select
                        name="maxPersonnel"
                        value={settings.maxPersonnel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="10">10 employés</option>
                        <option value="25">25 employés</option>
                        <option value="50">50 employés</option>
                        <option value="100">100 employés</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Permissions du personnel</h3>
                      {[
                        {
                          key: "personnelCanModifyReservations",
                          label: "Modifier les réservations",
                          desc: "Le personnel peut modifier les réservations clients",
                        },
                        {
                          key: "personnelCanViewReports",
                          label: "Voir les rapports",
                          desc: "Accès aux rapports et statistiques",
                        },
                        {
                          key: "personnelCanManageRoutes",
                          label: "Gérer les trajets",
                          desc: "Créer et modifier les trajets",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div>
                            <label className="text-sm font-medium text-gray-700">{item.label}</label>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                          <input
                            type="checkbox"
                            name={item.key}
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bouton de sauvegarde */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder les paramètres
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
