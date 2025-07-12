"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome, Github } from "lucide-react"
import { useAuth } from "../contexts/auth-context"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simuler une connexion
    await new Promise((resolve) => setTimeout(resolve, 1500))
    login("Utilisateur Test", email) // Utiliser l'email comme nom d'utilisateur pour l'exemple
    setLoading(false)
    router.push("/") // Rediriger vers la page d'accueil après connexion
  }

  const handleSocialLogin = (provider: string) => {
    alert(`Connexion avec ${provider} (non implémenté)`)
    // Ici, vous intégreriez la logique de connexion OAuth
  }

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader className="space-y-4">
        {/* Logo personnalisé ou titre */}
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-600 text-white text-2xl font-bold">
          GT
        </div>
        <CardTitle className="text-2xl font-bold">Se connecter à GeekTraveller</CardTitle>
        <CardDescription className="text-gray-600">
          Connectez-vous en utilisant votre compte ou une option sociale.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Adresse e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
            {loading ? "Connexion en cours..." : "Continuer avec l'e-mail"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Ou</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 bg-transparent"
            onClick={() => handleSocialLogin("Google")}
          >
            <Chrome className="h-4 w-4" />
            <span>Continuer avec Google</span>
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 bg-transparent"
            onClick={() => handleSocialLogin("GitHub")}
          >
            <Github className="h-4 w-4" />
            <span>Continuer avec GitHub</span>
          </Button>
        </div>

        <Link href="#" className="text-sm text-gray-600 hover:underline">
          Afficher d'autres options
        </Link>

        <div className="text-sm text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            S'inscrire
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
