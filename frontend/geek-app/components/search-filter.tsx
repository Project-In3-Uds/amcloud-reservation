"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Filter, X } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filterOptions = [
    { id: "morning", label: "Matin (6h-12h)", category: "time" },
    { id: "afternoon", label: "Après-midi (12h-18h)", category: "time" },
    { id: "evening", label: "Soir (18h-24h)", category: "time" },
    { id: "direct", label: "Trajet direct", category: "type" },
    { id: "ac", label: "Climatisé", category: "comfort" },
    { id: "wifi", label: "WiFi", category: "comfort" },
  ]

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter((f) => f !== filterId)
      : [...activeFilters, filterId]

    setActiveFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    setActiveFilters([])
    onFiltersChange([])
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtres avancés
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Masquer" : "Afficher"}
          </Button>
        </div>
      </CardHeader>

      {showFilters && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <Badge
                  key={filter.id}
                  variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-green-100"
                  onClick={() => toggleFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>

            {activeFilters.length > 0 && (
              <>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {activeFilters.length} filtre{activeFilters.length > 1 ? "s" : ""} actif
                    {activeFilters.length > 1 ? "s" : ""}
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Effacer tout
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
