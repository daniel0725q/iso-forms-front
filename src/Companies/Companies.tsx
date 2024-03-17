import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Companies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

const Companies = () => {
  const navigate = useNavigate()

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [data, setData] = useState([]);

  useEffect(() => loadUser);

  const loadUser = () => {
    fetch(`http://localhost:8080/api/v1/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorageUser.token}`
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setData(r);
      })
  }

  const columns = [
    {  
        Header: 'Nombre',  
        accessor: 'name'  
    },
    {
        Header: 'NIT',  
        accessor: 'id'  
    },
    {
        Header: 'Razón social',
        accessor: 'socialName'  
    },
    {  
        Header: 'Logo',  
        accessor: 'logo'  
    }
  ];

  const onButtonClick = () => {
  }

  let userElements = columns.map(function(column) {
    return <th>{column.Header}</th>;
  });

  let tableElements = data.map(function(row) {
    return <tr>
        {
            columns.map(function(column) {
                return <td>{
                    column.accessor != "logo" ?
                    row[column.accessor]
                    : <img className='logo' src={row["logo"]}></img>
                    }</td>;
              })
        }
            <td>
                <FontAwesomeIcon icon={faPen} />
                &nbsp;
                <FontAwesomeIcon icon={faTrash} />
            </td>
        </tr>
  }
  )

  return (
    <div>
        <h1>Empresas</h1>
        <div className='companies'>
            <table>
                <thead>
                    { userElements }
                    <th>Opciones</th>
                </thead>
                <tbody>
                    { tableElements }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Companies;