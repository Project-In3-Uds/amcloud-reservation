import React from 'react';
import { Bus } from '../models/Bus';
import router, { useRouter } from 'next/router';
interface BusListProps {
  buses: Bus[];
}

const BusList: React.FC<BusListProps> = ({ buses }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8faff', marginTop: 24 }}>
    <thead>
      <tr>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Immatriculation</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Capacité</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Trajet</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Agence</th>
      </tr>
    </thead>
    <tbody>
      {buses.map((bus) => (
        <tr key={bus.id}>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{bus.immatriculation}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{bus.capacite}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{bus.idTrajet}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{bus.idAgence}</td>
                    <button
            onClick={() => router.push(`/seatList?busId=${bus.id}`)}
            style={{ background: '#0074D9', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 12px', cursor: 'pointer' }}
          >
            Voir les places
          </button>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BusList;