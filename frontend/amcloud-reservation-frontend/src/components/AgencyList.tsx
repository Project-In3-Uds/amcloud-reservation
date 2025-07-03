import React from 'react';
import { Agency } from '../models/Agency';
import { useRouter } from 'next/router';
interface AgencyListProps {
  agencies: Agency[];
}

const AgencyList: React.FC<AgencyListProps> = ({ agencies }) => {
  const router = useRouter();

  return (
  <table
    style={{
      width: '100%',
      borderCollapse: 'collapse',
      background: '#f8faff',
      boxShadow: '0 2px 8px #e0e0e0',
      borderRadius: '10px',
      overflow: 'hidden'
    }}
  >
    <thead>
      <tr>
        <th style={{ background: '#0074D9', color: '#fff', padding: '12px' }}>Nom</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '12px' }}>Ville</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '12px' }}>Quartier</th>
        <th style={{ background: '#0074D9', color: '#fff', padding: '12px' }}>Trajet</th>
          <th style={{ background: '#0074D9', color: '#fff', padding: '12px' }}>bus</th>
      </tr>
    </thead>
    <tbody>
      {agencies.map((agency) => (
        <tr key={agency.id}>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{agency.nom}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{agency.ville}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>{agency.quartier || '-'}</td>
          <td style={{ border: '1px solid #e0e0e0', padding: '10px', textAlign: 'center' }}>
            <button
                     onClick={() => router.push(`/trajetList?agenceId=${agency.id}`)}
              style={{
                background: '#0074D9',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '6px 14px',
                cursor: 'pointer'
              }}
     
            >
              Voir
            </button>
            </td>
            <td>
              <button
              onClick={() => router.push(`/busList?agenceId=${agency.id}`)}
              style={{
                background: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '6px 12px',
                cursor: 'pointer',
                marginLeft: '8px'
              }}
            >
              Voir 
            </button>
          
          </td>
        
        </tr>
      ))}
    </tbody>
  </table>
);
};
export default AgencyList;