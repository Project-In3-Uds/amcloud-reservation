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
                        'Authorization':'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0ODk4Mjk0OCwiZXhwIjoxNzQ5MDkwOTQ4fQ.X4kg4pcb_slhXxvmNQrv8PSfIUgmce3gaJMrMRnQimtpecWSWk0_bIlE5cTv8NdALnTP2VRHfxCE6XgEqGfuXOt0vooU3S_xq80VjqyzdYa20eMhb2oWfqJC7Iwit0yRkQv89fuKmKd244hKxjECNHEVKgCTWl9sLbK_nae5jvVe-n2zFh9obbN_nJUC84xF13C-zIEwmS6q1sPfdtrhChuXLfpJ9PRfBGBLvDmCaEFxy47hsloFyuw2Wa6LKHdJ9UEb_k_PY-frFIOA5alnUr9lcTHpHgSR-kvqKb2mPMMNlUaFXQbdt8Dn8hzmYjPvG7FpRjEOJgNLncE59IB6vA'}
                    
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