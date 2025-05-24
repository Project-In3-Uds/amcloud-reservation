import React from 'react';
import Link from 'next/link';





const Home: React.FC = () => {
    return (
        <div>
                               <h1>Hello World</h1>
            <Link href="/reservationForm">
             <button>Créer une réservation</button>
            </Link>

                 <Link href="/reservations">
                  <button style={{ marginLeft: 12 }}>liste des réservations</button>
                </Link>

         </div>
    );
};

export default Home;

