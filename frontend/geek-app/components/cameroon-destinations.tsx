"use client"

import { MapPin, Camera, Mountain, Waves, TreePine, Building } from "lucide-react"

const destinations = [
  {
    name: "Yaoundé",
    region: "Centre",
    type: "Capitale politique",
    icon: Building,
    description: "Centre administratif et politique du Cameroun, ville aux sept collines",
    attractions: ["Palais de l'Unité", "Musée National", "Mont Fébé"],
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    name: "Douala",
    region: "Littoral",
    type: "Capitale économique",
    icon: Building,
    description: "Plus grande ville et port principal, cœur économique du pays",
    attractions: ["Port de Douala", "Marché Central", "Cathédrale"],
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    name: "Kribi",
    region: "Sud",
    type: "Station balnéaire",
    icon: Waves,
    description: "Plages paradisiaques et fruits de mer, destination de rêve",
    attractions: ["Plages de sable fin", "Chutes de la Lobé", "Pêche artisanale"],
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    name: "Bafoussam",
    region: "Ouest",
    type: "Hauts plateaux",
    icon: Mountain,
    description: "Région montagneuse, climat tempéré et plantations de café",
    attractions: ["Plantations de café", "Chefferies traditionnelles", "Marchés colorés"],
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    name: "Bamenda",
    region: "Nord-Ouest",
    type: "Région anglophone",
    icon: Mountain,
    description: "Diversité culturelle et paysages montagneux spectaculaires",
    attractions: ["Ring Road", "Lac Awing", "Marchés traditionnels"],
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    name: "Ngaoundéré",
    region: "Adamaoua",
    type: "Porte du Grand Nord",
    icon: TreePine,
    description: "Transition vers la savane, gare ferroviaire historique",
    attractions: ["Gare du transcamerounais", "Savane", "Élevage traditionnel"],
    image: "/placeholder.svg?height=150&width=200",
  },
]

export function CameroonDestinations() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Découvrez le Cameroun</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            L'Afrique en miniature vous attend ! Du littoral atlantique aux montagnes de l'Ouest, en passant par la
            forêt équatoriale et la savane du Nord, explorez la diversité camerounaise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => {
            const Icon = destination.icon
            return (
              <div key={destination.name} className="group cursor-pointer">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Image */}
                  <div className="relative h-40 bg-gradient-to-r from-green-400 to-blue-500">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-90 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                        {destination.region}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <p className="text-sm opacity-90">{destination.type}</p>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-600">{destination.type}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{destination.description}</p>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">À découvrir :</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.attractions.map((attraction, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                          >
                            <Camera className="h-3 w-3 mr-1" />
                            {attraction}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Carte du Cameroun stylisée */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">L'Afrique en miniature</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Le Cameroun offre une incroyable diversité de paysages, de cultures et de climats. Des plages tropicales
              aux montagnes tempérées, chaque région a ses propres merveilles à découvrir.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Waves className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm font-medium">Côte Atlantique</span>
              </div>
              <div className="flex flex-col items-center">
                <TreePine className="h-8 w-8 text-green-500 mb-2" />
                <span className="text-sm font-medium">Forêt Équatoriale</span>
              </div>
              <div className="flex flex-col items-center">
                <Mountain className="h-8 w-8 text-gray-500 mb-2" />
                <span className="text-sm font-medium">Hauts Plateaux</span>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-orange-500 mb-2" />
                <span className="text-sm font-medium">Savane du Nord</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
