import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
    <footer style={{
        width: '100%',
        background: '#0074D9',
        color: '#fff',
        textAlign: 'center',
        padding: '1rem 0',
        marginTop: 'auto'
    }}>
         <div style={{ marginBottom: 8 }}>
            <Link href="/about" style={{ color: '#fff', textDecoration: 'underline', marginRight: 12 }}>
                À propos de nous
            </Link>
        </div>
        <div style={{ fontSize: '0.95rem', marginBottom: 8 }}>
            Reservation est une plateforme moderne permettant de réserver facilement des véhicules auprès de différentes agences de transport interurbain au Cameroun.
        </div>
        &copy; {new Date().getFullYear()} AmCloud Reservation - Tous droits réservés
    </footer>
);

export default Footer;