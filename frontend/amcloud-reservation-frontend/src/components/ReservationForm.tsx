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

    const [showRecap, setShowRecap] = useState(false);
    const [recapData, setRecapData] = useState<any>(null);

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
                    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0ODk4Mjk0OCwiZXhwIjoxNzQ5MDkwOTQ4fQ.X4kg4pcb_slhXxvmNQrv8PSfIUgmce3gaJMrMRnQimtpecWSWk0_bIlE5cTv8NdALnTP2VRHfxCE6XgEqGfuXOt0vooU3S_xq80VjqyzdYa20eMhb2oWfqJC7Iwit0yRkQv89fuKmKd244hKxjECNHEVKgCTWl9sLbK_nae5jvVe-n2zFh9obbN_nJUC84xF13C-zIEwmS6q1sPfdtrhChuXLfpJ9PRfBGBLvDmCaEFxy47hsloFyuw2Wa6LKHdJ9UEb_k_PY-frFIOA5alnUr9lcTHpHgSR-kvqKb2mPMMNlUaFXQbdt8Dn8hzmYjPvG7FpRjEOJgNLncE59IB6vA'
                },
            });
            setMessage('Réservation créée avec succès !');
            setRecapData({
                travelerName,
                agencyName,
                destination,
                depart,
                heureDepart,
                classe,
            });
            setShowRecap(true);
            resetForm();
            if (onReservationCreated) onReservationCreated();
        } catch (error: any) {
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
        <>
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
                                <option value="">Classe</option>
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
        {showRecap && recapData && (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000
            }}>
                <div style={{ background: '#fff', padding: 32, borderRadius: 8, minWidth: 300 }}>
                    <h3>Réservation créée avec succès !</h3>
                    <ul>
                        <li><b>Nom :</b> {recapData.travelerName}</li>
                        <li><b>Agence :</b> {recapData.agencyName}</li>
                        <li><b>Départ :</b> {recapData.depart}</li>
                        <li><b>Destination :</b> {recapData.destination}</li>
                        <li><b>Heure de départ :</b> {recapData.heureDepart}</li>
                        <li><b>Classe :</b> {recapData.classe}</li>
                    </ul>
                    <button onClick={() => window.print()} style={{ marginRight: 16 }}>Imprimer</button>
                    <button onClick={() => setShowRecap(false)}>Fermer</button>
                </div>
            </div>
        )}
        </>
    );
};

export default ReservationForm;