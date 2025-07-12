export class EmailService {
  static sendTravelTicket(reservationData: any) {
    throw new Error("Method not implemented.")
  }
  // Simulation d'envoi d'email (en production, utiliser un vrai service comme SendGrid, Nodemailer, etc.)
  static async sendTicketEmail(ticketData: {
    passengerName: string
    passengerEmail: string
    route: {
      departure: string
      destination: string
      departureTime: string
      arrivalTime: string
      date: string
    }
    seat: string
    price: number
    bookingId: string
    agency: {
      name: string
      logo?: string
      primaryColor: string
      secondaryColor: string
    }
  }): Promise<boolean> {
    try {
      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const htmlTemplate = this.generateTicketHTML(ticketData)

      // En production, remplacer par un vrai service d'email
      console.log("📧 Email envoyé à:", ticketData.passengerEmail)
      console.log("📋 Contenu HTML:", htmlTemplate)

      // Simuler l'envoi via Gmail API ou autre service
      const emailPayload = {
        to: ticketData.passengerEmail,
        subject: `🎫 Votre billet de voyage - ${ticketData.route.departure} → ${ticketData.route.destination}`,
        html: htmlTemplate,
        from: `${ticketData.agency.name} <noreply@geektraveller.cm>`,
      }

      // Simulation de l'envoi réussi
      return true
    } catch (error) {
      console.error("Erreur envoi email:", error)
      return false
    }
  }

  private static generateTicketHTML(data: any): string {
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Billet de Voyage - ${data.agency.name}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                background-color: #f5f5f5;
                padding: 20px;
            }
            .ticket-container {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, ${data.agency.primaryColor}, ${data.agency.secondaryColor});
                color: white;
                padding: 30px 20px;
                text-align: center;
            }
            .logo {
                width: 60px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                margin: 0 auto 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: bold;
            }
            .agency-name {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 5px;
            }
            .ticket-title {
                font-size: 18px;
                opacity: 0.9;
            }
            .ticket-body {
                padding: 30px 20px;
            }
            .route-info {
                background: #f8fafc;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 25px;
                border-left: 4px solid ${data.agency.primaryColor};
            }
            .route-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            .route-cities {
                font-size: 20px;
                font-weight: bold;
                color: ${data.agency.primaryColor};
            }
            .route-arrow {
                font-size: 24px;
                color: ${data.agency.secondaryColor};
                margin: 0 10px;
            }
            .route-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-top: 15px;
            }
            .detail-item {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .detail-icon {
                width: 16px;
                height: 16px;
                color: ${data.agency.primaryColor};
            }
            .passenger-info {
                background: #fff;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 25px;
            }
            .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            .info-item {
                display: flex;
                flex-direction: column;
            }
            .info-label {
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                font-weight: 600;
                margin-bottom: 4px;
            }
            .info-value {
                font-size: 16px;
                font-weight: 600;
                color: #1e293b;
            }
            .price-highlight {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 25px;
            }
            .price-amount {
                font-size: 28px;
                font-weight: bold;
            }
            .qr-section {
                text-align: center;
                padding: 20px;
                background: #f8fafc;
                border-radius: 8px;
                margin-bottom: 25px;
            }
            .qr-code {
                width: 120px;
                height: 120px;
                background: #e2e8f0;
                border-radius: 8px;
                margin: 0 auto 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: #64748b;
            }
            .instructions {
                background: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
            }
            .instructions-title {
                font-weight: bold;
                color: #92400e;
                margin-bottom: 8px;
            }
            .instructions-list {
                color: #92400e;
                font-size: 14px;
                margin: 0;
                padding-left: 20px;
            }
            .footer {
                background: #f1f5f9;
                padding: 20px;
                text-align: center;
                font-size: 14px;
                color: #64748b;
            }
            .contact-info {
                margin-top: 10px;
            }
            @media (max-width: 600px) {
                .route-details {
                    grid-template-columns: 1fr;
                }
                .info-grid {
                    grid-template-columns: 1fr;
                }
                .route-header {
                    flex-direction: column;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="ticket-container">
            <!-- En-tête avec branding de l'agence -->
            <div class="header">
                <div class="logo">
                    ${data.agency.logo ? `<img src="${data.agency.logo}" alt="Logo" style="width: 40px; height: 40px; border-radius: 50%;">` : data.agency.name.charAt(0)}
                </div>
                <div class="agency-name">${data.agency.name}</div>
                <div class="ticket-title">Billet de Voyage Électronique</div>
            </div>

            <div class="ticket-body">
                <!-- Informations de route -->
                <div class="route-info">
                    <div class="route-header">
                        <div class="route-cities">
                            ${data.route.departure} <span class="route-arrow">→</span> ${data.route.destination}
                        </div>
                    </div>
                    <div class="route-details">
                        <div class="detail-item">
                            <span class="detail-icon">📅</span>
                            <span><strong>Date:</strong> ${new Date(data.route.date).toLocaleDateString("fr-FR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">🕐</span>
                            <span><strong>Départ:</strong> ${data.route.departureTime}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">🕐</span>
                            <span><strong>Arrivée:</strong> ${data.route.arrivalTime}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">💺</span>
                            <span><strong>Siège:</strong> ${data.seat}</span>
                        </div>
                    </div>
                </div>

                <!-- Informations passager -->
                <div class="passenger-info">
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Passager</div>
                            <div class="info-value">${data.passengerName}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">N° de réservation</div>
                            <div class="info-value">${data.bookingId}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Email</div>
                            <div class="info-value">${data.passengerEmail}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Statut</div>
                            <div class="info-value" style="color: #10b981;">✅ Confirmé</div>
                        </div>
                    </div>
                </div>

                <!-- Prix -->
                <div class="price-highlight">
                    <div>Prix Total</div>
                    <div class="price-amount">${data.price.toLocaleString()} FCFA</div>
                </div>

                <!-- Code QR simulé -->
                <div class="qr-section">
                    <div class="qr-code">
                        QR CODE<br>
                        ${data.bookingId}
                    </div>
                    <div style="font-size: 14px; color: #64748b;">
                        Présentez ce code QR à l'embarquement
                    </div>
                </div>

                <!-- Instructions -->
                <div class="instructions">
                    <div class="instructions-title">📋 Instructions importantes :</div>
                    <ul class="instructions-list">
                        <li>Arrivez 30 minutes avant l'heure de départ</li>
                        <li>Présentez une pièce d'identité valide</li>
                        <li>Gardez ce billet sur votre téléphone ou imprimez-le</li>
                        <li>En cas de retard, contactez immédiatement l'agence</li>
                    </ul>
                </div>
            </div>

            <!-- Pied de page -->
            <div class="footer">
                <div><strong>${data.agency.name}</strong></div>
                <div class="contact-info">
                    📞 Support: +237 690 000 000 | 📧 contact@geektraveller.cm<br>
                    Bon voyage avec ${data.agency.name} ! 🚌
                </div>
            </div>
        </div>
    </body>
    </html>
    `
  }

  // Méthode pour envoyer des notifications SMS (simulation)
  static async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log(`📱 SMS envoyé à ${phone}: ${message}`)
      return true
    } catch (error) {
      console.error("Erreur envoi SMS:", error)
      return false
    }
  }
}
