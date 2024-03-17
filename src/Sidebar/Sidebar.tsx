import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faUser, faPenToSquare, faBuilding } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()

  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isNewsActive, setIsNewsActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);

  const onHomeLinkClick = () => {
    setIsHomeActive(true);
    setIsNewsActive(false);
    setIsContactActive(false);
    setIsAboutActive(false);
  }

  const onNewsLinkClick = () => {
    setIsHomeActive(false);
    setIsNewsActive(true);
    setIsContactActive(false);
    setIsAboutActive(false);
  }

  const onContactLinkClick = () => {
    setIsHomeActive(false);
    setIsNewsActive(false);
    setIsContactActive(true);
    setIsAboutActive(false);
  }

  const onAboutLinkClick = () => {
    setIsHomeActive(false);
    setIsNewsActive(false);
    setIsContactActive(false);
    setIsAboutActive(true);
  }

  const onButtonClick = () => {
    localStorage.removeItem('user')
    navigate("/login")
  }

  return (
    <div>
        {
            !!localStorage.getItem('user') ?
        <div className="sidebar">
            <Link className={isHomeActive ? "active" : ''} to="/" onClick={onHomeLinkClick}>Inicio</Link>
            <Link className={isNewsActive ? "active" : ''} to="/admin" onClick={onNewsLinkClick}>Usuarios</Link>
            <Link className={isContactActive ? "active" : ''} to="/contact" onClick={onContactLinkClick}>Formularios</Link>
            <Link className={isAboutActive ? "active" : ''} to="/about" onClick={onAboutLinkClick}>Empresas</Link>
            <Link className={'signout'} to="/login" onClick={onButtonClick}>Cerrar sesión</Link>
        </div>
        : <div></div>
        }
    </div>
  )
}

export default Sidebar