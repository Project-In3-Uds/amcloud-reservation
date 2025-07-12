export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">GeekTraveller</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Actualités
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Carrières
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Transport</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Sécurité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Nos agences partenaires
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Destinations populaires
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Aide</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Nous contacter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Signaler un problème
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Conditions générales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 GeekTraveller. Tous droits réservés.</p>
          <p className="text-gray-500 text-sm mt-2">Votre plateforme de réservation de transport au Cameroun 🇨🇲</p>
        </div>
      </div>
    </footer>
  )
}
