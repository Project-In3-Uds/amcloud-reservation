import React, { useEffect, useState } from "react";
import BusList from "../components/BusList";
import { Bus } from "../models/Bus";
import axios from "axios";

const BusListPage = () => {
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8083/api/buses")
      .then(res => setBuses(res.data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Liste des bus</h2>
      <BusList buses={buses} />
    </div>
  );
};

export default BusListPage;