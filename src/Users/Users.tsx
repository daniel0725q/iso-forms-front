import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateUser from '../CreateUser/CreateUser'
import './Users.css'
import { Table } from 'antd'

const Users = () => {
  const navigate = useNavigate()

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [data, setData] = useState([]);
  const [show, setShow] =  useState(false);
  const [reload, setReload] = useState(true);

  useEffect(() => loadUsers, []);

  const loadUsers = () => {
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

  const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Compañía',
        dataIndex: 'company',
        key: 'company',
        render: (_: any, record: any) => (
            <p>{record.company.name}</p>
          ),
    },
    {
        title: 'Rol',
        dataIndex: 'role',
        key: 'role',
        render: (_: any, record: any) => (
            <p>{record.role.name}</p>
          ),
    },
    {
        title: 'Acciones',
        key: 'action',
        render: (_: any, record: any) => (
            <Link to={`#`}><FontAwesomeIcon icon={faTrash} onClick={() => {
                onDeleteClick(record.id);
            }} /></Link>
        ),
      },
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

  return (
    <div>
        <h1>Usuarios</h1>
        <div className='companies' style={{width: '60%', marginLeft: '20%'}}>
        <Table
      dataSource={data}
      columns={columns}
      bordered
      className="customTable"
      pagination={{ pageSize: 10 }}
    />
    <Link to={'#'} className='link' onClick={onCreateClick}>
        <FontAwesomeIcon icon={faPlus} size='2x' />
        <b className='linkDesc'>Nuevo usuario</b>
    </Link>
        {show ?
        <CreateUser setShow={setShow} show={show} reloadUsers={loadUsers} />
    : <div></div>
    }
    </div>
    </div>
  )
}

export default Users;