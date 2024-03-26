import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Companies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateOrEditCompany from '../EditCompany/CreateOrEditCompany'
import { Table } from 'antd'

const Companies = () => {
  const navigate = useNavigate()

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [data, setData] = useState([]);
  const [companyId, setCompanyId] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [companySocialName, setCompanySocialName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [show, setShow] =  useState(false);
  const [isCreate, setIsCreate] = useState(true);

  useEffect(() => loadCompanies(), []);

  const loadCompanies = () => {
    fetch(`http://localhost:8080/api/v1/companies?hasLogo=true`, {
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
    });
  }

  const columns = [
    {
        title: 'NIT',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Razón social',
        dataIndex: 'socialName',
        key: 'socialBane'
    },
    {
        title: 'Logo',
        dataIndex: 'logo',
        key: 'logo',
        render: (_: any, record: any) => (
            <img height={30} width={30} src={record.logo}></img>
        )
    },
    {
        title: 'Acciones',
        key: 'action',
        render: (_: any, record: any) => (
            <div>
                <Link to={`#`}><FontAwesomeIcon icon={faPen} onClick={() => {
                onEditClick(record.id, record.name, record.socialName, record.logo
                )}}></FontAwesomeIcon></Link>
            <Link to={`#`}><FontAwesomeIcon icon={faTrash} onClick={() => {
                onDeleteClick(record.id);
            }} /></Link>
            </div>
        ),
      },
  ];

  const onCreateClick = () => {
    setCompanyId(0);
    setCompanyName('');
    setCompanySocialName('');
    setCompanyLogo('');
    setIsCreate(true);
    setShow(true);
  }

  const onEditClick = (id: number, name: string, socialName: string, logo: string) => {
    setCompanyId(id);
    setCompanyName(name);
    setCompanySocialName(socialName);
    setCompanyLogo(logo);
    setIsCreate(false);
    setShow(true);
  }

  const onDeleteClick = (id: number) => {
    if (window.confirm('¿Estás seguro que deseas eliminar la empresa?')) {
        fetch(`http://localhost:8080/api/v1/companies/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            loadCompanies();
        });
    }
  }

  return (
    <div>
        <h1>Empresas</h1>
        <div className='companies'>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false} // Disable pagination if not needed
                className="customTable" // Add custom class for additional styling
                />
        </div>
        <Link to={'#'} className='link' onClick={onCreateClick}>
            <FontAwesomeIcon icon={faPlus} size='2x' />
            <b className='linkDesc'>Nueva empresa</b>
        </Link>
        {show ?
        <CreateOrEditCompany id={companyId} setShow={setShow} companyName={companyName} companySocialName={companySocialName} companyLogo={companyLogo} show={show} reload={loadCompanies} isCreate={isCreate}  />
    : <div></div>
    }
    </div>
  )
}

export default Companies;