import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import Sidebar from './Sidebar/Sidebar';
import './PageLayout.css'
import Topbar from './TopBar/TobBar';



const PageLayout = () => {
  const [email, setEmail] = useState('');
  const usuario = JSON.parse(localStorage.getItem('user') || '');
  useEffect(()=>{
    setEmail(usuario.email)
  })
  
  return (
      <div className='user-content'>
       <Topbar email={email}/>
        <Sidebar />
        
        <div className='content' style={{ flex: 1 }}>
            <Outlet />
        </div>
      </div>)
};

export default PageLayout;