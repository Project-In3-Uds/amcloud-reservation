import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Carousel from '../components/Carousel';
import ReservationForm from '../components/ReservationForm';
import axios from 'axios';

interface Reservation {
    id: number;
    traveleName: string;
    destination: string;
    agencyName: string;
    depart: string;
    heureDepart: Date;
    classe: string;
}

const ReservationsPage: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8083/api/reservations', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc1MDgyMzI3OCwiZXhwIjoxNzUwOTMxMjc4fQ.hXxSRF_2tJ7Qg79jrCIZL8c9UHzc0cTs8CTvoqiYTMfhwDw6XG4MUKkYNhbMewOlZxxxJzWL9rZt-dr4_epAtgxWXRRn363sYafh-SuB-rdSFj-Wg_l6aj2SNba0LsAus7iVa7LTpcrjMBdbJ9Bqz2i_CaGLJCHqUyQk7Pq8GdbLkC1w8YAHcrjqFJxab9BiM6jjdRTDs3oSfpsfAWcS9q4Ezj1YSddUjcP_leSk8ssYov78CJXYleIhXccvMN4YU-APfqDy37SQWiXVo_kTh6ZgT3J-t4V8fpyKzu5ANHQ58EtXA0muLOy8l3ZkH2k2jA-sFo5dr_e9Q7MmwmLHwA',
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

    return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <div>
            <ReservationForm />
        </div>
        </div>
    );
};

export default ReservationsPage;