"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CommentsSection } from "@/components/comment-section" // Import du composant de section de commentaires
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CommentsPage() {
  const router = useRouter()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="flex-shrink-0">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Retour</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tous les commentaires</h1>
            <p className="text-gray-600">Consultez et laissez des avis sur les agences.</p>
          </div>
        </div>
        <CommentsSection /> {/* Affichage de la section des commentaires */}
      </div>
    </DashboardLayout>
  )
}
