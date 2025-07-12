import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-green-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Prêt à voyager ?</h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Rejoignez des milliers de voyageurs qui font confiance à GeekTraveller pour leurs déplacements à travers le
          Cameroun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            Rechercher un voyage
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
          >
            Devenir agence partenaire
          </Button>
        </div>
      </div>
    </section>
  )
}
