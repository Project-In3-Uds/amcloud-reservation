import React, { useEffect, useState } from 'react';

import ReservationForm from '../components/ReservationForm';
import axios from 'axios';


interface Reservation {
    id: number;
    traveleName: string;
    destination: string;
    agencyName: string;
}

const ReservationsPage: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8083/api/reservations', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0ODA4MjA3OCwiZXhwIjoxNzQ4MTE4MDc4fQ.t35nGPccDvZ6dAUZ3ZLdGAmTZtXiuyLVBrPiPQ45iHGbOVRLF1NdEhkxL0e6bdZBfXZ9V9BFkIjO_ojMema0ZDJgokBXKqCZDsmOWVvH1CJQ2TYu3j03FnROOqiG24f8YPfTcRTARHPHf4x3Qa4lJyOGvyL6N_cyr_NxVoBlsbpTTt-_ZONCv2ObCCUjeHz0XwNH10K6BLa7zrHpaOHjKn3_TCV_zAnX0E6pI4n5Ee59OaXQjpcOl_CgtcGL6iVu7AToQgTNvzZHFScz7ljpN8lre5KvELOIlh1RYUGvAkHKf75l4KVvZZBJwkYAPzpZyJCJoBe2O_8EATtN2xiYmw', 
 }
            });
            setReservations(response.data);
        } catch (error) {
            console.log('Erreur lors du chargement des réservations:', error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    // const fetchReservations = async () => {
    //     const res = await fetch('http://localhost:8083/api/reservations');
    //     const data = await res.json();
    //     setReservations(data);
    // };

    // useEffect(() => {
    //     fetchReservations();
    // }, []);

    return (
        <div>
            <h1>Reservations</h1>
            <ReservationForm onReservationCreated={fetchReservations} />
           
        </div>
    );
};

export default ReservationsPage;