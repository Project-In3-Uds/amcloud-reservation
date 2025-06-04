import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login';

const LoginPage: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
    <main style={{ flex: 1 }}>
      <Login />
    </main>
    
  </div>
);

export default LoginPage;