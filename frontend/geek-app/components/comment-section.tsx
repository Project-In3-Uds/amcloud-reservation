"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "./star-rating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send } from "lucide-react"

interface Comment {
  id: number
  user: string
  avatar?: string
  rating: number
  comment: string
  date: string
}

// Ce composant contient la logique d'affichage et de soumission des commentaires
export function CommentsSection() {
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(0)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "Marie Dubois",
      rating: 5,
      comment: "Excellent service ! Personnel très professionnel et bus confortable.",
      date: "2024-01-10",
    },
    {
      id: 2,
      user: "Jean Kamga",
      rating: 4,
      comment: "Bon rapport qualité-prix. Quelques retards mais dans l'ensemble satisfait.",
      date: "2024-01-08",
    },
    {
      id: 3,
      user: "Fatima Nkomo",
      rating: 5,
      comment: "Je recommande vivement ! Voyage très agréable et ponctuel.",
      date: "2024-01-05",
    },
  ])

  const handleSubmitComment = () => {
    if (newComment.trim() && newRating > 0) {
      const comment: Comment = {
        id: comments.length + 1,
        user: "Utilisateur Actuel", // À remplacer par l'utilisateur connecté
        rating: newRating,
        comment: newComment.trim(),
        date: new Date().toISOString().split("T")[0],
      }
      setComments([comment, ...comments])
      setNewComment("")
      setNewRating(0)
    }
  }

  const averageRating = comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <StarRating rating={averageRating} readonly size="sm" />
              <span className="font-semibold">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600">{comments.length} avis</p>
          </div>
          <Badge variant="secondary">{comments.length} commentaires</Badge>
        </div>
      </div>

      {/* Nouveau commentaire */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-semibold">Laisser un avis</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Votre note</label>
          <StarRating rating={newRating} onRate={setNewRating} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Votre commentaire</label>
          <Textarea
            placeholder="Partagez votre expérience avec cette agence..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
          />
        </div>
        <Button onClick={handleSubmitComment} disabled={!newComment.trim() || newRating === 0} className="w-full">
          <Send className="h-4 w-4 mr-2" />
          Publier le commentaire
        </Button>
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        <h3 className="font-semibold">Tous les avis</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                  <AvatarFallback className="bg-green-100 text-green-600">{comment.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{comment.user}</p>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={comment.rating} readonly size="sm" />
                    <span className="text-xs text-gray-500">{comment.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
