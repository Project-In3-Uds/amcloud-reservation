export enum UserRole {
  CLIENT = "CLIENT",
  AGENCY = "AGENCY",
  PERSONNEL = "PERSONNEL",
}

export enum ReservationStatus {
  PENDING = "PENDING", // En attente
  CONFIRMED = "CONFIRMED", // Confirmée
  PAID = "PAID", // Payée
  CANCELLED = "CANCELLED", // Annulée
  COMPLETED = "COMPLETED", // Terminée
  NO_SHOW = "NO_SHOW", // Absent
}

export enum PaymentStatus {
  PENDING = "PENDING", // En attente
  PAID = "PAID", // Payé
  FAILED = "FAILED", // Échec
  REFUNDED = "REFUNDED", // Remboursé
}

export enum PaymentMethod {
  MTN_MONEY = "MTN_MONEY",
  ORANGE_MONEY = "ORANGE_MONEY",
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
}

// Table user_account
export interface UserAccount {
  id: number
  iamId: number // ID dans le service IAM
  username: string
  role: UserRole
}

// Table agence avec personnalisation et vérification
export interface Agence {
  adresse: ReactNode
  id: number
  nom: string
  agenceCode: string // Code d'agrément obligatoire
  logo?: string
  couleurs?: string
  localisation?: string
  themeColorPrimary?: string // theme_color_primary
  themeColorSecondary?: string // theme_color_secondary
  logoUrl?: string // logo_url
  description?: string
  ville?: string
  quartier?: string
  isVerified?: boolean // Statut de vérification
  verificationDate?: string // Date de vérification
}

// Table trajet
export interface Trajet {
  id: number
  villeDepart: string // ville_depart
  villeArrivee: string // ville_arrivee
  distance?: number
  idAgence: number // id_agence
  description?: string
  heureDepart?: string // heure_depart (TIME)
  heureArrivee?: string // heure_arrivee (TIME)
  agence?: Agence
}

// Table bus
export interface Bus {
  id: number
  immatriculation: string
  capacite: number
  idTrajet: number // id_trajet
  idAgence: number // id_agence
  trajet?: Trajet
  agence?: Agence
}

// Table seat
export interface Seat {
  id: number
  numero: number
  etat: "libre" | "occupe" | "reserve" // VARCHAR(20) DEFAULT 'libre'
  idBus: number // id_bus
  bus?: Bus
}

// Table trip
export interface Trip {
  id: number
  dateDepart: string // date_depart TIMESTAMP
  idTrajet: number // id_trajet
  idBus: number // id_bus
  idAgence: number // id_agence
  trajet?: Trajet
  bus?: Bus
  agence?: Agence
  availableSeats?: Seat[]
  price?: number // Calculé côté backend
}

// Table ticket avec statuts étendus
export interface Ticket {
  id: number
  idTrip: number // id_trip
  idSeat: number // id_seat
  idUserAccount: number // id_user_account
  dateReservation: string // date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  status: ReservationStatus
  paymentStatus: PaymentStatus
  paymentMethod?: PaymentMethod
  amount: number
  travelerName: string
  travelerPhone?: string
  travelerEmail?: string
  trip?: Trip
  seat?: Seat
  userAccount?: UserAccount
}

// Table personnel
export interface Personnel {
  id: number
  nom: string
  poste?: string
  idAgence: number // id_agence
  userAccountId?: number // user_account_id
  agence?: Agence
  userAccount?: UserAccount
}

// Table reservation (pour l'historique)
export interface Reservation {
  id: number
  travelerName: string // traveler_name
  destination: string
  agencyName: string // agency_name
  depart: string
  heureDepart: string // heure_depart TIMESTAMP
  classe: string
}

// Table reservation_history
export interface ReservationHistory extends Reservation {
  createdAt: string // created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

// DTOs pour les requêtes
export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  password: string
  role: UserRole
  // Pour les agences
  agenceName?: string
  agenceCode?: string // NOUVEAU : Code d'agrément obligatoire
  agenceDescription?: string
  ville?: string
  quartier?: string
  themeColorPrimary?: string
  themeColorSecondary?: string
  // Pour le personnel
  nom?: string
  poste?: string
  agenceId?: number
}

export interface AuthResponse {
  token: string
  userAccount: UserAccount
  agence?: Agence
  personnel?: Personnel
}

export interface TripSearchParams {
  villeDepart?: string
  villeArrivee?: string
  dateDepart?: string
  agenceId?: number
  minPrice?: number
  maxPrice?: number
}

export interface CreateReservationRequest {
  tripId: number
  seatIds: number[]
  travelerName: string
  travelerPhone?: string
  travelerEmail?: string
  paymentMethod: PaymentMethod
  classe?: string
}

// Statistiques pour les agences
export interface AgencyStats {
  totalReservations: number
  pendingReservations: number
  confirmedReservations: number
  completedReservations: number
  cancelledReservations: number
  totalRevenue: number
  monthlyRevenue: number
}

// Codes d'agrément valides (à gérer côté serveur)
export interface AgencyVerification {
  code: string
  agencyName: string
  isValid: boolean
  isUsed: boolean
  issueDate: string
  expiryDate?: string
}
