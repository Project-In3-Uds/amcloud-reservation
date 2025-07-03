import React from 'react';
import Link from 'next/link';
import Carousel from '../components/Carousel';
import MiniReservationCard from '../components/MiniReservationCard';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
    const router = useRouter();

    // Déclare les trajets ici, avant le return
    const trajets = [
        { trajet: "Douala → Yaoundé", prix: 5000 },
        { trajet: "Yaoundé → Bafoussam", prix: 4000 },
        { trajet: "Douala → Kribi", prix: 6000 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1, display: 'flex' }}>
                <div style={{ width: '100%' }}>
                    <h1>BIENVENUE DANS NOTRE APPLICATION</h1>
                    <Carousel />
                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", margin: "2rem 0" }}>
                        {trajets.map((t, i) => (
                            <MiniReservationCard
                                key={i}
                                trajet={t.trajet}
                                prix={t.prix}
                                onReserve={() => router.push("/reservationForm")}
                            />
                        ))}
                    </div>
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