import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => (
  <header
    style={{
      background: '#0074D9',
      padding: '16px 0',
      marginBottom: '8px',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      position: 'relative'
    }}
  >
    {onMenuClick && (
      <button
        onClick={onMenuClick}
        style={{
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#005fa3',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 18px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Menu
      </button>
    )}
    <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Accueil</Link>
    <Link href="/reservationForm" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Réserver</Link>
    <Link href="/reservations" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Liste des réservations</Link>
    <Link href="/agencyList" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Liste des agences</Link>
    <Link href="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Connexion</Link>
  </header>
);

export default Header;