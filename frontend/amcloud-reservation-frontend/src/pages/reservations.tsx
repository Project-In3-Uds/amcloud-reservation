import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationList from '../components/ReservationList';

interface Reservation {
    id: number;
    travelerName: string;
    destination: string;
    agencyName: string;
}

const ReservationsPage: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8083/api/reservations', {
                    headers: {
                        'Authorization':'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0ODA4MjA3OCwiZXhwIjoxNzQ4MTE4MDc4fQ.t35nGPccDvZ6dAUZ3ZLdGAmTZtXiuyLVBrPiPQ45iHGbOVRLF1NdEhkxL0e6bdZBfXZ9V9BFkIjO_ojMema0ZDJgokBXKqCZDsmOWVvH1CJQ2TYu3j03FnROOqiG24f8YPfTcRTARHPHf4x3Qa4lJyOGvyL6N_cyr_NxVoBlsbpTTt-_ZONCv2ObCCUjeHz0XwNH10K6BLa7zrHpaOHjKn3_TCV_zAnX0E6pI4n5Ee59OaXQjpcOl_CgtcGL6iVu7AToQgTNvzZHFScz7ljpN8lre5KvELOIlh1RYUGvAkHKf75l4KVvZZBJwkYAPzpZyJCJoBe2O_8EATtN2xiYmw', 
      }
                    
                });
                setReservations(response.data);
            } catch (error) {
                console.log('Erreur lors du chargement des réservations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    return (
        <div>
            <h1>Liste des réservations</h1>
            {loading ? <p>Chargement...</p> : <ReservationList reservations={reservations} />}
        </div>
    );
};

export default ReservationsPage;