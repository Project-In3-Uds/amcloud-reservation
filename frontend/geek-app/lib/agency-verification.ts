export class AgencyVerificationService {
  // Codes d'agrément valides (version demo - plus permissive)
  private static validCodes = [
    {
      code: "AGR-CM-2024-001",
      agencyName: "Transport Express Cameroun",
      isValid: true,
      isUsed: false,
      issueDate: "2024-01-15",
      region: "Centre",
    },
    {
      code: "AGR-CM-2024-002",
      agencyName: "Garantie Express SARL",
      isValid: true,
      isUsed: false,
      issueDate: "2024-01-20",
      region: "Littoral",
    },
    {
      code: "DEMO-001",
      agencyName: "Agence Demo Test",
      isValid: true,
      isUsed: false,
      issueDate: "2024-01-01",
      region: "Centre",
    },
    {
      code: "TEST-123",
      agencyName: "Test Transport",
      isValid: true,
      isUsed: false,
      issueDate: "2024-01-01",
      region: "Littoral",
    },
  ]

  static async verifyAgencyCode(code: string): Promise<{
    isValid: boolean
    isUsed: boolean
    message: string
    agencyInfo?: any
  }> {
    // Simuler un délai de vérification plus court pour la demo
    await new Promise((resolve) => setTimeout(resolve, 500))

    // VERSION DEMO : Accepter plusieurs formats
    const validFormats = [
      /^AGR-CM-\d{4}-\d{3}$/, // Format officiel
      /^DEMO-\d{3}$/, // Format demo
      /^TEST-\d{3}$/, // Format test
      /^[A-Z]{3,10}-[0-9]{1,5}$/, // Format flexible
    ]

    const isValidFormat = validFormats.some((regex) => regex.test(code))

    if (!isValidFormat) {
      // VERSION DEMO : Message plus permissif
      return {
        isValid: false,
        isUsed: false,
        message: "Format suggéré: AGR-CM-YYYY-XXX, DEMO-XXX, ou TEST-XXX",
      }
    }

    // Chercher le code dans la liste
    const agencyInfo = this.validCodes.find((item) => item.code === code)

    if (!agencyInfo) {
      // VERSION DEMO : Auto-générer un code valide pour les formats acceptés
      if (code.startsWith("DEMO-") || code.startsWith("TEST-") || code.startsWith("AGR-")) {
        const demoAgencyInfo = {
          code: code,
          agencyName: `Agence ${code}`,
          isValid: true,
          isUsed: false,
          issueDate: "2024-01-01",
          region: "Centre",
        }

        // Ajouter temporairement à la liste
        this.validCodes.push(demoAgencyInfo)

        return {
          isValid: true,
          isUsed: false,
          message: "Code d'agrément accepté (mode démo)",
          agencyInfo: demoAgencyInfo,
        }
      }

      return {
        isValid: false,
        isUsed: false,
        message: "Code non reconnu. Essayez DEMO-001, TEST-123, ou AGR-CM-2024-XXX",
      }
    }

    if (agencyInfo.isUsed) {
      return {
        isValid: false,
        isUsed: true,
        message: "Ce code a déjà été utilisé. Essayez un autre numéro.",
      }
    }

    if (!agencyInfo.isValid) {
      return {
        isValid: false,
        isUsed: false,
        message: "Code expiré. Contactez le support.",
      }
    }

    return {
      isValid: true,
      isUsed: false,
      message: "Code d'agrément valide ✅",
      agencyInfo,
    }
  }

  static async markCodeAsUsed(code: string): Promise<void> {
    // En mode demo, on peut réutiliser les codes
    const agencyInfo = this.validCodes.find((item) => item.code === code)
    if (agencyInfo) {
      // VERSION DEMO : Ne pas marquer comme utilisé pour permettre la réutilisation
      // agencyInfo.isUsed = true
      console.log(`Code ${code} utilisé (mode demo - réutilisable)`)
    }
  }

  static generateNewCode(): string {
    const year = new Date().getFullYear()
    const nextNumber = Math.floor(Math.random() * 999) + 1
    return `DEMO-${nextNumber.toString().padStart(3, "0")}`
  }

  // Méthode pour générer des codes de test rapides
  static getTestCodes(): string[] {
    return ["DEMO-001", "DEMO-002", "TEST-123", "TEST-456", "AGR-CM-2024-999"]
  }
}
