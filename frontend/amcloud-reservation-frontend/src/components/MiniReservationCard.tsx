
import React from "react";

interface MiniReservationCardProps {
  trajet: string;
  prix: number;
  onReserve: () => void;
}

const MiniReservationCard: React.FC<MiniReservationCardProps> = ({ trajet, prix, onReserve }) => (
  <div style={{
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px #e0e0e0",
    padding: "1rem",
    margin: "0.5rem",
    minWidth: "180px",
    textAlign: "center"
  }}>
    <div style={{ fontWeight: "bold", color: "#0074D9" }}>{trajet}</div>
    <div style={{ margin: "0.5rem 0" }}>{prix} FCFA</div>
    <button
      style={{
        background: "#0074D9",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "0.5rem 1rem",
        cursor: "pointer"
      }}
      onClick={onReserve}
    >
      Réserver
    </button>
  </div>
);

export default MiniReservationCard;