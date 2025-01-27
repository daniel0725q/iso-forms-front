import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tag } from "antd";
import { faPen, faTrash, faPlus, faFilePdf, faCopy, faEdit, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { Space, Table } from 'antd'
const { REACT_APP_API_ENDPOINT } = process.env;

const PaymentsDashboard = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const [formTemplates, setFormTemplates] = useState([]);
    const [myForms, setMyForms] = useState([]);
    const [reloadMyForms, setReloadMyForms] = useState(0);
    const [reloadFormTemplates, setReloadFormTemplates] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
    useEffect(() => {
        fetch(`${REACT_APP_API_ENDPOINT}/payments`, {
            method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            console.log(r);
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Formulario',
            dataIndex: 'formTemplateId',
            key: 'formTemplateId',
        },
        {
            title: 'Pagos',
            dataIndex: 'paymentId',
            key: 'paymentId',
        },
        {
            title: 'Id de la compañía',
            dataIndex: 'companyId',
            key: 'companyId',
        },
        {
            title: 'Pago',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Fecha de creación',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Aplicado',
            dataIndex: 'applied',
            key: 'applied',
            sorter: (a: any, b: any) => a == b ? 0 : a ? 1 : -1,
            render : (text: any) => {
                if (text) {
                    return <Tag color="green">Aplicado</Tag>
                } else {
                    return <Tag color="red">No aplicado</Tag>
                }
            }
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_: any, record: any) => (
              <Space size="middle">
                <Link to={`#`}><FontAwesomeIcon icon={faPlus} /></Link>
              </Space>
            ),
          },
    ];
    
    return (
        <div style={{textAlign: 'center', alignContent: 'center'}}>
            <h1>Pagos</h1>
            <div>
            <i>Todos los pagos disponibles</i>
            <Table dataSource={formTemplates}
            columns={columns}
            className="custom-table"
            pagination={{ pageSize: 10 }} />
            </div>
            {/* Botón flotante */}
        </div>
    )
}

export default PaymentsDashboard;