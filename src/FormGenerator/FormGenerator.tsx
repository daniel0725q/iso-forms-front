import React, { useState } from 'react';

function FormGenerator() {

  const [title, setTitle] = useState<string>('');
  const [version, setVersion] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<number>(1);

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');

  const [formData, setFormData] = useState<any>({
    title: title,
    version: version,
    code: code,
    type: type,
    sections: []
  });

  const addSection = () => {
    setFormData({
        title: title,
        version: version,
        code: code,
        type: type,
        sections: [...formData.sections, {}]
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
    fetch(`http://localhost:8080/api/v1/form-templates`, {
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
        console.log(r);
      })
  }

  return (
    <div>
      <h1>Editor de Formularios</h1>
      <label>Título:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <br />
      <label>Versión:</label>
      <input
        type="text"
        name="version"
        value={version}
        onChange={(ev) => setVersion(ev.target.value)}
      />
      <br />
      <label>Código:</label>
      <input
        type="text"
        name="code"
        value={code}
        onChange={(ev) => setCode(ev.target.value)}
      />
      <br />
      <label>Tipo:</label>
      <select
        name="type"
        value={type}
        onChange={(ev) => setType(parseInt(ev.target.value))}
      >
        <option value={1}>ISO</option>
        <option value={2}>SST</option>
      </select>
      <br />
      <h2>Secciones</h2>
      {formData.sections.map((section: any, index: number) => {
        return (
            <div>
                <h3>Sección {index + 1}</h3>
            <label>Id:</label>
      <input
        type="text"
        name="id"
        value={section.id}
        onChange={(ev) => section.id = ev.currentTarget.value}
      />
      <br />
      <label>Nombre:</label>
      <input
        type="text"
        name="name"
        value={section.name}
        onChange={(ev) => section.name = ev.currentTarget.value}
      />
      <br />
      <label>Botones:</label>
      <input
        type="text"
        name="buttons"
        value={section.buttons}
        onChange={(ev) => section.buttons = ev.currentTarget.value.split(',')}
      />
            </div>
        );
        })}
        <button onClick={addSection}>Añadir sección</button>
        <br></br>
        <button onClick={generateJSON}>Guardar formulario</button>
      </div>
      )
    }


export default FormGenerator;
