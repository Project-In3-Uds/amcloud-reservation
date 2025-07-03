import React, { useEffect, useState } from "react";
import SeatList from "../components/SeatList";
import { Seat } from "../models/Seat";
import axios from "axios";
import { useRouter } from "next/router";

const BusSeatsPage = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const router = useRouter();
  const busId = router.query.busId;

  useEffect(() => {
    if (busId) {
      axios.get(`http://localhost:8083/api/seats?bus=${busId}`)
        .then(res => setSeats(res.data));
    }
  }, [busId]);

  return (
    <div>
      <h3>Liste des places du bus</h3>
      <SeatList seats={seats} />
    </div>
  );
};

export default BusSeatsPage;