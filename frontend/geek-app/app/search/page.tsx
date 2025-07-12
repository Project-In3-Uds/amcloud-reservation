"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SearchForm } from "../../components/search-form"
import { SearchResults } from "../../components/search-results"

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [searchData, setSearchData] = useState({
    departure: "",
    destination: "",
    date: "",
    passengers: 1,
  })

  useEffect(() => {
    // Pré-remplir le formulaire avec les paramètres de l'URL
    const departure = searchParams.get("departure") || ""
    const destination = searchParams.get("destination") || ""
    const date = searchParams.get("date") || ""

    if (departure || destination || date) {
      setSearchData({
        departure,
        destination,
        date,
        passengers: 1,
      })
    }
  }, [searchParams])

  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (data: any) => {
    setLoading(true)
    setHasSearched(true)

    // Simuler une recherche
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Résultats simulés basés sur la recherche
    const mockResults = [
      {
        id: 1,
        agency: "Express Voyage",
        from: data.departure,
        to: data.destination,
        date: data.date,
        time: "08:00",
        duration: "4h00",
        price: 5000,
        available: 12,
        total: 50,
        amenities: ["WiFi", "Climatisation", "Collation"],
        rating: 4.5,
      },
      {
        id: 2,
        agency: "Cameroun Express",
        from: data.departure,
        to: data.destination,
        date: data.date,
        time: "14:00",
        duration: "4h30",
        price: 4500,
        available: 8,
        total: 45,
        amenities: ["Climatisation", "Musique"],
        rating: 4.2,
      },
      {
        id: 3,
        agency: "Nord Express",
        from: data.departure,
        to: data.destination,
        date: data.date,
        time: "18:00",
        duration: "4h15",
        price: 5500,
        available: 20,
        total: 55,
        amenities: ["WiFi", "Climatisation", "TV", "Collation"],
        rating: 4.7,
      },
    ]

    setResults(mockResults)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Rechercher un voyage</h1>
          <SearchForm onSearch={handleSearch} initialData={searchData} loading={loading} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasSearched && <SearchResults results={results} loading={loading} searchData={searchData} />}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
