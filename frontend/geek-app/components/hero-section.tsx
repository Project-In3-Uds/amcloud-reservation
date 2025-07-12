import { SearchForm } from "./search-form"
import { PopularRoutes } from "./popular-routes"

export function HeroSection() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Bienvenu dans notre plateforme</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             Reservez maintenant!
            </p>
          </div>

          <SearchForm />

         
        </div>
      </section>

      {/* Section routes populaires détaillées */}
      <PopularRoutes />
    </>
  )
}
