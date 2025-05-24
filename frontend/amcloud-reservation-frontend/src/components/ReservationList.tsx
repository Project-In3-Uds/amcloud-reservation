import React from 'react';

const ReservationList: React.FC<{ reservations: Array<{ id: number; traveler_name: string; destination: string; agency_name: string; }> }> = ({ reservations }) => {
    return (
        <div>
            <h2>Reservation List</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        <strong>Traveler:</strong> {reservation.travelerName} <br />
                        <strong>Destination:</strong> {reservation.destination} <br />
                        <strong>Agency:</strong> {reservation.agencyName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationList;