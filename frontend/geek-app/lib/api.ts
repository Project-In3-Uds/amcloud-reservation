import { authService } from "./auth"
import { API_CONFIG } from "./config"
import type { Agence, Trip, Ticket, TripSearchParams, CreateReservationRequest, Trajet, Seat } from "./types"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

class ApiService {
  // Remplace fetchWithAuth par axiosWithAuth
  private async axiosWithAuth(url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    }
    const token = authService.getToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    try {
      const response = await axios({
        url,
        ...options,
        headers,
        validateStatus: () => true,
      })
      if (response.status === 401 && token) {
        try {
          await authService.refreshToken()
          const newToken = authService.getToken()
          if (newToken) {
            headers.Authorization = `Bearer ${newToken}`
            return axios({ url, ...options, headers })
          }
        } catch (error) {
          authService.logout()
          window.location.href = "/"
          throw new Error("Session expirée")
        }
      }
      return response
    } catch (error: any) {
      throw error
    }
  }

  // Remplace tous les fetchWithAuth par axiosWithAuth ci-dessous

  // === AGENCES ===

  // Créer une agence
  async createAgence(agence: Partial<Agence>): Promise<Agence> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AGENCES.CREATE}`, {
      method: "POST",
      data: agence,
    })
    if (response.status !== 200 && response.status !== 201) throw new Error("Erreur lors de la création de l'agence")
    return response.data
  }

  // Lister toutes les agences
  async getAllAgences(): Promise<Agence[]> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AGENCES.LIST}`)
    if (response.status !== 200) throw new Error("Erreur lors de la récupération des agences")
    return response.data
  }

  // Obtenir une agence par id
  async getAgenceById(id: number): Promise<Agence> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AGENCES.BY_ID(id)}`)
    if (response.status !== 200) throw new Error("Erreur lors de la récupération de l'agence")
    return response.data
  }

  // Supprimer une agence
  async deleteAgence(id: number): Promise<void> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AGENCES.DELETE(id)}`, {
      method: "DELETE",
    })
    if (response.status !== 204 && response.status !== 200) throw new Error("Erreur lors de la suppression de l'agence")
  }

  async getTrajetsByAgence(agenceId: number): Promise<Trajet[]> {
    const response = await this.axiosWithAuth(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRAJETS.BY_AGENCE(agenceId)}`
    )
    if (response.status !== 200) throw new Error("Erreur lors de la récupération des trajets")
    return response.data
  }

  async createTrajet(trajet: Partial<Trajet>): Promise<Trajet> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRAJETS.CREATE}`, {
      method: "POST",
      data: trajet,
    })
    if (response.status !== 200 && response.status !== 201) throw new Error("Erreur lors de la création du trajet")
    return response.data
  }

  async deleteTrajet(id: number): Promise<void> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRAJETS.DELETE(id)}`, {
      method: "DELETE",
    })
    if (response.status !== 204 && response.status !== 200) throw new Error("Erreur lors de la suppression du trajet")
  }

  async searchTrips(params: TripSearchParams): Promise<Trip[]> {
    const queryParams = new URLSearchParams()
    if (params.villeDepart) queryParams.append("villeDepart", params.villeDepart)
    if (params.villeArrivee) queryParams.append("villeArrivee", params.villeArrivee)
    if (params.dateDepart) queryParams.append("dateDepart", params.dateDepart)
    if (params.agenceId) queryParams.append("agenceId", params.agenceId.toString())
    if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString())
    if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString())

    const response = await this.axiosWithAuth(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIPS.SEARCH}?${queryParams}`
    )
    if (response.status !== 200) throw new Error("Erreur lors de la recherche de voyages")
    return response.data
  }

  async getTripsByAgence(agenceId: number): Promise<Trip[]> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIPS.BY_AGENCE(agenceId)}`)
    if (response.status !== 200) throw new Error("Erreur lors de la récupération des voyages")
    return response.data
  }

  async getTripById(id: number): Promise<Trip> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIPS.BY_ID(id)}`)
    if (response.status !== 200) throw new Error("Erreur lors de la récupération du voyage")
    return response.data
  }

  async getAvailableSeats(tripId: number): Promise<Seat[]> {
    const response = await this.axiosWithAuth(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIPS.AVAILABLE_SEATS(tripId)}`
    )
    if (response.status !== 200) throw new Error("Erreur lors de la récupération des places disponibles")
    return response.data
  }

  async createReservation(reservationData: CreateReservationRequest): Promise<Ticket> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TICKETS.CREATE}`, {
      method: "POST",
      data: reservationData,
    })
    if (response.status !== 200 && response.status !== 201) {
      const error = response.data?.message || "Erreur lors de la réservation"
      throw new Error(error)
    }
    return response.data
  }

  async getUserTickets(): Promise<Ticket[]> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TICKETS.BY_USER}`)
    if (response.status !== 200) throw new Error("Erreur lors de la récupération des tickets")
    return response.data
  }

  async getTicketById(id: number): Promise<Ticket> {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TICKETS.BY_ID(id)}`)
    if (response.status !== 200) throw new Error("Erreur lors de la récupération du ticket")
    return response.data
  }

  async getAllPersonnel() {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PERSONNEL.LIST}`)
    if (response.status !== 200) throw new Error("Erreur lors de la récupération du personnel")
    return response.data
  }
  async getPersonnelById(id: string) {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PERSONNEL.BY_ID(id)}`)
    if (response.status !== 200) throw new Error("Erreur lors de la récupération du personnel")
    return response.data
  }
  async createPersonnel(data: any) {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PERSONNEL.CREATE}`, {
      method: "POST",
      data,
    })
    if (response.status !== 200 && response.status !== 201) throw new Error("Erreur lors de la création du personnel")
    return response.data
  }
  async updatePersonnel(id: string, data: any) {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PERSONNEL.UPDATE(id)}`, {
      method: "PUT",
      data,
    })
    if (response.status !== 200) throw new Error("Erreur lors de la mise à jour du personnel")
    return response.data
  }
  async deletePersonnel(id: string) {
    const response = await this.axiosWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PERSONNEL.DELETE(id)}`, {
      method: "DELETE",
    })
    if (response.status !== 204 && response.status !== 200) throw new Error("Erreur lors de la suppression du personnel")
  }

  // Personnalisation d'agence (API pour relier IAM et réservation)
  // POST /api/agences/{id}/customization
  async customizeAgence(agenceId: number, customData: { primaryColor: string; logoUrl: string }) {
    const response = await this.axiosWithAuth(
      `${API_CONFIG.BASE_URL}/agences/${agenceId}/customization`,
      {
        method: "POST",
        data: customData,
      }
    )
    if (response.status !== 200) throw new Error("Erreur lors de la personnalisation de l'agence")
    return response.data
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_CONFIG.RESERVATION_SERVICE_URL}/actuator/health`)
      return response.status === 200
    } catch (error) {
      return false
    }
  }
}

export const apiService = new ApiService()




