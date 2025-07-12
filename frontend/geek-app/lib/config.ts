export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8083/api",
  RESERVATION_SERVICE_URL: process.env.NEXT_PUBLIC_RESERVATION_URL || "http://localhost:8083",
  ENDPOINTS: {
    // Authentification
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/api/auth/register", // <-- doit correspondre au mapping backend
      ME: "/auth/me",
      REFRESH: "/auth/refresh",
    },
    // Agences
    AGENCES: {
      LIST: "/agences",
      BY_ID: (id: number) => `/agences/${id}`,
      CREATE: "/agences",
      UPDATE: (id: number) => `/agences/${id}`,
      DELETE: (id: number) => `/agences/${id}`,
    },
    TRAJETS: {
      LIST: "/trajets",
      BY_ID: (id: number) => `/trajets/${id}`,
      BY_AGENCE: (agenceId: number) => `/trajets/agence/${agenceId}`,
      CREATE: "/trajets",
      UPDATE: (id: number) => `/trajets/${id}`,
      DELETE: (id: number) => `/trajets/${id}`,
    },
    // Voyages (Trips)
    TRIPS: {
      LIST: "/trips",
      BY_ID: (id: number) => `/trips/${id}`,
      SEARCH: "/trips/search",
      BY_AGENCE: (agenceId: number) => `/trips/agence/${agenceId}`,
      AVAILABLE_SEATS: (id: number) => `/trips/${id}/seats`,
    },
    // Réservations
    RESERVATIONS: {
      CREATE: "/reservations",
      LIST: "/reservations",
      BY_USER: "/reservations/my-reservations",
      BY_ID: (id: number) => `/reservations/${id}`,
      CANCEL: (id: number) => `/reservations/${id}/cancel`,
    },
    // Tickets
    TICKETS: {
      CREATE: "/tickets",
      BY_USER: "/tickets/my-tickets",
      BY_ID: (id: number) => `/tickets/${id}`,
    },
    // Personnel
    PERSONNEL: {
      LIST: "/personnel",
      BY_ID: (id: string) => `/personnel/${id}`,
      CREATE: "/personnel",
      UPDATE: (id: string) => `/personnel/${id}`,
      DELETE: (id: string) => `/personnel/${id}`,
    },
  },
}
