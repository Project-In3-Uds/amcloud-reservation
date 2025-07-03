import React, { useEffect, useState } from "react";
import { Personnel } from "../models/Personnel";
import axios from "axios";
import { useRouter } from "next/router";

const PersonnelListPage = () => {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:8083/api/reservations")
      .then(res => setPersonnel(res.data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Liste du personnel</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#f8faff" }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nom</th>
            <th style={thStyle}>Poste</th>
            <th style={thStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {personnel.map((p) => (
            <tr
              key={p.id}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/personnel/${p.id}`)}
            >
              <td style={tdStyle}>{p.id}</td>
              <td style={tdStyle}>{p.nom}</td>
              <td style={tdStyle}>{p.poste}</td>
              <td style={tdStyle}>{p.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = { background: "#0074D9", color: "#fff", padding: "10px" };
const tdStyle: React.CSSProperties = { border: "1px solid #e0e0e0", padding: "10px", textAlign: "center" };

export default PersonnelListPage;