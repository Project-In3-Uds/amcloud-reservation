import Link from 'next/link';

const Dashbord: React.FC = () => (
  <aside
    style={{
      width: 220,
      minHeight: '100vh',
      background: '#0074D9',
      color: '#fff',
      padding: '32px 16px',
      boxSizing: 'border-box',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}
  >
    <h2 style={{ color: '#fff', marginBottom: 32 }}>Menu</h2>
    <Link href="/" style={{ color: '#fff', textDecoration: 'none', marginBottom: 16 }}>Accueil</Link>
    <Link href="/reservations" style={{ color: '#fff', textDecoration: 'none', marginBottom: 16 }}>Réservations</Link>
    <Link href="/reservationForm" style={{ color: '#fff', textDecoration: 'none', marginBottom: 16 }}>Créer réservation</Link>
    <Link href="/agences" style={{ color: '#fff', textDecoration: 'none', marginBottom: 16 }}>Agences</Link>
    <Link href="/login" style={{ color: '#fff', textDecoration: 'none', marginBottom: 16 }}>Connexion</Link>
  </aside>
);

export default Dashbord;