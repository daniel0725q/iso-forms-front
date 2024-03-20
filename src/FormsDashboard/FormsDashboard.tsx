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
        }
    ]
};

var c = 0;

  const parse = (array: any): Array<any> => {
    let par = [];
    for (var i in array) {
        let obj = array[i];
        if(i == "title") {
            par.push(<h1 key="title">{obj}</h1>);
        } else if (i == "description") {
            par.push(<p key="mainDesc">{obj}</p>)
        } else if (i == "section") {
            par.push(
                <section key={window.crypto.randomUUID()}>
                    {
                        par.push(
                            obj.map((el: any) => {
                            return parse(el)
                            })
                        )
                    }
                </section>
            );
        } else if (i == "version") {
            par.push(<input key={window.crypto.randomUUID()} type="text" value={obj} readOnly></input>)
        } else if (i == "fields") {
            par.push(obj.map((el: any) => {
                return parse(el)}));
        } else if (i == "type" && obj == "checkbox") {
            par.push(
                <div key={window.crypto.randomUUID()}>
                    {array.options.map((el: any) => {
                        return <label key={window.crypto.randomUUID()}><input type='checkbox' value={el.value}/>{ el.value }</label>
                    })}
                </div>
            )
        } else if (i == "type" && obj == "textfield") {
            par.push(<input type="textfield" key={window.crypto.randomUUID()}></input>);
        } else if (i == "type" && obj == "number") {
            par.push(<input type="number" key={window.crypto.randomUUID()}></input>);
        } else if (i == "type" && obj == "radio") {
            const id = window.crypto.randomUUID();
            par.push(
                <div key={id}>
                    {array.options.map((el: any) => {
                        return <label><input type="radio" id="dewey" name={id} />
                        {el.value}</label>
                    })}
                </div>
            )
        } else if (i == "type" && obj == "select") {
            par.push(<select id={window.crypto.randomUUID()} key={window.crypto.randomUUID()}>
                {array.options.map((el: any) => {
                    return <option key={window.crypto.randomUUID()}>{el.value}</option>
                })}
            </select>);
        } else if (i == "type" && obj == "textarea") {
            par.push(<textarea key={window.crypto.randomUUID()}></textarea>)
        } else if (i == "type" && obj == "table") {
            par.push(<table key={window.crypto.randomUUID()}>
                <thead>
                        <tr>
                {array.columnsHeader.map((col: any) => {
                    return <th>{col}</th>
                })}
                </tr>
                </thead>
                <tbody>
                    {createRows(array.rows, array.columns, array.columnsType)}
                </tbody>
            </table>)
        }
    }
    return par;
  }

const createRows = (num: number, cols: number, columnsType: any) => {
    let par = [];
    for (var i = 0; i < num; i++) {
        par.push(<tr>{createCols(cols, columnsType)}</tr>)
    }
    console.log(par);
    return par;
}

const createCols = (cols: number, types: any) => {
    let par = [];
    for (var i = 0; i < cols; i++) {
        par.push(<td>
            {parse(types[i])}
        </td>)
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