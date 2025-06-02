import Link from 'next/link';

const Header: React.FC = () => (
  <header style={{
    background: '#0074D9',
    padding: '16px 0',
    marginBottom: '24px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    gap: '32px'
  }}>
    <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Accueil</Link>
    <Link href="/reservations" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Liste des réservations</Link>
    <Link href="/agences" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Liste des agences</Link>
    <Link href="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Connexion</Link>
  </header>
);

export default Header;