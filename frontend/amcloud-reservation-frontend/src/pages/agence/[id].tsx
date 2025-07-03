import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Agency } from '../../models/Agency';
import { Bus } from '../../models/Bus';
import axios from 'axios';
import BusList from '../../components/BusList';
import PersonnelList from '../../components/PersonnelList';
import { Personnel } from '../../models/Personnel';

const AgencePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [agency, setAgency] = useState<Agency | null>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);

  useEffect(() => {
    if (id) {
      axios.get(`/api/agencies/${id}`)
        .then(res => setAgency(res.data));
      axios.get(`http://localhost:8083/api/buses?agence=${id}`)
        .then(res => setBuses(res.data));
      axios.get(`http://localhost:8083/api/personnel?agence=${id}`)
        .then(res => setPersonnel(res.data));
    }
  }, [id]);

  if (!agency) return <div>Chargement...</div>;

  return (
    <div>
      <h2>{agency.nom}</h2>
      <p>{agency.description}</p>
      <p>Ville : {agency.ville}</p>
      <p>Quartier : {agency.quartier}</p>
      <h3>Liste des bus</h3>
      <BusList buses={buses} />
      <h3>Personnel de l'agence</h3>
      <PersonnelList personnel={personnel} />
      {/* Tu peux ajouter ici les autres composants (trajets, etc.) */}
    </div>
  );
};

export default AgencePage;