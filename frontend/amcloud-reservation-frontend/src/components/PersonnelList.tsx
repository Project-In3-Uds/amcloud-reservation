import React from 'react';
import { Personnel } from '../models/Personnel';

interface PersonnelListProps {
  personnel: Personnel[];
}

const PersonnelList: React.FC<PersonnelListProps> = ({ personnel }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8faff', marginTop: 24 }}>
    <thead>
      <tr>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Nom</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Poste</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '10px' }}>Agence</th>
      </tr>
    </thead>
    <tbody>
      {personnel.map((p) => (
        <tr key={p.id}>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{p.nom}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{p.poste}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{p.idAgence}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PersonnelList;