// NavigationButtons.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './NavigationBar.css';

interface TopbarProps {
  email: string; 
}
const Topbar: React.FC<TopbarProps>=({email}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(email);
  
  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="navigation-container">
      <div className='user-topbar'>
      <FontAwesomeIcon icon={faUser} />
        <p>{ email}</p>
        
      </div>
    </div>
  );
};

export default Topbar;