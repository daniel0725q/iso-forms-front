import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import CreateOrEditCompany from '../EditCompany/CreateOrEditCompany'
import { randomUUID } from 'crypto'
import './FormsDashboard.css'

const FormsDashboard = () => {
    const navigate = useNavigate();

    const [formTemplates, setFormTemplates] = useState([]);
    const [myForms, setMyForms] = useState([]);
    const [reloadMyForms, setReloadMyForms] = useState(0);

    const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/form-templates", {
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
        fetch("http://localhost:8080/api/v1/forms/mine/all", {
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
        fetch(`http://localhost:8080/api/v1/forms/${id}`, {
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
    
    return (
        <div>
            <h1>Formularios</h1>
            <i>Todos los formularios disponibles</i>
            <table className='customTable'>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Código</th>
                        <th>Tipo</th>
                        <th>Versión</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    { formTemplates.map((row: any) => <tr>
                        <td>{row.title}</td>
                        <td>{row.code}</td>
                        <td>{row.type}</td>
                        <td>{row.version}</td>
                        <td>
                            <Link to={`/forms/${row.id}`}><FontAwesomeIcon icon={faPlus} /></Link>
                        </td>
                    </tr>) }
                </tbody>
            </table>

            <i>Mis formularios</i>
            <table className='customTable'>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Versión</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    { myForms.map((form: any) => <tr>
                        <td>{form.formTemplate.code}</td>
                        <td>{form.formTemplate.version}</td>
                        <td>
                            <Link to={`/forms/edit/${form.id}`}><FontAwesomeIcon icon={faPen} /></Link>
                            &nbsp;
                            <Link to={`#`}><FontAwesomeIcon icon={faTrash} onClick={() => {
                                if (window.confirm("¿Seguro que deseas eliminar el formulario?")) {
                                    deleteForm(form.id);
                                }
                            }} /></Link>
                            &nbsp;
                            <Link to={`/forms/preview/${form.id}`} onClick={() => {
                            }}><FontAwesomeIcon icon={faFilePdf} onClick={() => {
                            }} /></Link>
                        </td>
                    </tr>) }
                </tbody>
            </table>
        </div>
    )
}

export default FormsDashboard;