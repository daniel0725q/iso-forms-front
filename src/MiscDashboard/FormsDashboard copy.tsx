import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import CreateOrEditCompany from '../EditCompany/CreateOrEditCompany'
import { randomUUID } from 'crypto'
import './FormsDashboard.css'

const FormsDashboardTest = () => {
  const navigate = useNavigate()

  const [images, setImages] = useState<any[string]>([])

  const imageRef: any = useRef([]);

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
    "title": "My first form",
    "description": "Short form description",
    "version": "1",
    "type": "form",
    "sections": [
        {
            "title": "First section",
            "type": "section",
            "fields": [
                {
                    "id": "name",
                    "description": "Field description",
                    "type": "img"
                },
                {
                    "id": "story",
                    "description": "User's life story",
                    "type": "textarea"
                },
                {
                    "id": "my-list",
                    "description": "Test list",
                    "type": "ul",
                    "values": [
                        "First element",
                        "Second element",
                        "Third element"
                    ]
                }
            ]
        },
        {
            "title": "Second section",
            "fields": [
                {
                    "id": "table-1",
                    "description": "Field description",
                    "type": "table",
                    "rows": 10,
                    "columns": 3,
                    "columnsHeader": [
                        "Name",
                        "Age"
                    ],
                    "columnsType": [
                        {
                            "type":"img"
                        },
                        {
                            "type": "number"
                        }
                    ]
                },
                {
                    "id": "story-son",
                    "description": "Son's story",
                    "type": "textarea",
                },
                {
                    "id": "list-2",
                    "description": "Test list",
                    "type": "ol",
                    "values": [
                        "First element",
                        "Second element",
                        "Third element"
                    ]
                }
            ]
        }
    ]
};

var c = 0;

const fileToBase64 = (file: File, callback: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64String = reader.result;;
      callback(base64String);
    };
    reader.onerror = function (error) {
      console.error('Error converting file to base64:', error);
    };
  }

const handleFileChange = (e: ChangeEvent<HTMLInputElement>, id: string, data: any) => {
    if (e.target.files) {
        fileToBase64(e.target.files[0], (base64String: any) => {
        changeImageSrc(base64String, id);
        // data.value = base64String;
        });
      }
  };

  const changeImageSrc = (st: string, id: string) => {
    if (imageRef.current[id]) {
      imageRef.current[id].src = st;
    }
  };

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
                case 'sections':
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
                    /* if (value === 'checkbox') {
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
                    } else */
                    if (['text', 'number'].includes(value)) {
                        elements.push(<input type={value} key={window.crypto.randomUUID()} defaultValue={data.value} onChange={(ev) => {
                            data.value = ev.currentTarget.value;
                        }} />);
                    } else if (value == 'ul') {
                        elements.push(<ul>
                            {data.values.map((el: any) => {
                                return <li>{el}</li>
                            })
                            }
                        </ul>)
                    }else if (value == 'ol') {
                        elements.push(<ol>
                            {data.values.map((el: any) => {
                                return <li>{el}</li>
                            })
                            }
                        </ol>)
                    } else if (value == 'textarea') {
                        elements.push(<textarea key={window.crypto.randomUUID()} defaultValue={data.value} onChange={(ev) => {
                            data[value] = ev.currentTarget.value;
                        }}></textarea>)
                    } else if (value == 'img') {
                        const imgId = window.crypto.randomUUID();
                        elements.push(<img className="form-image" src={images[imgId]} ref={(element) => imageRef.current[imgId] = element} id={imgId} key={imgId}></img>)
                        elements.push(<div>
                            <input type='file' accept="image/png, image/jpeg" onChange={(e) => {
                                handleFileChange(e, imgId, data)
                                }} />
                            </div>)
                    } /*else if (value === 'radio') {
                        const radioId = window.crypto.randomUUID();
                        elements.push(
                            <div key={radioId}>
                                {data.options.map((el: any) => {
                                    let id = window.crypto.randomUUID();
                                    return (
                                    <label key={window.crypto.randomUUID()}>
                                        <input type="radio" key={id} id={id} name={radioId} onChange={(ev) => {
                                            // TODO
                                            const radios = document.getElementsByName(radioId);
                                            radios.forEach((radio: any) => {
                                                radio.checked = false;
                                            });
                                            const radio: any = document.getElementById(id);
                                            radio.checked = true;
                                            var curr = data.options.find((e: any) => el.value == e.value)
                                            curr.checked = true;
                                        }} />
                                        {el.value}
                                    </label>
                                )})
                            }
                            </div>
                        );
                    } */
                    /* else if (value === 'select') {
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
                    } */
                    else if (value === 'table') {
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
        <h1>Formatos</h1>
        <div className='forms'>
            {parse(myData)}
        </div>
        <button onClick={() => {
            console.log(myData);
        }}>Click me!</button>
    </div>
  )
}

export default FormsDashboardTest;