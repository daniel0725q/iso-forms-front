import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'antd';
import './Sidebar.css'
import Sider from 'antd/es/layout/Sider';

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
      {sessionStorageUser ? (
        <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="home" className={isHomeActive ? 'active' : ''}>
            <Link to="/home" onClick={onHomeLinkClick}>
              Inicio
            </Link>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item key="companies" className={isAboutActive ? 'active' : ''}>
              <Link to="/companies" onClick={onCompaniesLinkClick}>
                Empresas
              </Link>
            </Menu.Item>
          )}
          {isAdmin && (
            <Menu.Item key="users" className={isNewsActive ? 'active' : ''}>
              <Link to="/users" onClick={onUsersLinkClick}>
                Usuarios
              </Link>
            </Menu.Item>
          )}
          <Menu.Item key="forms" className={isContactActive ? 'active' : ''}>
            <Link to="/forms" onClick={onFormsLinkClick}>
              Formularios
            </Link>
          </Menu.Item>
          <Menu.Item key="changePassword" className="changePassword">
            <Link to="/change-password">Cambiar contraseña</Link>
          </Menu.Item>
          <Menu.Item key="signout" className="signout">
            <Link to="/login" onClick={onButtonClick}>
              Cerrar sesión
            </Link>
          </Menu.Item>
        </Menu>
        </Sider>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Sidebar;