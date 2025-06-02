import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Dashbord from '../components/Dashbord';

const Home: React.FC = () => {
    const [showDashbord, setShowDashbord] = useState(false);

    return (
        <div style={{ display: 'flex' }}>
            {/* Bouton Menu */}
            {!showDashbord && (
                <button
                    onClick={() => setShowDashbord(true)}
                    style={{
                        position: 'fixed',
                        top: 20,
                        left: 20,
                        zIndex: 1000,
                        padding: '10px 20px',
                        background: '#0074D9',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer'
                    }}
                >
                    Menu
                </button>
            )}

            {/* Dashboard affiché seulement si showDashbord est true */}
            {showDashbord && <Dashbord />}

            <div style={{ marginLeft: showDashbord ? 220 : 0, width: '100%' }}>
                <Header />
                <Carousel />
                <h1>BIENVENU DANS NOTRE APPLICATION</h1>
                <Link href="/reservationForm">
                    <button>Faites une réservation</button>
                </Link>
                <Link href="/reservations">
                    <button style={{ marginLeft: 12 }}>liste des réservations</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;