import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AgencyList from '../components/AgencyList';
interface Agency {
  id: number;
  name: string;
  users: number;
  inscription: string;
  location: string;
}

// Exemple de récupération dynamique (remplace par un fetch/axios si tu as une API)
const mockAgencies: Agency[] = [
  { id: 1, name: "Garanti Express", users: 120, inscription: "2023-01-15", location: "Douala" },
  { id: 2, name: "Finexs Voyages", users: 95, inscription: "2022-11-10", location: "Yaoundé" },
  { id: 3, name: "General Express", users: 80, inscription: "2023-03-22", location: "Bafoussam" },
  { id: 4, name: "Touristique Express", users: 60, inscription: "2024-02-05", location: "Garoua" }
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
      <Footer />
    </div>
  );
};

export default AgencesPage;