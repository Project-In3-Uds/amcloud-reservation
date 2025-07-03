import React, { useState } from "react";
import axios from "axios";
import { Trajet } from "../models/Trajet";

interface TrajetFormProps {
  idAgence: number;
  onTrajetCreated: (trajet: Trajet) => void;
}

const TrajetForm: React.FC<TrajetFormProps> = ({ idAgence, onTrajetCreated }) => {
  const [form, setForm] = useState({
    villeDepart: "",
    villeArrivee: "",
    description: "",
    prix: "",
    distance: "",
    heureDepart: "",
    heureArrivee: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trajetData = {
      ...form,
      prix: Number(form.prix),
      distance: Number(form.distance),
      idAgence,
    };
    const res = await axios.post("http://localhost:8083/api/trajets", trajetData);
    onTrajetCreated(res.data);
    setForm({
      villeDepart: "",
      villeArrivee: "",
      description: "",
      prix: "",
      distance: "",
      heureDepart: "",
      heureArrivee: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: "#f8faff", padding: 16, borderRadius: 8 }}>
      <input name="villeDepart" value={form.villeDepart} onChange={handleChange} placeholder="Ville de départ" required style={{ marginRight: 8 }} />
      <input name="villeArrivee" value={form.villeArrivee} onChange={handleChange} placeholder="Ville d'arrivée" required style={{ marginRight: 8 }} />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={{ marginRight: 8 }} />
      <input name="prix" value={form.prix} onChange={handleChange} placeholder="Prix" type="number" required style={{ marginRight: 8 }} />
      <input name="distance" value={form.distance} onChange={handleChange} placeholder="Distance" type="number" required style={{ marginRight: 8 }} />
      <input name="heureDepart" value={form.heureDepart} onChange={handleChange} placeholder="Heure de départ" type="time" required style={{ marginRight: 8 }} />
      <input name="heureArrivee" value={form.heureArrivee} onChange={handleChange} placeholder="Heure d'arrivée" type="time" required style={{ marginRight: 8 }} />
      <button type="submit" style={{ background: "#0074D9", color: "#fff", border: "none", borderRadius: 4, padding: "8px 16px" }}>
        Ajouter le trajet
      </button>
    </form>
  );
};

export default TrajetForm;