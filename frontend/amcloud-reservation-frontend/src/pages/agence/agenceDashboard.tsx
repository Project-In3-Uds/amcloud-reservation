import React from "react";
import { useRouter } from "next/router";

const AgenceDashboard = () => {
  const router = useRouter();
  // Supposons que l'id de l'agence est passé dans l'URL ou via le contexte utilisateur
  const idAgence = Number(router.query.agenceId);

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h1>Bienvenue sur votre espace agence</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
        <button
          style={buttonStyle}
          onClick={() => router.push(`/trajetList?agenceId=${idAgence}`)}
        >
          Voir les trajets
        </button>
        <button
          style={buttonStyle}
          onClick={() => router.push(`/busList?agenceId=${idAgence}`)}
        >
          Voir les bus
        </button>
        <button
          style={buttonStyle}
          onClick={() => router.push(`/personnelList?agenceId=${idAgence}`)}
        >
          Voir le personnel
        </button>
        <button
          style={buttonStyle}
          onClick={() => router.push(`/seatList?agenceId=${idAgence}`)}
        >
          Voir les places
        </button>
        {/* Ajoute d'autres boutons selon tes besoins */}
      </div>
    </div>
  );
};

const buttonStyle = {
  background: "#0074D9",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "14px",
  fontSize: "1.1rem",
  cursor: "pointer",
  fontWeight: "bold"
};

export default AgenceDashboard;