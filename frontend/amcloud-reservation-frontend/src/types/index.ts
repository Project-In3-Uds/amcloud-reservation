export interface Reservation {
    id: number;
    travelerName: string;
    destination: string;
    agencyName: string;
}

export interface ReservationHistory {
    id: number;
    travelerName: string;
    destination: string;
    agencyName: string;
    createdAt: string; // ISO string format for timestamps
}