import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'antd';
import './Sidebar.css'
import Sider from 'antd/es/layout/Sider';
const { REACT_APP_API_ENDPOINT } = process.env;

const Sidebar = () => {
  const navigate = useNavigate()
  var sessionStorageUser = localStorage.getItem('user');

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (sessionStorageUser) {
      const user = JSON.parse(sessionStorageUser);
      if (user.token) {
        fetch(`${REACT_APP_API_ENDPOINT}/auth/is-admin`, {
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

  const onButtonClick = () => {
    localStorage.removeItem('user')
    navigate("/login")
  }

  // <Link className={isNewsActive ? "active" : ''} to="/admin" onClick={onUsersLinkClick}>Administrador</Link>

  return (
    <div>
      {sessionStorageUser ? (
        <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="home">
            <Link to="/home">
              Inicio
            </Link>
          </Menu.Item>
          {isAdmin && (
            <Menu.Item key="companies">
              <Link to="/companies">
                Empresas
              </Link>
            </Menu.Item>
          )}
          {isAdmin && (
            <Menu.Item key="users">
              <Link to="/users">
                Usuarios
              </Link>
            </Menu.Item>
          )}
          <Menu.Item key="options">
            <Link to="/options">
              Opciones
            </Link>
          </Menu.Item>
          <Menu.Item key="miscellaneous documents">
            <Link to="/miscellaneous-documents">
              Documentos Varios
            </Link>
          </Menu.Item>
          <Menu.Item key="forms">
            <Link to="/forms">
              Formularios
            </Link>
          </Menu.Item>
          <Menu.Item key="my-forms">
            <Link to="/my-forms">
              Mis Documentos
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