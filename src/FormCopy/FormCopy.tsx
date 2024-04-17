import { Button, Input, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT } = process.env;

function FormCopy() {

  const [title, setTitle] = useState<string>('');
  const [version, setVersion] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<number>(1);

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const navigate = useNavigate();
  let { id } = useParams();

  const [formData, setFormData] = useState<any>({
    title: title,
    version: version,
    code: code,
    type: type,
    id: id
  });

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/form-templates/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorageUser.token}`
      }
    })
    .then(r => r.json())
    .then(r => {
      setTitle(r.title);
      setVersion(r.version);
      setCode(r.code);
      setType(r.type);
    });
  }, [])

  const generateJSON = () => {
    formData.title = title;
    formData.version = version;
    formData.code = code;
    formData.type = type;
    createFormTemplate();
  }

  const createFormTemplate = () => {
    if (formData.title == '') {
      alert('Ingrese un título')
      return
    }
    if (formData.version == '') {
      alert('Ingrese una versión')
      return
    }
    if (formData.code == '') {
      alert('Ingrese un código')
      return
    }
    fetch(`${REACT_APP_API_ENDPOINT}/form-templates/${id}/copy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorageUser.token}`
      },
      body: JSON.stringify({
        id: id,
        title: formData.title,
        version: formData.version,
        code: formData.code,
        type: formData.type,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        navigate('/forms')
      })
    }

  return (
        <div style={{textAlign: 'center'}}>
          <h1>Copiar formulario</h1>
          <div style={{width: '20%', marginLeft: '40%'}}>
            <label>Título:</label>
            <Input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label>Versión:</label>
            <Input
                type="text"
                name="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
            />
            <br />
            <label>Código:</label>
            <Input
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <br />
            <label>Tipo:</label>
            <Select
                value={type}
                onChange={(value) => setType(value)}
            >
                <Option value="1">ISO</Option>
                <Option value="2">SST</Option>
                <Option value="3">Documentación</Option>
                <Option value="4">Mapa de Procesos</Option>
                <Option value="5">Políticas</Option>
                <Option value="6">Normas/Leyes</Option>
                <Option value="7">Matriz de Riesgos</Option>
                <Option value="8">Auditoría</Option>
                <Option value="9">Evaluación de Desempeño</Option>
            </Select>
            <br />
            <Button onClick={generateJSON} type="primary" style={{marginTop: '10px'}}>Guardar formulario</Button>
            </div>
        </div>
      );
    }


export default FormCopy;
