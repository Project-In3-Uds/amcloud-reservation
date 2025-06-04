import React from 'react';
interface Agency {
  id: number;
  name: string;
  users: number;
  inscription: string;
  location: string;
}

interface AgencyListProps {
  agencies: Agency[];
}

const AgencyList: React.FC<AgencyListProps> = ({ agencies }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8faff' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid #0074D9', padding: '10px', background: '#0074D9', color: '#fff' }}>Nom de l'agence</th>
        <th style={{ border: '1px solid #0074D9', padding: '10px', background: '#0074D9', color: '#fff' }}>Nombre d'utilisateurs</th>
        <th style={{ border: '1px solid #0074D9', padding: '10px', background: '#0074D9', color: '#fff' }}>Date d'inscription</th>
        <th style={{ border: '1px solid #0074D9', padding: '10px', background: '#0074D9', color: '#fff' }}>Localisation</th>
      </tr>
    </thead>
    <tbody>
      {agencies.map((agency) => (
        <tr key={agency.id}>
          <td style={{ border: '1px solid #0074D9', padding: '10px', textAlign: 'center' }}>{agency.name}</td>
          <td style={{ border: '1px solid #0074D9', padding: '10px', textAlign: 'center' }}>{agency.users}</td>
          <td style={{ border: '1px solid #0074D9', padding: '10px', textAlign: 'center' }}>{agency.inscription}</td>
          <td style={{ border: '1px solid #0074D9', padding: '10px', textAlign: 'center' }}>{agency.location}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AgencyList;