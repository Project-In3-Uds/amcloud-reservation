import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { TempAgencyProvider } from "@/contexts/temp-agency-context" // Importez TempAgencyProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GeekTraveller",
  description: "Votre plateforme de réservation de voyages au Cameroun",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <TempAgencyProvider>{children}</TempAgencyProvider> {/* Enveloppez avec TempAgencyProvider */}
        </AuthProvider>
      </body>
    </html>
  )
}
