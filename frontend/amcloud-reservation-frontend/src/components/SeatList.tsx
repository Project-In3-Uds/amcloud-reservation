import React from 'react';
import { Seat } from '../models/Seat';

interface SeatListProps {
  seats: Seat[];
  onSelectSeat?: (seat: Seat) => void;
}

const SeatList: React.FC<SeatListProps> = ({ seats, onSelectSeat }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8faff', marginTop: 24 }}>
    <thead>
      <tr>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Numéro</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>État</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Action</th>
      </tr>
    </thead>
    <tbody>
      {seats.map((seat) => (
        <tr key={seat.id}>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{seat.numero}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{seat.etat}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>
            <button
              disabled={seat.etat !== 'libre'}
              style={{
                background: seat.etat === 'libre' ? '#0074D9' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: 5,
                padding: '6px 12px',
                cursor: seat.etat === 'libre' ? 'pointer' : 'not-allowed'
              }}
              onClick={() => onSelectSeat && onSelectSeat(seat)}
            >
              {seat.etat === 'libre' ? 'Choisir' : 'Indisponible'}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SeatList;