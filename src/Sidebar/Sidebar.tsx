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

  const onUsersLinkClick = () => {
    setIsHomeActive(false);
    setIsNewsActive(true);
    setIsContactActive(false);
    setIsAboutActive(false);
  }

  const onFormsLinkClick = () => {
    setIsHomeActive(false);
    setIsNewsActive(false);
    setIsContactActive(true);
    setIsAboutActive(false);
  }

  const onCompaniesLinkClick = () => {
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
            <Link className={isNewsActive ? "active" : ''} to="/admin" onClick={onUsersLinkClick}>Usuarios</Link>
            <Link className={isContactActive ? "active" : ''} to="/contact" onClick={onFormsLinkClick}>Formularios</Link>
            <Link className={isAboutActive ? "active" : ''} to="/companies" onClick={onCompaniesLinkClick}>Empresas</Link>
            <Link className={'changePassword'} to="/change-password">Cambiar contraseña</Link>
            <Link className={'signout'} to="/login" onClick={onButtonClick}>Cerrar sesión</Link>
        </div>
        : <div></div>
        }
    </div>
  )
}

export default Sidebar