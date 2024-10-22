import { Button, Input, Select, Space } from 'antd'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const { REACT_APP_API_ENDPOINT } = process.env;

function FormGenerator() {

  const [title, setTitle] = useState<string>('');
  const [version, setVersion] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<number>(1);

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    title: title,
    version: version,
    code: code,
    type: type,
    sections: []
  });

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { id: uuidv4(), name: '', buttons: [] }]
    });
  }

  const removeSection = (index: number) => {
    const updatedSections = [...formData.sections];
    updatedSections.splice(index, 1);
    setFormData({
      ...formData,
      sections: updatedSections
    });
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
    if (formData.title === '') {
      alert('Ingrese un título');
      return;
    }
    if (formData.version === '') {
      alert('Ingrese una versión');
      return;
    }
    if (formData.code === '') {
      alert('Ingrese un código');
      return;
    }
    fetch(`${REACT_APP_API_ENDPOINT}/form-templates`, {
      method: 'POST',
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
        navigate('/forms');
      });
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Editor de Formularios</h1>
      <div style={{ width: '20%', marginLeft: '40%' }}>
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
          style={{ width: '100%' }} // Ajusta el ancho del menú
          placeholder="Selecciona una opción" // Añade un texto por defecto
          optionLabelProp="label" // Utiliza la propiedad label para mostrar el nombre en lugar del valor numérico
        >
          <Select.Option value={1} label="ISO">ISO</Select.Option>
          <Select.Option value={2} label="SST">SST</Select.Option>
          <Select.Option value={3} label="Documentación">Documentación</Select.Option>
          <Select.Option value={4} label="Mapa de Procesos">Mapa de Procesos</Select.Option>
          <Select.Option value={5} label="Políticas">Políticas</Select.Option>
          <Select.Option value={6} label="Normas/Leyes">Normas/Leyes</Select.Option>
          <Select.Option value={7} label="Matriz de Riesgos">Matriz de Riesgos</Select.Option>
          <Select.Option value={8} label="Auditoría">Auditoría</Select.Option>
          <Select.Option value={9} label="Evaluación de Desempeño">Evaluación de Desempeño</Select.Option>
        </Select>
        <br />
        <h2>Secciones</h2>
        {formData.sections.map((section: any, index: any) => (
          <div key={index}>
            <h3>Sección {index + 1}</h3>
            <label>Nombre:</label>
            <Input
              type="text"
              value={section.name || ''}
              onChange={(e) => {
                const updatedSections = [...formData.sections];
                updatedSections[index] = { ...updatedSections[index], name: e.target.value };
                setFormData({ ...formData, sections: updatedSections });
              }}
            />
            <br />
            <label>Botones:</label>
            <Input
              type="text"
              value={section.buttons ? section.buttons.join(',') : ''}
              onChange={(e) => {
                const updatedSections = [...formData.sections];
                updatedSections[index] = { ...updatedSections[index], buttons: e.currentTarget.value.split(',') };
                setFormData({ ...formData, sections: updatedSections });
              }}
            />
            <button onClick={() => removeSection(index)}>Borrar sección</button>
          </div>
        ))}
        <Button onClick={addSection} type="default">Añadir sección</Button>
        <Button onClick={generateJSON} type="primary" style={{ marginTop: '10px' }}>Guardar formulario</Button>
      </div>
    </div>
  );
}

export default FormGenerator;
