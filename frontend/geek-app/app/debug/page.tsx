"use client"

import { BackendStatus } from "../../components/debug/backend-status"
import { useAuth } from "../../contexts/auth-context"
import { API_CONFIG } from "../../lib/config"

export default function DebugPage() {
  const { userAccount, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug - Configuration</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* État du Backend */}
          <BackendStatus />

          {/* Configuration API */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration API</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Base URL:</strong> {API_CONFIG.BASE_URL}
              </p>
              <p>
                <strong>Service URL:</strong> {API_CONFIG.RESERVATION_SERVICE_URL}
              </p>
              <p>
                <strong>Environment:</strong> {process.env.NODE_ENV}
              </p>
            </div>
          </div>

          {/* État d'authentification */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentification</h3>
            <div className="text-sm space-y-2">
              <p>
                <strong>Connecté:</strong>{" "}
                <span className={isAuthenticated ? "text-green-600" : "text-red-600"}>
                  {isAuthenticated ? "Oui" : "Non"}
                </span>
              </p>
              {userAccount && (
                <>
                  <p>
                    <strong>Username:</strong> {userAccount.username}
                  </p>
                  <p>
                    <strong>Rôle:</strong> {userAccount.role}
                  </p>
                  <p>
                    <strong>IAM ID:</strong> {userAccount.iamId}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Variables d'environnement */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Variables d'environnement</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>NEXT_PUBLIC_API_URL:</strong> {process.env.NEXT_PUBLIC_API_URL || "Non définie"}
              </p>
              <p>
                <strong>NEXT_PUBLIC_RESERVATION_URL:</strong> {process.env.NEXT_PUBLIC_RESERVATION_URL || "Non définie"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
