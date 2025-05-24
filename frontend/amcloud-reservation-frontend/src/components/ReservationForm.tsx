import React, { useState } from 'react';
import axios from 'axios';

interface ReservationFormProps {
    onReservationCreated?: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onReservationCreated }) => {
    const [travelerName, setTravelerName] = useState('');
    const [destination, setDestination] = useState('');
    const [agencyName, setAgencyName] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        try {
            const response = await axios.post('http://localhost:8083/api/reservations', {
                travelerName,
                destination,
                agencyName,
            }, {
                headers: {
                    'Content-Type': 'application/json',

                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0ODA4MjA3OCwiZXhwIjoxNzQ4MTE4MDc4fQ.t35nGPccDvZ6dAUZ3ZLdGAmTZtXiuyLVBrPiPQ45iHGbOVRLF1NdEhkxL0e6bdZBfXZ9V9BFkIjO_ojMema0ZDJgokBXKqCZDsmOWVvH1CJQ2TYu3j03FnROOqiG24f8YPfTcRTARHPHf4x3Qa4lJyOGvyL6N_cyr_NxVoBlsbpTTt-_ZONCv2ObCCUjeHz0XwNH10K6BLa7zrHpaOHjKn3_TCV_zAnX0E6pI4n5Ee59OaXQjpcOl_CgtcGL6iVu7AToQgTNvzZHFScz7ljpN8lre5KvELOIlh1RYUGvAkHKf75l4KVvZZBJwkYAPzpZyJCJoBe2O_8EATtN2xiYmw',
                },
            });

            if (response.status === 201) {
                setMessage('Réservation créée avec succès !');
                setTravelerName('');
                setDestination('');
                setAgencyName('');
                if (onReservationCreated) onReservationCreated()
                    { setMessage('Réservation créée avec succès !'); }; 
            } else {
                setMessage('Erreur : Impossible de créer la réservation.');
            }
        } catch (error) {
            setMessage('Erreur de connexion au serveur.');
        }
    };

    //     try {
    //         const response = await fetch('http://localhost:8083/api/reservations', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                  'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0ODAxNDM0NCwiZXhwIjoxNzQ4MDE3OTQ0fQ.KnUqQ307jovJS-AkAXkCKHl2Na1QWdW0jQ_9uiV7LXrvA5DlC6PdrJaBoil67kUoHiifYGFfzDDfgD4jSyaeJcAFTgN5kj0ptrr-52z22hVvFZQ71c_CYcWaNhUVDPB5EoFub__9HGZJgooCNMa8x1x0PcOzfw8OpFMWBOb5rIX8W-Lw3BWO1D8bjRVAeBATlQorio_-sbrS0r0mgeXN1O74PtFXC7qsaE1voQwwCuzpch1N7a1VwhlGAHYJnTDwcsSlxMsf6FeBjs44umDFO00hk4gWvjE9VEfhkIaZruVWAP2K2IqwKNayENYdxPRgBzmNLoGYibEZi7h894WoBA',
    //             },
    //             body: JSON.stringify({
    //                 travelerName,
    //                 destination,
    //                 agencyName,
    //             }),
    //         });

    //         if (response.ok) {
    //             setMessage('Réservation créée avec succès !');
    //             setTravelerName('');
    //             setDestination('');
    //             setAgencyName('');
    //             if (onReservationCreated) onReservationCreated(); 
    //         } else {
    //             const errorData = await response.json();
    //             setMessage('Erreur : ' + (errorData.message || 'Impossible de créer la réservation.'));
    //         }
    //     } catch (error) {
    //         setMessage('Erreur de connexion au serveur.');
    //     }
    // };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer une réservation</h2>
            <div>
                <label>Voyageur :</label>
                <input
                    type="text"
                    value={travelerName}
                    onChange={e => setTravelerName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Destination :</label>
                <input
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Agence :</label>
                <input
                    type="text"
                    value={agencyName}
                    onChange={e => setAgencyName(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Créer</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ReservationForm;