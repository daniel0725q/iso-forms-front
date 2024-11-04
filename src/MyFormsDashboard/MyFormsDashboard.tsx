import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import './MyFormsDashboard.css'
import { Space, Table } from 'antd'
import PaypalButton from '../Paypal/PaypalButton'
const { REACT_APP_API_ENDPOINT } = process.env;

const MyFormsDashboard = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [formTemplates, setFormTemplates] = useState([]);
    const [myForms, setMyForms] = useState([]);
    const [reloadMyForms, setReloadMyForms] = useState(0);

    const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
    useEffect(() => {
        fetch(`${REACT_APP_API_ENDPOINT}/form-templates`, {
            method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            setFormTemplates(r);
        })
    }, [])

    useEffect(() => {
        fetch(`${REACT_APP_API_ENDPOINT}/forms/mine/all`, {
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

    const deleteForm = (id: number) => {
        fetch(`${REACT_APP_API_ENDPOINT}/forms/${id}`, {
            method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            setReloadMyForms(reloadMyForms + 1);
        })
    }

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
            ],
            defaultFilteredValue: [searchParams.get('formId') || ''],
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
                <p>{record.formTemplate.code}</p>
              ),
        },
        {
            title: 'Versión',
            dataIndex: 'version',
            key: 'version',
            render: (_: any, record: any) => (
                <p>{record.formTemplate.version}</p>
              ),
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_: any, record: any) => (
              <Space size="middle">
                <Link to={`/forms/edit/${record.id}`}><FontAwesomeIcon icon={faPen} /></Link>
                <Link to={`#`}><FontAwesomeIcon icon={faTrash} onClick={() => {
                    if (window.confirm("¿Seguro que deseas eliminar el formulario?")) {
                        deleteForm(record.id);
                    }
                }} /></Link>
                <Link to={`/forms/preview/${record.id}`} onClick={() => {
                }}><FontAwesomeIcon icon={faFilePdf} onClick={() => {
                }} /></Link>
              </Space>
            ),
          },
    ];
    
    return (
        <div>
            <h1>Mis Documentos</h1>
            <div style={{width: '60%', marginLeft: '20%'}}>
            <Table dataSource={myForms} columns={myColumns} className="custom-table" pagination={{ pageSize: 10 }} />
        </div>
        <PaypalButton totalValue="10" invoice="Test" />
        </div>
    )

}

export default MyFormsDashboard;