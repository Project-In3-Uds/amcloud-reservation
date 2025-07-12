"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating" 
import { MapPin, Phone, Mail, Building2, Shield } from "lucide-react"

interface Agency {
  id: number
  nom: string
  ville: string
  quartier: string
  adresse?: string
  telephone?: string
  email?: string
  themeColorPrimary: string
  themeColorSecondary: string
  agenceCode: string
  rating: number
  totalReviews: number
  description?: string
  services: string[]
  isVerified: boolean
}

interface AgencyDetailsProps {
  agency: Agency | null
  isOpen: boolean
  onClose: () => void
}

export function AgencyDetails({ agency, isOpen, onClose }: AgencyDetailsProps) {
  if (!agency) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: agency.themeColorPrimary }}
            >
              {agency.nom.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{agency.nom}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={agency.rating} readonly size="sm" />
                <span className="text-sm text-gray-500">({agency.totalReviews} avis)</span>
                {agency.isVerified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Shield className="h-3 w-3 mr-1" />
                    Vérifiée
                  </Badge>
                )}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">À propos</h3>
            <p className="text-gray-700">{agency.description}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Informations de contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{agency.adresse || `${agency.quartier}, ${agency.ville}`}</p>
                  <p className="text-sm text-gray-500">
                    {agency.ville} - {agency.quartier}
                  </p>
                </div>
              </div>
              {agency.telephone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <p>{agency.telephone}</p>
                </div>
              )}
              {agency.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <p>{agency.email}</p>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-gray-400" />
                <p className="text-sm text-gray-600">Code: {agency.agenceCode}</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Services proposés</h3>
            <div className="flex flex-wrap gap-2">
              {agency.services.map((service, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* Horaires (exemple) */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Horaires d'ouverture</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="text-gray-600">06:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="text-gray-600">06:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-gray-600">08:00 - 16:00</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
