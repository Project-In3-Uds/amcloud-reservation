import { Car, Shield, Wallet, Users } from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "Économique",
    description: "Voyagez à travers le Cameroun à des prix abordables avec nos agences partenaires.",
  },
  {
    icon: Users,
    title: "Convivial",
    description: "Découvrez la diversité culturelle du Cameroun et rencontrez des voyageurs de toutes les régions.",
  },
  {
    icon: Shield,
    title: "En confiance",
    description: "Agences vérifiées, avis des voyageurs et assistance 24h/7j pour voyager sereinement.",
  },
  {
    icon: Car,
    title: "Pratique",
    description: "Réservez en quelques clics et voyagez confortablement de ville en ville.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir GeekTraveller ?</h2>
          <p className="text-lg text-gray-600">
            La solution de transport de confiance pour tous vos trajets au Cameroun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
