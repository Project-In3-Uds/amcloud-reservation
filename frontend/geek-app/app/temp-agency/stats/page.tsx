"use client"

import { useState } from "react"
import { useTempAgency } from "../../../contexts/temp-agency-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Users, DollarSign, Bus, Star, Download, RefreshCw } from "lucide-react"

export default function TempStatsPage() {
  const { selectedAgency } = useTempAgency()
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "year">("month")
  const [loading, setLoading] = useState(false)

  // Données simulées selon la période
  const getStatsData = () => {
    const baseData = {
      week: {
        reservations: { value: 1250, change: 12.5, trend: "up" },
        revenus: { value: 850000, change: 18.3, trend: "up" },
        voyages: { value: 45, change: 15.7, trend: "up" },
        satisfaction: { value: 4.3, change: -0.1, trend: "down" },
        chartData: [
          { name: "Lun", reservations: 180, revenus: 120000, voyages: 8, satisfaction: 4.2 },
          { name: "Mar", reservations: 220, revenus: 150000, voyages: 9, satisfaction: 4.4 },
          { name: "Mer", reservations: 190, revenus: 130000, voyages: 7, satisfaction: 4.1 },
          { name: "Jeu", reservations: 240, revenus: 160000, voyages: 10, satisfaction: 4.5 },
          { name: "Ven", reservations: 280, revenus: 180000, voyages: 12, satisfaction: 4.3 },
          { name: "Sam", reservations: 320, revenus: 200000, voyages: 15, satisfaction: 4.6 },
          { name: "Dim", reservations: 290, revenus: 170000, voyages: 11, satisfaction: 4.2 },
        ],
      },
      month: {
        reservations: { value: 18900, change: 12.5, trend: "up" },
        revenus: { value: 12500000, change: 18.3, trend: "up" },
        voyages: { value: 520, change: 15.7, trend: "up" },
        satisfaction: { value: 4.3, change: -0.1, trend: "down" },
        chartData: [
          { name: "Jan", reservations: 1200, revenus: 800000, voyages: 35, satisfaction: 4.1 },
          { name: "Fév", reservations: 1400, revenus: 950000, voyages: 42, satisfaction: 4.2 },
          { name: "Mar", reservations: 1600, revenus: 1100000, voyages: 48, satisfaction: 4.3 },
          { name: "Avr", reservations: 1800, revenus: 1200000, voyages: 52, satisfaction: 4.4 },
          { name: "Mai", reservations: 2000, revenus: 1350000, voyages: 58, satisfaction: 4.5 },
          { name: "Jun", reservations: 1900, revenus: 1280000, voyages: 55, satisfaction: 4.3 },
          { name: "Jul", reservations: 2200, revenus: 1500000, voyages: 62, satisfaction: 4.6 },
          { name: "Aoû", reservations: 2100, revenus: 1420000, voyages: 59, satisfaction: 4.4 },
          { name: "Sep", reservations: 1950, revenus: 1320000, voyages: 56, satisfaction: 4.2 },
          { name: "Oct", reservations: 2050, revenus: 1380000, voyages: 58, satisfaction: 4.3 },
          { name: "Nov", reservations: 1850, revenus: 1250000, voyages: 53, satisfaction: 4.1 },
          { name: "Déc", reservations: 1900, revenus: 1280000, voyages: 55, satisfaction: 4.2 },
        ],
      },
      year: {
        reservations: { value: 89500, change: 25.8, trend: "up" },
        revenus: { value: 58200000, change: 32.1, trend: "up" },
        voyages: { value: 2840, change: 28.4, trend: "up" },
        satisfaction: { value: 4.2, change: 0.3, trend: "up" },
        chartData: [
          { name: "2020", reservations: 12000, revenus: 8000000, voyages: 420, satisfaction: 3.8 },
          { name: "2021", reservations: 15500, revenus: 10500000, voyages: 520, satisfaction: 3.9 },
          { name: "2022", reservations: 18200, revenus: 12800000, voyages: 640, satisfaction: 4.0 },
          { name: "2023", reservations: 21800, revenus: 15200000, voyages: 720, satisfaction: 4.1 },
          { name: "2024", reservations: 22000, revenus: 15700000, voyages: 740, satisfaction: 4.2 },
        ],
      },
    }
    return baseData[timeFilter]
  }

  const data = getStatsData()

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toString()
  }

  const handleRefresh = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const topRoutes = [
    { route: "Yaoundé → Douala", reservations: "35%", revenus: "7.2M FCFA", satisfaction: 4.5 },
    { route: "Douala → Bafoussam", reservations: "22%", revenus: "4.8M FCFA", satisfaction: 4.3 },
    { route: "Yaoundé → Bamenda", reservations: "18%", revenus: "3.9M FCFA", satisfaction: 4.1 },
    { route: "Douala → Kribi", reservations: "15%", revenus: "2.1M FCFA", satisfaction: 4.6 },
    { route: "Bafoussam → Garoua", reservations: "10%", revenus: "1.8M FCFA", satisfaction: 4.2 },
  ]

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Statistiques et Analytics</h1>
            <p className="text-gray-600">Performances détaillées de {selectedAgency?.nom}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { key: "week", label: "7j" },
                { key: "month", label: "30j" },
                { key: "year", label: "1an" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setTimeFilter(filter.key as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    timeFilter === filter.key
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Actualiser
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Réservations</p>
                <p className="text-2xl font-bold text-gray-900">{data.reservations.value.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {data.reservations.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      data.reservations.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {data.reservations.change > 0 ? "+" : ""}
                    {data.reservations.change}%
                  </span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenus</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.revenus.value)} FCFA</p>
                <div className="flex items-center mt-1">
                  {data.revenus.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${data.revenus.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {data.revenus.change > 0 ? "+" : ""}
                    {data.revenus.change}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Voyages</p>
                <p className="text-2xl font-bold text-gray-900">{data.voyages.value.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {data.voyages.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${data.voyages.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {data.voyages.change > 0 ? "+" : ""}
                    {data.voyages.change}%
                  </span>
                </div>
              </div>
              <Bus className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">{data.satisfaction.value}/5</p>
                <div className="flex items-center mt-1">
                  {data.satisfaction.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      data.satisfaction.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {data.satisfaction.change > 0 ? "+" : ""}
                    {data.satisfaction.change}
                  </span>
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des réservations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Évolution des Réservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {data.chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t-md transition-all duration-300 hover:bg-blue-600"
                    style={{
                      height: `${(item.reservations / Math.max(...data.chartData.map((d) => d.reservations))) * 200}px`,
                      minHeight: "20px",
                    }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{item.name}</span>
                  <span className="text-xs font-medium text-gray-900">{item.reservations}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Graphique des revenus */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Revenus par Période
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {data.chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-green-500 rounded-t-md transition-all duration-300 hover:bg-green-600"
                    style={{
                      height: `${(item.revenus / Math.max(...data.chartData.map((d) => d.revenus))) * 200}px`,
                      minHeight: "20px",
                    }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{item.name}</span>
                  <span className="text-xs font-medium text-gray-900">{formatCurrency(item.revenus)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Graphique des voyages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bus className="h-5 w-5 mr-2" />
              Nombre de Voyages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {data.chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-purple-500 rounded-t-md transition-all duration-300 hover:bg-purple-600"
                    style={{
                      height: `${(item.voyages / Math.max(...data.chartData.map((d) => d.voyages))) * 200}px`,
                      minHeight: "20px",
                    }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{item.name}</span>
                  <span className="text-xs font-medium text-gray-900">{item.voyages}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Graphique de satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Satisfaction Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {data.chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-yellow-500 rounded-t-md transition-all duration-300 hover:bg-yellow-600"
                    style={{
                      height: `${((item.satisfaction - 3.5) / (5 - 3.5)) * 200}px`,
                      minHeight: "20px",
                    }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{item.name}</span>
                  <span className="text-xs font-medium text-gray-900">{item.satisfaction}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 des routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Top 5 des Routes Populaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRoutes.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <div>
                    <h4 className="font-medium text-gray-900">{route.route}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{route.reservations} des réservations</span>
                      <span>•</span>
                      <span>{route.revenus}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>{route.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-24 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: route.reservations }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
