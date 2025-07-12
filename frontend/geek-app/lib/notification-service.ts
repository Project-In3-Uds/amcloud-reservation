import { EmailService } from "./email-service"

// Service de notification SMS/Email avec tickets
export class NotificationService {
  // Simuler l'envoi de SMS via service email
  static async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      // En production, ici vous utiliseriez un service comme:
      // - Twilio pour SMS
      // - Service email pour envoyer des notifications
      // - Service SMS local camerounais

      console.log(`📱 SMS envoyé à ${phone}:`)
      console.log(message)

      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return true
    } catch (error) {
      console.error("Erreur envoi SMS:", error)
      return false
    }
  }

  // Notification complète avec ticket par email
  static async sendReservationConfirmation(reservationData: any): Promise<void> {
    const smsMessage = `
 GEEKTRAVELLER - Réservation confirmée !

Bonjour ${reservationData.voyageur.nom},

Réservation #${reservationData.id || "GT" + Date.now()}
 ${reservationData.trajet.from} → ${reservationData.trajet.to}
 ${new Date(reservationData.trajet.date).toLocaleDateString("fr-FR")} à ${reservationData.trajet.time}
 ${reservationData.agence.nom}
 ${reservationData.montant.toLocaleString()} FCFA

 Présentez-vous 30min avant le départ
 Ticket détaillé envoyé par email

Bon voyage ! 🇨🇲
    `.trim()

    // Envoyer SMS de confirmation rapide
    if (reservationData.voyageur.telephone) {
      await this.sendSMS(reservationData.voyageur.telephone, smsMessage)
    }

    // Envoyer le ticket détaillé par email
    if (reservationData.voyageur.email) {
      await EmailService.sendTravelTicket(reservationData)
    }

    // Log pour la démo
    console.log(" Notification complète envoyée:")
    console.log("- SMS de confirmation:", reservationData.voyageur.telephone ? " " : " ")
    console.log("- Ticket par email:", reservationData.voyageur.email ? " " : " ")
  }

  // Simuler une réservation complète avec notifications
  static async simulateBooking(bookingData: {
    voyageur: { nom: string; telephone?: string; email?: string }
    trajet: { from: string; to: string; date: string; time: string }
    agence: {
      nom: string
      logoUrl?: string
      themeColorPrimary?: string
      phone?: string
      email?: string
      adresse?: string
    }
    montant: number
    siege?: string
    classe?: string
  }): Promise<void> {
    console.log(" Simulation de réservation démarrée...")

    // Simuler le processus de réservation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Générer un ID de réservation
    const reservationId = "GT" + Date.now()

    const fullReservationData = {
      ...bookingData,
      id: reservationId,
    }

    // Envoyer les notifications
    await this.sendReservationConfirmation(fullReservationData)

    console.log(`Réservation ${reservationId} confirmée et notifications envoyées !`)
  }
}
