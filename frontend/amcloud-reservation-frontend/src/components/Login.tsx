import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axios.post('http://localhost:8081/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage('Connexion réussie !');
        setUsername('');
        setPassword('');
        // Ici tu peux stocker le token ou rediriger l'utilisateur
      } else {
        setMessage("Erreur lors de la connexion.");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Erreur de connexion au serveur.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: '2rem auto', padding: 24, background: '#f8faff', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Connexion</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Nom d'utilisateur</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <button type="submit" style={{ width: '100%', padding: 10, background: '#0074D9', color: '#fff', border: 'none', borderRadius: 4 }}>
        Se connecter
      </button>
      {message && <p style={{ marginTop: 16, textAlign: 'center' }}>{message}</p>}
    </form>
  );
};

export default Login;