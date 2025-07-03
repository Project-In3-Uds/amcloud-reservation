import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AgencyList from '../components/AgencyList';
import { Agency } from '../models/Agency';

// Exemple de récupération dynamique (remplace par un fetch/axios si tu as une API)
const mockAgencies: Agency[] = [
  { id: 1, nom: "Garanti Express", ville: "Douala" },
  { id: 2, nom: "Finexs Voyages", ville: "Yaoundé" },
  { id: 3, nom: "General Express", ville: "Bafoussam" },
  { id: 4, nom: "Touristique Express", ville: "Garoua" }
];

const AgencesPage: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    // Remplace ce mock par un appel API si besoin
    setAgencies(mockAgencies);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <main style={{ flex: 1, padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Liste des agences</h2>
        <AgencyList agencies={agencies} />
      </main>
    </div>
  );
};

export default AgencesPage;