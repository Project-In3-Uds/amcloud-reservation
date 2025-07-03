import React from 'react';
import { Trajet } from '../models/Trajet';

interface TrajetListProps {
  trajets: Trajet[];
}

const TrajetList: React.FC<TrajetListProps> = ({ trajets }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8faff', marginTop: 24 }}>
    <thead>
      <tr>
        <th style={thStyle}>Départ</th>
        <th style={thStyle}>Arrivée</th>
        <th style={thStyle}>Heure départ</th>
        <th style={thStyle}>Heure arrivée</th>
        <th style={thStyle}>Prix</th>
        <th style={thStyle}>Distance</th>
        <th style={thStyle}>Description</th>
      </tr>
    </thead>
    <tbody>
      {trajets.map((t) => (
        <tr key={t.id}>
          <td style={tdStyle}>{t.villeDepart}</td>
          <td style={tdStyle}>{t.villeArrivee}</td>
          <td style={tdStyle}>{t.heureDepart ? t.heureDepart.toString().slice(0,5) : '-'}</td>
          <td style={tdStyle}>{t.heuresArrivee ? t.heuresArrivee.toString().slice(0,5) : '-'}</td>
          <td style={tdStyle}>{t.prix} FCFA</td>
          <td style={tdStyle}>{t.distance} km</td>
          <td style={tdStyle}>{t.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const thStyle = { background: '#0074D9', color: '#fff', padding: '10px' };
import { CSSProperties } from 'react';

const tdStyle: CSSProperties = { border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' };

export default TrajetList;