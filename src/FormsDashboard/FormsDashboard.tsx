import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateOrEditCompany from '../EditCompany/CreateOrEditCompany'
import { randomUUID } from 'crypto'

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

  const data: any = {
    "title": "Mi primer formulario",
    "description": "Breve descripcion del formulario",
    "version": 1.0,
    "type": "form",
    "section": [
        {
            "title": "Primera sección",
            "type": "section",
            "fields": [
                {
                    "id": "nombre",
                    "description": "Descripción del campo",
                    "type": "textfield"
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
                    "type": "checkbox",
                    "options": [
                        {
                            "value": "Masculino",
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
                        "Apellidos",
                        "Edad"
                    ],
                    "columnsType": [
                        {
                            "type":"textfield"
                        },
                        {
                            "type": "number"
                        },
                        {
                            "type": "select",
                            "options": [
                                "Opción 1",
                                "Opción 2",
                                "Opción 3"
                            ]
                        }
                    ]
                },
                {
                    "id": "pais",
                    "description": "País en el que nació el usuario",
                    "type": "select",
                    "options": [
                        "Andorra",
                        "España",
                        "Colombia"
                    ]
                },
                {
                    "id": "tipoDeCafe",
                    "description": "Tipo de café que toma el usuario",
                    "type": "checkbox",
                    "options": [
                        "Espresso",
                        "Latte",
                        "Flat white"
                    ]
                },
                {
                    "id": "genero",
                    "description": "Género con que se identifica el usuario",
                    "type": "radio",
                    "options": [
                        "Hombre",
                        "Mujer",
                        "No binario"
                    ]
                },
                {
                    "id": "historia",
                    "description": "Historia de vida del usuario",
                    "type": "textarea"
                }
            ]
        }
    ]
};

var c = 0;

  const parse = (array: any): Array<any> => {
    let par = [];
    for (var i in array) {
        // console.log(i);
        let obj = array[i];
        if (Array.isArray(obj)) {
            // console.log(obj.fields)
            if (i == "fields") {
                <section>
                    {obj.map((el) => {
                        return parse(el);
                    })}
                </section>
            } else if (i  == "section") {
                <section>
                    {obj.map((el) => {
                        return parse(el);
                    })}
                </section>
            }
            console.log(i);
            c++;
        } else {
            if (obj.type == "textfield") {
                par.push(<input type="textfield" key={window.crypto.randomUUID()}></input>);
            } else if (obj.type == "option") {
                par.push(<option key={window.crypto.randomUUID()}>{obj}</option>);
            } else if (obj.type  == "checkbox-option") {
                par.push(<input type="checkbox" key={window.crypto.randomUUID()}>{obj}</input>);
            } else if (obj.type  == "textarea") {
                par.push(<textarea key={window.crypto.randomUUID()}></textarea>)
            }
        }
    }
    return par;
  }

  return (
    <div>
        <h1>Empresas</h1>
        <div className='companies'>
            {parse(data)}
        </div>
    </div>
  )
}

export default FormsDashboard;