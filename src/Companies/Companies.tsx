import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Companies.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import EditCompany from '../EditCompany/EditCompany'

const Companies = () => {
  const navigate = useNavigate()

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [data, setData] = useState([]);
  const [companyId, setCompanyId] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [companySocialName, setCompanySocialName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [show, setShow] =  useState(false);
  const [reload, setReload] = useState(true);

  useEffect(() => loadCompanies);

  const loadCompanies = () => {
    if (reload) {
        fetch(`http://localhost:8080/api/v1/companies`, {
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
            console.log(r2);
            setData(r2);
            console.log(data);
            setReload(false);
        });
    }
  }

  const columns = [
    {
        Header: 'NIT',  
        accessor: 'id'  
    },
    {  
        Header: 'Nombre',  
        accessor: 'name'  
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

  const onEditClick = (id: number, name: string, socialName: string, logo: string) => {
    setCompanyId(id);
    setCompanyName(name);
    setCompanySocialName(socialName);
    setCompanyLogo(logo);
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
                <FontAwesomeIcon icon={faPen} onClick={() => {
                    onEditClick(row['id'], row['name'], row['socialName'], row['logo']
                    );
                }
                }/>
                &nbsp;
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
        <h1>Empresas</h1>
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
        {show ?
        <EditCompany id={companyId} setShow={setShow} companyName={companyName} companySocialName={companySocialName} companyLogo={companyLogo} show={show} reload={loadCompanies}  />
    : <div></div>
    }
    </div>
  )
}

export default Companies;