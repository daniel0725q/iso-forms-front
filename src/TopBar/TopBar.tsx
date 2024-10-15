// NavigationButtons.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationBar.css';

const NavigationButtons: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="navigation-container">
      <button onClick={() => navigate('/')} className="nav-button">Home</button>
      <button onClick={handleLoginLogout} className="nav-button">
        {isLoggedIn ? 'Cerrar sesión' : 'Login'}
      </button>
      <button onClick={() => navigate(-1)} className="nav-button">Atrás</button>
      <button onClick={() => navigate(1)} className="nav-button">Adelante</button>
    </div>
  );
};

export default NavigationButtons;