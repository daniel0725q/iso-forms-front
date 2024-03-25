import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()
  var sessionStorageUser = localStorage.getItem('user');

  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isNewsActive, setIsNewsActive] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      if (user.token) {
        fetch(`http://localhost:8080/api/v1/auth/is-admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: user.token }),
        })
          .then((r) => r.json())
          .then((r) => {
            setIsAdmin(r.isAdmin);
          })
      }
    }
  }, [sessionStorageUser])

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

  // <Link className={isNewsActive ? "active" : ''} to="/admin" onClick={onUsersLinkClick}>Administrador</Link>

  return (
    <div>
        {
            !!sessionStorageUser ?
        <div className="sidebar">
            <Link className={isHomeActive ? "active" : ''} to="/home" onClick={onHomeLinkClick}>Inicio</Link>
            {isAdmin ? <Link className={isAboutActive ? "active" : ''} to="/companies" onClick={onCompaniesLinkClick}>Empresas</Link> : <></>}
            {isAdmin? <Link className={isNewsActive ? "active" : ''} to="/users" onClick={onUsersLinkClick}>Usuarios</Link> : <></>}
            <Link className={isContactActive ? "active" : ''} to="/forms" onClick={onFormsLinkClick}>Formularios</Link>
            <Link className={'changePassword'} to="/change-password">Cambiar contraseña</Link>
            <Link className={'signout'} to="/login" onClick={onButtonClick}>Cerrar sesión</Link>
        </div>
        : <div></div>
        }
    </div>
  )
}

export default Sidebar;