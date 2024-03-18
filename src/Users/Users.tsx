import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateUser from '../CreateUser/CreateUser'

const Users = () => {
  const navigate = useNavigate()

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [data, setData] = useState([]);
  const [show, setShow] =  useState(false);
  const [reload, setReload] = useState(true);
  const [isCreate, setIsCreate] = useState(true);

  useEffect(() => loadUsers);

  const loadUsers = () => {
    if (reload) {
        fetch(`http://localhost:8080/api/v1/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            const r2 = r.sort((e1: any, e2: any) => {
                if (e1.id > e2.id) return 1;
                else if (e1.id == e2.id) return 0;
                else return -1;
            });
            setData(r2);
            setReload(false);
        });
    }
  }

  const columns = [
    {
        Header: 'ID',  
        accessor: 'id'  
    },
    {  
        Header: 'Email',  
        accessor: 'email'  
    },
    {
        Header: 'Compañía',
        accessor: 'companyId'  
    }
  ];

  const onCreateClick = () => {
    setShow(true);
  }

  const onDeleteClick = (id: number) => {
    if (window.confirm('¿Estás seguro que deseas eliminar el usuario?')) {
        fetch(`http://localhost:8080/api/v1/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            loadUsers();
        });
    }
  }

  let userElements = columns.map(function(column) {
    return <th>{column.Header}</th>;
  });

  let tableElements = data.map(function(row) {
    return <tr>
        {
            columns.map(function(column) {
                return <td>{
                    row[column.accessor]
                    }</td>;
              })
        }
            <td>
                <FontAwesomeIcon icon={faTrash}onClick={() => {
                    onDeleteClick(row['id']);
                }
            }/>
            </td>
        </tr>
  }
  )

  return (
    <div>
        <h1>Usuarios</h1>
        <div className='companies'>
            <table>
                <thead>
                    <tr>
                        { userElements }
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    { tableElements }
                </tbody>
            </table>
        </div>
        <Link to={'#'} className='link' onClick={onCreateClick}>
            <FontAwesomeIcon icon={faPlus} size='2x' />
            <b className='linkDesc'>Nuevo usuario</b>
        </Link>
        {show ?
        <CreateUser setShow={setShow} show={show}  />
    : <div></div>
    }
    </div>
  )
}

export default Users;