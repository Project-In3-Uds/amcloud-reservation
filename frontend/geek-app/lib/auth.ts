import { API_CONFIG } from "./config"
import { type UserAccount, type LoginCredentials, type RegisterData, UserRole, type AuthResponse } from "./types"
import axios from "axios"

class AuthService {
  private tempToken: string | null = null

  // Permet de définir un token temporaire (ex: pour debug ou accès manuel)
  setTempToken(token: string) {
    this.tempToken = token
    if (typeof window !== "undefined") { // <-- ajouté pour éviter l'erreur côté serveur
      localStorage.setItem("jwt_token", token)
    }
  }

  clearTempToken() {
    this.tempToken = null
    if (typeof window !== "undefined") { // <-- ajouté pour éviter l'erreur côté serveur
      localStorage.removeItem("jwt_token")
    }
  }

  private getAuthHeaders() {
    const token =
      this.tempToken ||
      (typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null) // <-- modifié
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
      credentials,
      { headers: { "Content-Type": "application/json" } }
    )
    const data = response.data
    localStorage.setItem("jwt_token", data.token)
    return data
  }

  // Nouvelle méthode pour personnaliser la page agence avec l'id agence
  async customizeAgencyPage(agenceId: number, customData: { primaryColor: string; logoUrl: string }) {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}/agences/${agenceId}/customization`,
      customData,
      { headers: this.getAuthHeaders() }
    )
    return response.data
  }

  // La méthode register ne fait plus d'inscription, elle sert à la personnalisation
  async register(agenceId: number, customData: { primaryColor: string; logoUrl: string }) {
    // Ici, on suppose que l'utilisateur est déjà authentifié via IAM
    return this.customizeAgencyPage(agenceId, customData)
  }

  async getCurrentUser(): Promise<AuthResponse> {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.ME}`,
      { headers: this.getAuthHeaders() }
    )
    return response.data
  }

  async refreshToken(): Promise<string> {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
      {},
      { headers: this.getAuthHeaders() }
    )
    const data = response.data
    localStorage.setItem("jwt_token", data.token)
    return data.token
  }

  logout() {
    if (typeof window !== "undefined") { // <-- ajouté pour éviter l'erreur côté serveur
      localStorage.removeItem("jwt_token")
    }
  }

  getToken(): string | null {
    if (typeof window !== "undefined") { // <-- ajouté pour éviter l'erreur côté serveur
      return localStorage.getItem("jwt_token")
    }
    return null
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Méthodes utilitaires pour les rôles
  isAgency(userAccount: UserAccount | null): boolean {
    return userAccount?.role === UserRole.AGENCY
  }

  isClient(userAccount: UserAccount | null): boolean {
    return userAccount?.role === UserRole.CLIENT
  }

  isPersonnel(userAccount: UserAccount | null): boolean {
    return userAccount?.role === UserRole.PERSONNEL
  }
}

export const authService = new AuthService()

// Exemple d'utilisation du token temporaire :
if (typeof window !== "undefined") { // <-- ajouté pour éviter l'erreur côté serveur
  authService.setTempToken("eyJraWQiOiJteS1rZXktaWQiLCJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sInNjb3BlcyI6WyJyZWFkIiwid3JpdGUiXSwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NTIxMzA3NjQsImV4cCI6MTc1MjEzNDM2NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgxIn0.BqRoFhXFreGFyl_XyL-M5A8skKi0u58dj6d_QVx08h2_qM9pAVot4dNLmywNEg_Or4pdcR_7bYdr78_EMBA7ti8P_aphGCuiCWGcxyuT8LPzodqYGus0xJoS71RlNkfjHGywrRvXxHoQVFqqIfnx0EXwjFrzoVQtaUiR0zHYEY14B0jbLp7ebpYqBOD7EuAink7DCABX3IYXJTer9Fpkk1rmeCyk5xVzS9CRv3U1JzqeeJrnlgrFTPjDcjnNvZgUMQK547kciOz-O-mpyWUvCQKCCj9RHRanml_N3sv8-_DjUcYL1GAsPSe_wSAzb3TusOb4DsLdoJtyhj05yt1Zcw")
}
