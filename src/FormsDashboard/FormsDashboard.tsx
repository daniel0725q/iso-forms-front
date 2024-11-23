import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus, faFilePdf, faCopy, faEdit, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import './FormsDashboard.css'
import { Space, Table } from 'antd'
const { REACT_APP_API_ENDPOINT } = process.env;

const FormsDashboard = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [formTemplates, setFormTemplates] = useState([]);
    const [myForms, setMyForms] = useState([]);
    const [reloadMyForms, setReloadMyForms] = useState(0);
    const [reloadFormTemplates, setReloadFormTemplates] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

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
    }, [reloadFormTemplates])

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

    const deleteFormTemplate = (id: number) => {
        fetch(`${REACT_APP_API_ENDPOINT}/form-templates/${id}`, {
            method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            setReloadFormTemplates(reloadFormTemplates + 1);
        })
    }

    useEffect(() => {
        loadUser()
    }, [])

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

    // Función para generar filtros dinámicos
    const getTypeFilters = () => {
        const codes = Array.from(new Set(formTemplates.map((item: any) => item.code)));
        console.log(codes);
        return codes.map((code) => ({ text: code, value: code }));
    };

    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: any, b: any) => a.title.localeCompare(b.title)
        },
        {
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
            sorter: (a: any, b: any) => a.code.localeCompare(b.code)
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
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
                <Link to={`/forms/${record.id}`}><FontAwesomeIcon icon={faClockRotateLeft} /></Link>
                { isAdmin && (
                <Link to={`/forms/${record.id}/edit`}><FontAwesomeIcon icon={faEdit} /></Link>
                )}
                { isAdmin && (
                <Link to={`/forms/${record.id}/copy`}><FontAwesomeIcon icon={faCopy} /></Link>
                )}
                { isAdmin && (
                <Link to={`#`} onClick={() => {
                    if (window.confirm("¿Seguro que deseas eliminar el formulario?")) {
                        deleteFormTemplate(record.id);
                    }
                }}><FontAwesomeIcon icon={faTrash} /></Link>
                )}
              </Space>
            ),
          },
    ];
    
    return (
        <div>
            <h1>Formatos</h1>
            <div style={{width: '60%', marginLeft: '20%'}}>
            <i>Todos los formatos disponibles</i>
            <Table dataSource={formTemplates}
            columns={columns}
            className="custom-table"
            pagination={{ pageSize: 10 }} />
            </div>
            {/* Botón flotante */}
            <Link to="/form-generator" className="floating-button">
                <FontAwesomeIcon icon={faPlus} />
                <span className="floating-button-text">Añadir nuevo formulario</span>
            </Link>
        </div>
    )
}

export default FormsDashboard;