"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { apiService } from "@/lib/api"
import type { Agence } from "@/lib/types"
import { useAuth } from "../../contexts/auth-context"

export default function TestAgenciesPage() {
  const { userAccount, isAuthenticated } = useAuth()
  const [agences, setAgences] = useState<Agence[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAgences = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await apiService.getAllAgences()
        setAgences(data)
      } catch (e: any) {
        setError("Erreur lors du chargement des agences")
      }
      setLoading(false)
    }
    fetchAgences()
  }, [])

  const handleCreateAgence = async (formData: Partial<Agence>) => {
    try {
      await apiService.createAgence(formData)
      // Recharge la liste après création
      const data = await apiService.getAllAgences()
      setAgences(data)
    } catch (e) {
      // Gère l’erreur
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Test d'Accès aux Agences</h1>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900">État d'authentification :</h3>
            <p className="text-blue-800">{isAuthenticated ? "✅ Connecté" : "❌ Non connecté"}</p>
            {userAccount && <p className="text-blue-800">Rôle : {userAccount.role}</p>}
          </div>

          {/* Liste des agences */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">Agences disponibles :</h2>
            {loading && <p className="text-gray-500">Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && agences.length === 0 && !error && (
              <p className="text-gray-500">Aucune agence disponible.</p>
            )}
            <ul className="space-y-3">
              {agences.map((agence) => (
                <li key={agence.id} className="border rounded p-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{agence.nom}</div>
                    <div className="text-sm text-gray-600">{agence.adresse}</div>
                  </div>
                  <Link href={`/agencies/${agence.id}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Détail</Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <Link href="/client/agencies">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Accéder aux agences (avec auth)</Button>
            </Link>
            <Link href="/agencies-public">
              <Button variant="outline" className="w-full bg-transparent">
                Accéder aux agences (sans auth)
              </Button>
            </Link>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>Si vous ne pouvez pas accéder aux agences :</p>
            <p>1. Vérifiez que vous êtes connecté</p>
            <p>2. Vérifiez votre rôle (CLIENT requis)</p>
            <p>3. Consultez la console pour les erreurs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
