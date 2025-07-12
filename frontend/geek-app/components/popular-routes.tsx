"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users } from "lucide-react"
import { useRouter } from "next/navigation"

const popularRoutes = [
  {
    id: 1,
    from: "Yaoundé",
    to: "Douala",
    duration: "4h",
    price: 5000,
    passengers: 45,
    agency: "Express Voyage",
    time: "08:00",
    available: 12,
  },
  {
    id: 2,
    from: "Douala",
    to: "Bafoussam",
    duration: "3h30",
    price: 7500,
    passengers: 38,
    agency: "Cameroun Express",
    time: "10:00",
    available: 8,
  },
  {
    id: 3,
    from: "Yaoundé",
    to: "Bamenda",
    duration: "5h",
    price: 8000,
    passengers: 42,
    agency: "Nord Express",
    time: "16:00",
    available: 15,
  },
  {
    id: 4,
    from: "Douala",
    to: "Kribi",
    duration: "2h30",
    price: 4500,
    passengers: 28,
    agency: "Littoral Transport",
    time: "14:00",
    available: 20,
  },
  {
    id: 5,
    from: "Yaoundé",
    to: "Bertoua",
    duration: "6h",
    price: 9500,
    passengers: 35,
    agency: "Est Express",
    time: "07:00",
    available: 5,
  },
]

export function PopularRoutes() {
  const router = useRouter()

  const handleSearch = (route: (typeof popularRoutes)[0]) => {
    // Rediriger vers la page de recherche avec les paramètres pré-remplis
    const searchParams = new URLSearchParams({
      departure: route.from,
      destination: route.to,
      date: new Date().toISOString().split("T")[0], // Date d'aujourd'hui
      time: route.time,
    })
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vos destinations populaires</h2>
          <p className="text-lg text-gray-600">Découvrez les destinations préférées des voyageurs camerounais</p>
        </div>
        {/* Scroll horizontal sur mobile et desktop */}
        <div className="overflow-x-scroll pb-4 hide-scrollbar">
          <div
            className="flex space-x-6"
            style={{ minWidth: "max-content" }} // Assure que les éléments ne se wrappent pas
          >
            {popularRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex-shrink-0 w-80" // w-80 pour une largeur fixe
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {route.from} → {route.to}
                      </h3>
                      <p className="text-sm text-gray-500">{route.agency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{route.price.toLocaleString()} FCFA</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{route.duration}</div>
                    <div className="text-xs text-gray-500">Durée</div>
                  </div>
                  <div className="text-center">
                    <Users className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{route.passengers}</div>
                    <div className="text-xs text-gray-500">Passagers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-600">{route.available}</div>
                    <div className="text-xs text-gray-500">Places libres</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    Départ: <span className="font-medium">{route.time}</span>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      route.available > 10
                        ? "bg-green-100 text-green-800"
                        : route.available > 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {route.available > 10 ? "Disponible" : route.available > 5 ? "Peu de places" : "Presque complet"}
                  </div>
                </div>
                <Button onClick={() => handleSearch(route)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Rechercher
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            onClick={() => router.push("/search")}
          >
            Voir toutes les destinations
          </Button>
        </div>
      </div>
    </section>
  )
}
