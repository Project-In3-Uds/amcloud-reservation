"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageSquare } from "lucide-react"
import { CommentsSection } from "./comment-section" // Import du nouveau composant

interface CommentModalProps {
  agencyId: number | null // Garde cette prop si le modal doit être spécifique à une agence
  isOpen: boolean
  onClose: () => void
}

export function CommentModal({ agencyId, isOpen, onClose }: CommentModalProps) {
  // Le agencyId peut être utilisé ici si le modal doit filtrer les commentaires par agence
  // Pour l'instant, CommentsSection gère ses propres commentaires mockés.

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Commentaires et Avis</span>
          </DialogTitle>
        </DialogHeader>
        <CommentsSection /> {/* Utilisation du composant réutilisable */}
      </DialogContent>
    </Dialog>
  )
}
