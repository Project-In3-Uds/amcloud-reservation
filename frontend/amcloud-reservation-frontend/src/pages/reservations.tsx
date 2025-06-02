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
                        'Authorization':'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0ODg4MDkzNiwiZXhwIjoxNzQ4OTE2OTM2fQ.GpWjTCNZHbBS_lXQCxR_-gYRLXC_iCQUUTMFivam6V4Ir0zai-JXG_7Mg3M2YBaocLmIoi8OuUJWXWMzrDAJBLFvBcNWJXB9lTveb-v2xaR6B-wiFoaJbUDMY5K2ARUnrgAIl1HDUpMih5WdzYEn3JyuxFVwnt96uqLxFkZypwJoVvbWhxDQJza3XAhnGJikAmHjHlK6Fa1P_wR_Gpd34VUoX9kJlqpslh9ktw70x3B1z6vS97iYzb2pFKyeVuap8DhUK_jG-EeJenGq73Q0-GuCX38hfdpyTBgeNLshFVqhbjIpLF6wROnuDBpxXvE1IJ_UKYxMyUyqGRKwcrqGNg'}
                    
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
            <Header />
            
            {loading ? <p>Chargement...</p> : <ReservationList reservations={reservations} />}
        </div>
    );
};

export default ReservationsPage;