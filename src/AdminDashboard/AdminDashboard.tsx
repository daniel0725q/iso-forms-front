import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faUser, faPenToSquare, faBuilding, faHelmetSafety, faGlobe } from '@fortawesome/free-solid-svg-icons'
import './AdminDashboard.css'
const { REACT_APP_API_ENDPOINT } = process.env;

const AdminDashboard = () => {
  const navigate = useNavigate()
  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [isAdmin, setIsAdmin] = useState(false);

  const onButtonClick = () => {
  }

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser = () => {
    fetch(`${REACT_APP_API_ENDPOINT}/auth/is-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: sessionStorageUser.token }),
    })
      .then((r) => r.json())
      .then((r) => {
        setIsAdmin(r.isAdmin);
      })
  }

  return (
    <div>
        {
            isAdmin ? (
                <div>
                    <h1>Administrador</h1>
                    <div className='row'>
                      <div className='category'>
                        <FontAwesomeIcon icon={faUser} size="10x" />
                        <h3>Usuarios</h3>
                      </div>
                      <div className='category'>
                        <FontAwesomeIcon icon={faPenToSquare} size="10x" />
                        <h3>Formatos</h3>
                      </div>
                      <div className='category'>
                        <FontAwesomeIcon icon={faBuilding} size="10x" />
                        <h3>Empresas</h3>
                      </div>
                      <div className='category'>
                        <FontAwesomeIcon icon={faGlobe} size="10x" />
                          <h3>ISO</h3>
                      </div>
                      <div className='category'>
                        <FontAwesomeIcon icon={faHelmetSafety} size="10x" />
                        <h3>SST</h3>
                      </div>
                    </div>
                </div>
            ) : (
                <h1>Error</h1>
            )
        }
    </div>
  )
}

export default AdminDashboard