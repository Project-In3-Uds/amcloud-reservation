import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Personnel } from "../../models/Personnel";
import axios from "axios";

const PersonnelDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [personnel, setPersonnel] = useState<Personnel | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8083/api/personnel/${id}`)
        .then(res => setPersonnel(res.data));
    }
  }, [id]);

  if (!personnel) return <div>Chargement...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Détail du personnel</h2>
      <ul>
        <li><b>ID :</b> {personnel.id}</li>
        <li><b>Nom :</b> {personnel.nom}</li>
        <li><b>Poste :</b> {personnel.poste}</li>
        <li><b>Email :</b> {personnel.email}</li>
        <li><b>Téléphone :</b> {personnel.telephone}</li>
        <li><b>Adresse :</b> {personnel.adresse}</li>
        <li><b>Salaire :</b> {personnel.salaire}</li>
        <li><b>Date d'embauche :</b> {personnel.dateEmbauche?.toString()}</li>
        <li><b>Date de naissance :</b> {personnel.dateNaissance?.toString()}</li>
        <li><b>Date de départ :</b> {personnel.dateDepart?.toString()}</li>
        <li><b>Date fin de contrat :</b> {personnel.dateFinContrat?.toString()}</li>
        <li><b>idAgence :</b> {personnel.idAgence}</li>
        <li><b>userAccountId :</b> {personnel.userAccountId}</li>
      </ul>
    </div>
  );
};

export default PersonnelDetailPage;