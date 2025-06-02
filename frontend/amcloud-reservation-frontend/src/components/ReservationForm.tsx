import React, { useState } from 'react';
import axios from 'axios';
import Dashbord from './Dashbord';
import styles from './ReservationForm.module.css';

interface ReservationFormProps {
    onReservationCreated?: () => void;
}


function getCurrentHeureDepart() {
    const now = new Date();
    // Format ISO 8601 : yyyy-MM-ddTHH:mm:ss
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}
const ReservationForm: React.FC<ReservationFormProps> = ({ onReservationCreated }) => {
    const [travelerName, setTravelerName] = useState('');
    const [destination, setDestination] = useState('');
    const [agencyName, setAgencyName] = useState('');
    const [depart, setDepart] = useState('');
    const [classe, setClasse] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const resetForm = () => {
        setTravelerName('');
        setDestination('');
        setAgencyName('');
        setDepart('');
        setClasse('');
    };
    const cameroonCities = [
        'Yaoundé', 'Douala', 'Garoua', 'Bamenda', 'Maroua', 'Bafoussam',
        'Nkongsamba', 'Ebolowa', 'Bertoua', 'Ngaoundéré', 'Dschang',
        'Limbe', 'Kribi', 'Buea', 'Foumban'
    ];
    const agencies = [
        "Garanti Express", "Finexs Voyages", "General Express", "Touristique Express", "Buca Voyages",
        "Amour Mezam", "Binam Voyages", "Transcam Voyages", "Musango Voyages", "United Express",
        "Avenir Voyages", "Mondial Express", "Sanaga Voyages", "Trésor Voyages"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        const heureDepart = getCurrentHeureDepart();
        console.log({
            travelerName,
            destination,
            agencyName,
            depart,
            heureDepart: getCurrentHeureDepart(),
            classe,
        });
        try {
            const response = await axios.post('http://localhost:8083/api/reservations', {
                travelerName,
                destination,
                agencyName,
                depart,
                heureDepart,
                classe,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0ODg4MDkzNiwiZXhwIjoxNzQ4OTE2OTM2fQ.GpWjTCNZHbBS_lXQCxR_-gYRLXC_iCQUUTMFivam6V4Ir0zai-JXG_7Mg3M2YBaocLmIoi8OuUJWXWMzrDAJBLFvBcNWJXB9lTveb-v2xaR6B-wiFoaJbUDMY5K2ARUnrgAIl1HDUpMih5WdzYEn3JyuxFVwnt96uqLxFkZypwJoVvbWhxDQJza3XAhnGJikAmHjHlK6Fa1P_wR_Gpd34VUoX9kJlqpslh9ktw70x3B1z6vS97iYzb2pFKyeVuap8DhUK_jG-EeJenGq73Q0-GuCX38hfdpyTBgeNLshFVqhbjIpLF6wROnuDBpxXvE1IJ_UKYxMyUyqGRKwcrqGNg'
                },
            });
            setMessage('Réservation créée avec succès !');
            resetForm();
            if (onReservationCreated) onReservationCreated();
        } catch (error: any) {
            console.log(error);
            if (error.response) {
                setMessage('Erreur : ' + (error.response.data?.message || 'Impossible de créer la réservation.'));
            } else {
                setMessage('Erreur de connexion au serveur.');
            }
        }
    };

    const handleReset = () => {
        resetForm();
        setMessage(null);
    };

    return (
        <div className={styles.centerContainer}>
            <Dashbord />
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit} onReset={handleReset} className={styles.formBox}>
                    <h2>Créer une réservation</h2>
                    <p>
                        <div>
                            <input
                                type="text"
                                placeholder='Entrez votre nom'
                                value={travelerName}
                                onChange={e => setTravelerName(e.target.value)}
                                required
                            />
                        </div>
                    </p>
                    <p>
                        <div>
                            <select
                                value={agencyName}
                                onChange={e => setAgencyName(e.target.value)}
                                required
                            >
                                <option value="">Agence</option>
                                {agencies.map(agency => (
                                    <option key={agency} value={agency}>{agency}</option>
                                ))}
                            </select>
                        </div>
                    </p>
                    <p>
                        <div>

                            <select
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                                required
                            >
                                <option value="">Destination</option>
                                {cameroonCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </p>
                    <p>
                        <div>

                            <select
                                value={depart}
                                onChange={e => setDepart(e.target.value)}
                                required
                            >
                                <option value="">Depart</option>
                                {cameroonCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </p>
                    <p>
                        <div>
                            <input
                                type="text"
                                placeholder='Heure de départ'
                                value={getCurrentHeureDepart()}
                                disabled
                            />
                        </div>
                    </p>
                    <p>
                        <div>
                            <select

                                value={classe}
                                onChange={e => setClasse(e.target.value)}
                                required
                            >
                                <option value="">CLASSIQUE</option>
                                <option value="VIP">VIP</option>
                                <option value="CLASSIQUE">CLASSIQUE</option>
                            </select>
                        </div>
                    </p>
                    <button type="submit" id="boutton1">CREER</button>
                    <button type="reset" id="boutton2" style={{ marginLeft: 10 }}>Annuler</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ReservationForm;