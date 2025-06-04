import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
    <main style={{ flex: 1, maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>À propos de AmCloud Reservation</h1>
      <p style={{ fontSize: '1.1rem', marginTop: 24 }}>
        <strong>AmCloud Reservation</strong> est une plateforme innovante dédiée à la réservation de véhicules auprès des agences de transport interurbain au Cameroun.
        Notre objectif est de simplifier et moderniser l’expérience de réservation pour les voyageurs comme pour les agences.
      </p>
      <p style={{ fontSize: '1.1rem', marginTop: 16 }}>
        Grâce à notre solution, vous pouvez :
        <ul style={{ marginTop: 8, marginBottom: 8 }}>
          <li>Consulter la liste des agences partenaires et leurs localisations.</li>
          <li>Réserver rapidement un véhicule en ligne, à tout moment.</li>
          <li>Gérer et suivre vos réservations en toute simplicité.</li>
          <li>Bénéficier d’une interface claire, moderne et sécurisée.</li>
        </ul>
      </p>
      <p style={{ fontSize: '1.1rem', marginTop: 16 }}>
        Notre équipe s’engage à offrir un service fiable, sécurisé et accessible à tous les voyageurs et professionnels du transport.
        N’hésitez pas à nous contacter pour toute question ou suggestion.
      </p>
    </main>
    <Footer />
  </div>
);

export default AboutPage;