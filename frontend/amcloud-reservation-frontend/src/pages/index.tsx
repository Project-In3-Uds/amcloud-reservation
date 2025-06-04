import React from 'react';
import Link from 'next/link';
import Carousel from '../components/Carousel';

const Home: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1, display: 'flex' }}>
                <div style={{ width: '100%' }}>
                    <h1>BIENVENU DANS NOTRE APPLICATION</h1>
                    <Carousel />
                    <p>
                        Cette application vous permet de réserver des véhicules dans différentes agences. 
                        Vous pouvez consulter la liste des agences, faire une réservation et voir vos réservations.
                    </p>
                    <Link href="/reservationForm">
                        Reservez maintenant
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;