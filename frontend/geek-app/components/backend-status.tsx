"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { apiService } from "../lib/api"
import { API_CONFIG } from "../lib/config"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { AgencyVerificationService } from "@/lib/agency-verification"


export function BackendStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  const checkBackendStatus = async () => {
    setStatus("checking")
    try {
      const isHealthy = await apiService.healthCheck()
      setStatus(isHealthy ? "online" : "offline")
      setLastCheck(new Date())
    } catch (error) {
      setStatus("offline")
      setLastCheck(new Date())
    }
  }

  useEffect(() => {
    checkBackendStatus()
    // Vérifier toutes les 30 secondes
    const interval = setInterval(checkBackendStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">État du Backend</h3>
        <Button onClick={checkBackendStatus} size="sm" variant="outline">
          Vérifier
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          {status === "checking" && <AlertCircle className="h-5 w-5 text-yellow-500 animate-spin" />}
          {status === "online" && <CheckCircle className="h-5 w-5 text-green-500" />}
          {status === "offline" && <XCircle className="h-5 w-5 text-red-500" />}
          <span className="font-medium">
            {status === "checking" && "Vérification..."}
            {status === "online" && "Backend en ligne"}
            {status === "offline" && "Backend hors ligne"}
          </span>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>URL:</strong> {API_CONFIG.RESERVATION_SERVICE_URL}
          </p>
          <p>
            <strong>Port:</strong> 8083
          </p>
          {lastCheck && (
            <p>
              <strong>Dernière vérification:</strong> {lastCheck.toLocaleTimeString()}
            </p>
          )}
        </div>

        {status === "offline" && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="text-red-800 text-sm">
              <strong>Backend non accessible.</strong> Vérifiez que :
            </p>
            <ul className="text-red-700 text-sm mt-2 space-y-1">
              <li>• Le service Spring Boot est démarré sur le port 8083</li>
              <li>• PostgreSQL est en cours d'exécution</li>
              <li>• Les variables d'environnement sont correctes</li>
              <li>• Aucun firewall ne bloque le port</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
