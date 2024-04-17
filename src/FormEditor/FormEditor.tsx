import { Button, Input, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT } = process.env;

function FormEditor() {

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
    sections: []
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
      formData.sections = r.form.sections;
    });
  }, [])

  const addSection = () => {
    setFormData({
        title: title,
        version: version,
        code: code,
        type: type,
        sections: [...formData.sections, {}]
      })
  }

  const removeSection = (index: number) => {
    formData.sections.splice(index, 1)
    setFormData({
      title: title,
      version: version,
      code: code,
      type: type,
      sections: formData.sections
    })
  }

  const generateJSON = () => {
    formData.title = title;
    formData.version = version;
    formData.code = code;
    formData.type = type;
    formData.sections = [...formData.sections];
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
    fetch(`${REACT_APP_API_ENDPOINT}/form-templates/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorageUser.token}`
      },
      body: JSON.stringify({
        title: formData.title,
        version: formData.version,
        code: formData.code,
        type: formData.type,
        form: {
            sections: formData.sections
        }
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        navigate('/forms')
      })
    }

  return (
        <div style={{textAlign: 'center'}}>
          <h1>Editor de Formularios</h1>
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
            <h2>Secciones</h2>
            {formData.sections.map((section: any, index: any) => (
                <div key={index}>
                <h3>Sección {index + 1}</h3>
                <label>Id:</label>
                <Input
                    type="text"
                    value={section.id}
                    onChange={(e: any) => {
                      const sections = formData.sections;
                      sections[index].id = e.currentTarget.value;
                      setFormData({
                        title: formData.title,
                        version: formData.version,
                        code: formData.code,
                        type: formData.type,
                        sections: sections
                      })
                    }}
                />
                <br />
                <label>Nombre:</label>
                <Input
                    type="text"
                    value={section.name}
                    onChange={(e) => {
                      const sections = formData.sections;
                      sections[index].name = e.currentTarget.value;
                      setFormData({
                        title: formData.title,
                        version: formData.version,
                        code: formData.code,
                        type: formData.type,
                        sections: sections
                      })
                    }}
                />
                <br />
                <label>Botones:</label>
                <Input
                    type="text"
                    value={section.buttons}
                    onChange={(e) => {
                      const sections = formData.sections;
                      sections[index].buttons = e.currentTarget.value.split(',');
                      setFormData({
                        title: formData.title,
                        version: formData.version,
                        code: formData.code,
                        type: formData.type,
                        sections: sections
                      })
                    }}
                />
                <button onClick={() => {
                  removeSection(index);
                }}>Borrar sección</button>
                </div>
            ))}
            <Button onClick={addSection} type="default">Añadir sección</Button>
            <Button onClick={generateJSON} type="primary" style={{marginTop: '10px'}}>Guardar formulario</Button>
            </div>
        </div>
      );
    }


export default FormEditor;
