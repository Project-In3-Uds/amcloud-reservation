import React, { useEffect, useState } from "react";
import TrajetList from "../components/TrajetList";
import TrajetForm from "../components/TrajetForm";
import axios from "axios";
import { useRouter } from "next/router";

const TrajetsPage = () => {
  const [trajets, setTrajets] = useState<any[]>([]);
  const router = useRouter();
  const idAgence = Number(router.query.agenceId); // récupère l'id de l'agence depuis l'URL

  useEffect(() => {
    const token = localStorage.getItem("eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc1MTAyMjAzOCwiZXhwIjoxNzUxMTMwMDM4fQ.R3mPtHYFgQVxXeYikinoFNVKuZyzbNx_Md7mz06JuYtDbdt5iz-5Az_XcWot5V8u5FZANj6XNHaqSAqd4D-juQL4BLbeUuRU4Lx9e3p_ZvlLvGprHzxGjWultBj2lqcdxXdWlBDlZCwfWCJlN-ilDRWtI56jzwHaCVn9OxJ1onsFUjqTrQkvbNvO59F-vfZsKEjuBm01k4Zitq89YJqZqieZNT0XvoOWeJi1KbzKrj7TBLAKAu_HUypp8wn5U2yNiGTWZNYKB6T4KtH9Al7nJFv247w8rTJu82vaC8t__pL5wBcK2KeLpOI7vrxm4Ec7FYqWXrNvaur0RSh94tn9ww");
    if (idAgence && token) {
      axios
        .get(`http://localhost:8083/api/trajets`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setTrajets(res.data.content || res.data || []));
    }
  }, [idAgence]);

  const handleTrajetCreated = (newTrajet: any) => {
    setTrajets((prev) => [...prev, newTrajet]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Liste des trajets de l'agence</h2>
      <TrajetList trajets={trajets} />
      <TrajetForm idAgence={idAgence} onTrajetCreated={handleTrajetCreated} />
    </div>
  );
};

export default TrajetsPage;