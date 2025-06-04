import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashbord from '../components/Dashbord';
import React, { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [showDashbord, setShowDashbord] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            {/* Bouton flottant pour ouvrir le menu */}
            {!showDashbord && (
                <button
                    onClick={() => setShowDashbord(true)}
                    style={{
                        position: 'fixed',
                        top: 24,
                        left: 24,
                        zIndex: 2001,
                        background: '#0074D9',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Menu
                </button>
            )}
            <div style={{ flex: 1, display: 'flex' }}>
                {showDashbord && <Dashbord onClose={() => setShowDashbord(false)} />}
                <div
                    style={{
                        marginLeft: showDashbord ? 220 : 0,
                        width: '100%',
                        transition: 'margin-left 0.3s',
                        minHeight: '100vh',
                        background: '#f5f6fa'
                    }}
                >
                    <main style={{ flex: 1 }}>
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MyApp;