import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateOrEditCompany from '../EditCompany/CreateOrEditCompany'
import { randomUUID } from 'crypto'
import './FormsDashboard.css'

const FormsDashboard = () => {
  const navigate = useNavigate()

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  /*
  const [data, setData] = useState([]);
  const [show, setShow] =  useState(false);
  const [reload, setReload] = useState(true);
  const [isCreate, setIsCreate] = useState(true);

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

  const onCreateClick = () => {
    setIsCreate(true);
    setShow(true);
  }

  const onEditClick = (id: number, name: string, socialName: string, logo: string) => {
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
  */

  var myData: any = {
    "title": "Mi primer formulario",
    "description": "Breve descripcion del formulario",
    "version": "1.0",
    "type": "form",
    "section": [
        {
            "title": "Primera sección",
            "type": "section",
            "fields": [
                {
                    "id": "nombre",
                    "description": "Descripción del campo",
                    "type": "text",
                    "value": "Valor por defecto"
                },
                {
                    "id": "pais",
                    "description": "País en el que nació el usuario",
                    "type": "select",
                    "options": [
                        {
                            "value": "Andorra",
                            "type": "option"
                        },
                        {
                            "value": "España",
                            "type": "option"
                        },
                        {
                            "value": "Colombia",
                            "type": "option"
                        }
                    ]
                },
                {
                    "id": "tipoDeCafe",
                    "description": "Tipo de café que toma el usuario",
                    "type": "checkbox",
                    "options": [
                        {
                            "value": "Espresso",
                            "type": "checkbox-option"
                        },
                        {
                            "value": "Latte",
                            "type": "checkbox-option"
                        },
                        {
                            "value": "Flat white",
                            "type": "checkbox-option"
                        }
                    ]
                },
                {
                    "id": "genero",
                    "description": "Género con que se identifica el usuario",
                    "type": "radio",
                    "options": [
                        {
                            "value": "Masculino",
                            "type": "radio-item"
                        },
                        {
                            "value": "Femenino",
                            "type": "radio-item"
                        },
                        {
                            "value": "No binario",
                            "type": "radio-item"
                        }
                    ]
                },
                {
                    "id": "historia",
                    "description": "Historia de vida del usuario",
                    "type": "textarea"
                }
            ]
        },
        {
            "title": "Segunda sección",
            "fields": [
                {
                    "id": "tabla1",
                    "description": "Descripción del campo",
                    "type": "table",
                    "rows": 10,
                    "columns": 3,
                    "columnsHeader": [
                        "Nombre",
                        "Edad",
                        "País favorito"
                    ],
                    "columnsType": [
                        {
                            "type":"text"
                        },
                        {
                            "type": "number"
                        },
                        {
                            "type": "select",
                            "options": [
                                {
                                    "value": "Andorra",
                                    "type": "option"
                                },
                                {
                                    "value": "España",
                                    "type": "option",
                                    "selected": true
                                },
                                {
                                    "value": "Colombia",
                                    "type": "option"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "pais",
                    "description": "País en el que nació el usuario",
                    "type": "select",
                    "options": [
                        {
                            "value": "Andorra",
                            "type": "option"
                        },
                        {
                            "value": "España",
                            "type": "option"
                        },
                        {
                            "value": "Colombia",
                            "type": "option"
                        }
                    ]
                },
                {
                    "id": "tipoDeCafe",
                    "description": "Tipo de café que toma el usuario",
                    "type": "checkbox",
                    "options": [
                        {
                            "value": "Espresso",
                            "type": "checkbox-option",
                            "isChecked": true
                        },
                        {
                            "value": "Latte",
                            "type": "checkbox-option"
                        },
                        {
                            "value": "Flat white",
                            "type": "checkbox-option"
                        }
                    ]
                },
                {
                    "id": "genero",
                    "description": "Género con que se identifica el usuario",
                    "type": "radio",
                    "options": [
                        {
                            "value": "Masculino",
                            "type": "radio-item",
                            "checked": true
                        },
                        {
                            "value": "Femenino",
                            "type": "radio-item"
                        },
                        {
                            "value": "No binario",
                            "type": "radio-item"
                        }
                    ]
                },
                {
                    "id": "historia",
                    "description": "Historia de vida del usuario",
                    "type": "textarea",
                    "value": "Default value"
                }
            ]
        }
    ]
};

var c = 0;

const parse = (data: any): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            var value = data[key];

            switch (key) {
                case 'title':
                    elements.push(<h1 key="title">{value}</h1>);
                    break;
                case 'description':
                    elements.push(<p key="mainDesc">{value}</p>);
                    break;
                case 'section':
                    elements.push(
                        <section key={window.crypto.randomUUID()}>
                            {value.map((el: any) => (
                                <div key={window.crypto.randomUUID()}>
                                    {parse(el)}
                                </div>
                            ))}
                        </section>
                    );
                    break;
                case 'version':
                    elements.push(<input key={window.crypto.randomUUID()} type="text" value={value} readOnly />);
                    break;
                case 'fields':
                    elements.push(value.map((el: any) => (
                        <div key={window.crypto.randomUUID()}>
                            {parse(el)}
                        </div>
                    )));
                    break;
                case 'type':
                    if (value === 'checkbox') {
                        elements.push(
                            <div key={window.crypto.randomUUID()}>
                                {data.options.map((el: any) => (
                                    <label key={window.crypto.randomUUID()}>
                                        <input type="checkbox" key={window.crypto.randomUUID()} value={el.value} defaultChecked={el.checked} onChange={(ev) => {
                                            el.checked = ev.currentTarget.checked
                                            }} />
                                        {el.value}
                                    </label>
                                ))}
                            </div>
                        );
                    } else if (['text', 'number'].includes(value)) {
                        elements.push(<input type={value} key={window.crypto.randomUUID()} defaultValue={data.value} onChange={(ev) => {
                            data.value = ev.currentTarget.value;
                        }} />);
                    } else if (value == 'textarea') {
                        elements.push(<textarea key={window.crypto.randomUUID()} defaultValue={data.value} onChange={(ev) => {
                            data[value] = ev.currentTarget.value;
                        }}></textarea>)
                    } else if (value === 'radio') {
                        const radioId = window.crypto.randomUUID();
                        elements.push(
                            <div key={radioId}>
                                {data.options.map((el: any) => {
                                    let id = window.crypto.randomUUID();
                                    return (
                                    <label key={window.crypto.randomUUID()}>
                                        <input type="radio" key={id} id={id} name={radioId} checked={el.checked} onChange={(ev) => {
                                            // TODO
                                        }} />
                                        {el.value}
                                    </label>
                                )})
                            }
                            </div>
                        );
                    } else if (value === 'select') {
                        elements.push(
                            <select key={window.crypto.randomUUID()} value={data[key].value} onChange={(ev) => {
                                    data.options.find((x: any) => x.value == ev.target.value).selected = true;
                                    var elems = data.options.filter((x: any) => x.value != ev.target.value);
                                    elems.forEach((element: any) => {
                                        element.selected = false;
                                    });
                                    }}>
                                {data.options.map((el: any) => (
                                    <option key={window.crypto.randomUUID()}>{el.value}</option>
                                ))}
                            </select>
                        );
                    } else if (value === 'table') {
                        elements.push(
                            <table className='customTable' key={window.crypto.randomUUID()}>
                                <thead>
                                    <tr>
                                        {data.columnsHeader.map((col: any) => (
                                            <th key={window.crypto.randomUUID()}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Assuming createRows function is defined elsewhere */}
                                    {createRows(data.rows, data.columns, data.columnsType)}
                                </tbody>
                            </table>
                        );
                    }
                    break;
                default:
                    break;
            }
        }
    }

    return elements;
};


const createRows = (num: number, cols: number, columnsType: any) => {
    let par = [];
    for (var i = 0; i < num; i++) {
        par.push(<tr key={window.crypto.randomUUID()}>{createCols(cols, columnsType)}</tr>)
    }
    return par;
}

const createCols = (cols: number, types: any) => {
    let par = [];
    for (var i = 0; i < cols; i++) {
        par.push(<td key={window.crypto.randomUUID()}>
            {parse(types[i])}
        </td>)
    }
    return par;
}

  return (
    <div className='main'>
        <h1>Formularios</h1>
        <div className='forms'>
            {parse(myData)}
        </div>
        <button onClick={() => {
            console.log(myData);
        }}>Click me!</button>
    </div>
  )
}

export default FormsDashboard;