import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import './MiscDashboard.css'
import { Space, Table } from 'antd'
const { REACT_APP_API_ENDPOINT } = process.env;

const MiscFormsDashboard = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [myForms, setMyForms] = useState([]);
    const [reloadMyForms, setReloadMyForms] = useState(0);

    const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');

    useEffect(() => {
        fetch(`${REACT_APP_API_ENDPOINT}/forms/company/all`, {
            method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            setMyForms(r);
        })
    }, [reloadMyForms])

    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
        },
        {
          title: 'Tipo',
          dataIndex: 'type',
          key: 'type',
          filters: [
              {
                  text: 'ISO',
                  value: '1',
              },
              {
                  text: 'SST',
                  value: '2',
              },
              {
                  text: 'Documentación',
                  value: '3',
              },
              {
                  text: 'Mapa de procesos',
                  value: '4',
              },
              {
                  text: 'Políticas',
                  value: '5',
              },
              {
                  text: 'Normas/Leyes',
                  value: '6',
              },
              {
                  text: 'Matriz de riesgos',
                  value: '7',
              },
              {
                  text: 'Auditoría',
                  value: '8',
              },
              {
                  text: 'Evaluación de desempeño',
                  value: '9',
              }
          ],
          defaultFilteredValue: [], // Eliminé el valor predeterminado para que el filtro esté vacío por defecto
          onFilter: (value: any, record: any) => record && record.type && record.type == value,
      },
        {
            title: 'Versión',
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_: any, record: any) => (
              <Space size="middle">
                <Link to={`/forms/${record.id}`}><FontAwesomeIcon icon={faPlus} /></Link>
              </Space>
            ),
          },
    ];

    const myColumns = [
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
            render: (_: any, record: any) => (
                <p>{record.data.code}</p>
              ),
        },
        {
          title: 'Tipo',
          dataIndex: 'type',
          key: 'type',
          filters: [
              {
                  text: 'ISO',
                  value: '1',
              },
              {
                  text: 'SST',
                  value: '2',
              },
              {
                  text: 'Documentación',
                  value: '3',
              },
              {
                  text: 'Mapa de procesos',
                  value: '4',
              },
              {
                  text: 'Políticas',
                  value: '5',
              },
              {
                  text: 'Normas/Leyes',
                  value: '6',
              },
              {
                  text: 'Matriz de riesgos',
                  value: '7',
              },
              {
                  text: 'Auditoría',
                  value: '8',
              },
              {
                  text: 'Evaluación de desempeño',
                  value: '9',
              }
          ],
          defaultFilteredValue: [], // Eliminé el valor predeterminado para que el filtro esté vacío por defecto
          onFilter: (value: any, record: any) => record && record.type && record.type == value,
      },
        {
            title: 'Versión',
            dataIndex: 'version',
            key: 'version',
            render: (_: any, record: any) => (
                <p>{record.data.version}</p>
              ),
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_: any, record: any) => (
              <Space size="middle">
                <Link to={`/forms/preview/${record.id}`} onClick={() => {
                }}><FontAwesomeIcon icon={faFilePdf} onClick={() => {
                }} /></Link>
              </Space>
            ),
          },
    ];
    
    return (
        <div>
            <h1>Documentos varios</h1>
            <div style={{width: '60%', marginLeft: '20%'}}>
            <Table dataSource={myForms} columns={myColumns} className="custom-table" pagination={{ pageSize: 10 }} />
        </div>
        </div>
    )
}

export default MiscFormsDashboard;