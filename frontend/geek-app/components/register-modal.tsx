"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "../contexts/auth-context"
import { UserRole } from "../lib/types"
import { CAMEROON_CITIES } from "../lib/cameroon-data"
import { AgencyVerificationService } from "../lib/agency-verification"
import { X, Building, User, Shield, CheckCircle, AlertCircle, Copy } from "lucide-react"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: UserRole.CLIENT,
    // Pour les agences
    agenceName: "",
    agenceCode: "",
    agenceDescription: "",
    ville: "",
    region: "",
    quartier: "",
    themeColorPrimary: "#2563eb", // Bleu par défaut
    themeColorSecondary: "#1e40af", // Bleu foncé par défaut
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [codeVerification, setCodeVerification] = useState<{
    status: "idle" | "checking" | "valid" | "invalid"
    message: string
  }>({ status: "idle", message: "" })
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    // Validations spécifiques par rôle
    if (formData.role === UserRole.AGENCY) {
      if (!formData.agenceName.trim()) {
        setError("Le nom de l'agence est requis")
        setLoading(false)
        return
      }
      if (!formData.ville) {
        setError("Veuillez sélectionner une ville")
        setLoading(false)
        return
      }
      if (!formData.agenceCode.trim()) {
        setError("Le code d'agrément est requis pour les agences")
        setLoading(false)
        return
      }
      // VERSION DEMO : Vérification plus permissive
      if (
        codeVerification.status !== "valid" &&
        !formData.agenceCode.startsWith("DEMO-") &&
        !formData.agenceCode.startsWith("TEST-")
      ) {
        setError("Veuillez vérifier votre code d'agrément ou utilisez un code de test")
        setLoading(false)
        return
      }
    }

    try {
      await register({
        username: formData.username,
        password: formData.password,
        role: formData.role,
        agenceName: formData.agenceName || undefined,
        agenceCode: formData.agenceCode || undefined,
        agenceDescription: formData.agenceDescription || undefined,
        ville: formData.ville || undefined,
        quartier: formData.quartier || undefined,
        themeColorPrimary: formData.themeColorPrimary,
        themeColorSecondary: formData.themeColorSecondary,
      })

      // Marquer le code comme utilisé
      if (formData.role === UserRole.AGENCY && formData.agenceCode) {
        await AgencyVerificationService.markCodeAsUsed(formData.agenceCode)
      }

      onClose()
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    // Réinitialiser la vérification du code si le code change
    if (e.target.name === "agenceCode") {
      setCodeVerification({ status: "idle", message: "" })
    }
  }

  const verifyAgencyCode = async () => {
    if (!formData.agenceCode.trim()) {
      setCodeVerification({ status: "invalid", message: "Veuillez saisir un code d'agrément" })
      return
    }

    setCodeVerification({ status: "checking", message: "Vérification en cours..." })

    try {
      const result = await AgencyVerificationService.verifyAgencyCode(formData.agenceCode)

      if (result.isValid) {
        setCodeVerification({ status: "valid", message: result.message })
        // Pré-remplir le nom de l'agence si disponible
        if (result.agencyInfo?.agencyName && !formData.agenceName) {
          setFormData((prev) => ({ ...prev, agenceName: result.agencyInfo.agencyName }))
        }
      } else {
        setCodeVerification({ status: "invalid", message: result.message })
      }
    } catch (error) {
      setCodeVerification({ status: "invalid", message: "Erreur lors de la vérification" })
    }
  }

  const copyTestCode = (code: string) => {
    setFormData({ ...formData, agenceCode: code })
    navigator.clipboard.writeText(code)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Inscription</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sélection du type de compte - SEULEMENT CLIENT ET AGENCE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de compte</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: UserRole.CLIENT })}
                className={`p-3 border rounded-lg flex flex-col items-center space-y-2 ${
                  formData.role === UserRole.CLIENT
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <User className="h-6 w-6" />
                <span className="text-sm font-medium">Voyageur</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: UserRole.AGENCY })}
                className={`p-3 border rounded-lg flex flex-col items-center space-y-2 ${
                  formData.role === UserRole.AGENCY
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Building className="h-6 w-6" />
                <span className="text-sm font-medium">Agence de Transport</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Note: Le personnel d'agence est ajouté par le chef d'agence</p>
          </div>

          {/* Champs communs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="votre_username"
            />
          </div>

          {/* Champs spécifiques aux agences */}
          {formData.role === UserRole.AGENCY && (
            <>
              {/* Code d'agrément - VERSION DEMO SIMPLIFIÉE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code d'agrément transport *
                  <Shield className="inline h-4 w-4 ml-1 text-blue-500" />
                </label>
                <div className="flex space-x-2">
                  <Input
                    name="agenceCode"
                    value={formData.agenceCode}
                    onChange={handleChange}
                    required
                    placeholder="Ex: DEMO-001, TEST-123"
                    className="font-mono flex-1"
                  />
                  <Button
                    type="button"
                    onClick={verifyAgencyCode}
                    disabled={codeVerification.status === "checking"}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {codeVerification.status === "checking" ? "..." : "Vérifier"}
                  </Button>
                </div>

                {/* Codes de test rapides - VERSION DEMO */}
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Codes de test disponibles :</p>
                  <div className="flex flex-wrap gap-1">
                    {AgencyVerificationService.getTestCodes().map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => copyTestCode(code)}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 flex items-center space-x-1"
                      >
                        <span>{code}</span>
                        <Copy className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Statut de vérification */}
                {codeVerification.status !== "idle" && (
                  <div
                    className={`mt-2 p-2 rounded-md flex items-center space-x-2 text-sm ${
                      codeVerification.status === "valid"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : codeVerification.status === "invalid"
                          ? "bg-red-50 text-red-800 border border-red-200"
                          : "bg-yellow-50 text-yellow-800 border border-yellow-200"
                    }`}
                  >
                    {codeVerification.status === "valid" && <CheckCircle className="h-4 w-4" />}
                    {codeVerification.status === "invalid" && <AlertCircle className="h-4 w-4" />}
                    {codeVerification.status === "checking" && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    )}
                    <span>{codeVerification.message}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'agence</label>
                <Input
                  name="agenceName"
                  value={formData.agenceName}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Transport Express Cameroun"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <select
                    name="ville"
                    value={formData.ville}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
                  <Input name="quartier" value={formData.quartier} onChange={handleChange} placeholder="Ex: Mvog-Ada" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="agenceDescription"
                  value={formData.agenceDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Décrivez votre agence de transport au Cameroun..."
                />
              </div>

              {/* Couleurs de l'agence - Bleu par défaut */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Couleur principale</label>
                  <input
                    type="color"
                    name="themeColorPrimary"
                    value={formData.themeColorPrimary}
                    onChange={handleChange}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Couleur secondaire</label>
                  <input
                    type="color"
                    name="themeColorSecondary"
                    value={formData.themeColorSecondary}
                    onChange={handleChange}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{" "}
            <button onClick={onSwitchToLogin} className="text-blue-600 hover:text-blue-700 font-medium">
              Se connecter
            </button>
          </p>
        </div>

        {/* Information pour les agences - VERSION DEMO */}
        {formData.role === UserRole.AGENCY && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Mode Démo</p>
                <p className="text-xs mt-1">
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
