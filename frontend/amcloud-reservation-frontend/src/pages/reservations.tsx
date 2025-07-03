import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationList from '../components/ReservationList';
import Header from '../components/Header';
import Carousel from '../components/Carousel';

interface Reservation {
    id: number;
    travelerName: string;
    destination: string;
    agencyName: string;
    depart: string ;
    heureDepart: Date ;
    classe: string;
}


const ReservationsPage: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8083/api/reservations', {
                    headers: {
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc1MTAyMjAzOCwiZXhwIjoxNzUxMTMwMDM4fQ.R3mPtHYFgQVxXeYikinoFNVKuZyzbNx_Md7mz06JuYtDbdt5iz-5Az_XcWot5V8u5FZANj6XNHaqSAqd4D-juQL4BLbeUuRU4Lx9e3p_ZvlLvGprHzxGjWultBj2lqcdxXdWlBDlZCwfWCJlN-ilDRWtI56jzwHaCVn9OxJ1onsFUjqTrQkvbNvO59F-vfZsKEjuBm01k4Zitq89YJqZqieZNT0XvoOWeJi1KbzKrj7TBLAKAu_HUypp8wn5U2yNiGTWZNYKB6T4KtH9Al7nJFv247w8rTJu82vaC8t__pL5wBcK2KeLpOI7vrxm4Ec7FYqWXrNvaur0RSh94tn9ww'},
                    
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
            
            {loading ? <p>Chargement...</p> : <ReservationList reservations={reservations} />}
        </div>
    );
};

export default ReservationsPage;