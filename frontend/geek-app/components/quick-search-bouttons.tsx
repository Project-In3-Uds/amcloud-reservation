"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Route {
  from: string
  to: string
  icon: string
}

interface QuickSearchButtonsProps {
  routes: Route[]
  onRouteSelect: (from: string, to: string) => void
}

export function QuickSearchButtons({ routes, onRouteSelect }: QuickSearchButtonsProps) {
  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">Trajets populaires</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {routes.map((route, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onRouteSelect(route.from, route.to)}
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
            >
              <span className="text-2xl">{route.icon}</span>
              <div className="text-center">
                <div className="font-medium text-sm">{route.from}</div>
                <div className="text-xs text-gray-500">vers</div>
                <div className="font-medium text-sm">{route.to}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
