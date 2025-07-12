"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Bell, CheckCircle2, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nouvelle réservation confirmée",
      description: "Votre réservation pour le trajet Yaoundé-Douala le 15/07 a été confirmée.",
      time: "Il y a 5 minutes",
      read: false,
    },
    {
      id: "2",
      title: "Mise à jour de l'agence Touristique Express",
      description: "L'agence Touristique Express a ajouté de nouveaux trajets.",
      time: "Il y a 1 heure",
      read: false,
    },
    {
      id: "3",
      title: "Nouveau commentaire sur Binam Voyage",
      description: "Un utilisateur a laissé un nouveau commentaire sur l'agence Binam Voyage.",
      time: "Il y a 3 heures",
      read: false,
    },
    {
      id: "4",
      title: "Rappel : Votre voyage demain",
      description: "N'oubliez pas votre voyage de Douala à Bafoussam demain à 08h00.",
      time: "Hier",
      read: true,
    },
    {
      id: "5",
      title: "Offre spéciale : 10% de réduction",
      description: "Profitez de 10% de réduction sur tous les trajets ce week-end.",
      time: "Il y a 2 jours",
      read: true,
    },
    {
      id: "6",
      title: "Maintenance du système",
      description: "Une maintenance planifiée aura lieu le 20/07 de 02h00 à 04h00.",
      time: "Il y a 3 jours",
      read: true,
    },
  ])

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="flex-shrink-0">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Retour</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Gérez toutes vos alertes et mises à jour.</p>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Vos notifications ({unreadCount} non lues)
            </CardTitle>
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Marquer tout comme lu
            </Button>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4" />
                <p>Aucune notification pour le moment.</p>
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-280px)] rounded-md border">
                <div className="p-4">
                  {notifications.map((notif, index) => (
                    <div
                      key={notif.id}
                      className={`flex items-start space-x-4 p-3 rounded-md transition-colors ${
                        notif.read ? "bg-gray-50 text-gray-600" : "bg-blue-50 text-blue-900 font-medium"
                      } ${index > 0 ? "mt-2" : ""}`}
                    >
                      <div className="flex-shrink-0">
                        <Bell className={`h-5 w-5 ${notif.read ? "text-gray-400" : "text-blue-600"}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notif.title}</p>
                        <p className={`text-xs ${notif.read ? "text-gray-500" : "text-blue-700"}`}>
                          {notif.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{notif.time}</span>
                        </div>
                      </div>
                      {!notif.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notif.id)}
                          className="flex-shrink-0"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="sr-only">Marquer comme lu</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
