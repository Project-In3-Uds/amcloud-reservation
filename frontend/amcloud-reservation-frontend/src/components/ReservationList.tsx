import React from 'react';

const ReservationList: React.FC<{ reservations: Array<{ id: number; travelerName: string; destination: string; agencyName: string; depart: string; heureDepart: Date; classe: string; }> }> = ({ reservations }) => {
    return (
        <div>
            <h2>Liste des Reservations</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #0074D9', padding: '8px' }}>Voyageur</th>
                        <th style={{ border: '1px solid #0074D9', padding: '8px' }}>Agence</th>
                        <th style={{ border: '1px solid #0074D9', padding: '8px' }}>Destination</th>
                        <th style={{ border: '1px solid #0074D9', padding: '8px' }}>Départ</th>
                        <th style={{ border: '1px solid #0074D9', padding: '8px' }}>Heure</th>
                        <th style={{ border: '1px solid #0074D9', padding: '8px' }}>Classe</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td style={{ border: '1px solid #0074D9', padding: '8px' }}>{reservation.travelerName}</td>
                            <td style={{ border: '1px solid #0074D9', padding: '8px' }}>{reservation.agencyName}</td>
                            <td style={{ border: '1px solid #0074D9', padding: '8px' }}>{reservation.destination}</td>
                            <td style={{ border: '1px solid #0074D9', padding: '8px' }}>{reservation.depart}</td>
                            <td style={{ border: '1px solid #0074D9', padding: '8px' }}>  {reservation.heureDepart ? new Date(reservation.heureDepart).toLocaleString() : ''}</td>
                            <td style={{ border: '1px solid #0074D9', padding: '8px' }}>{reservation.classe}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationList;