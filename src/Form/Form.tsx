import React, { useEffect, useRef, useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema } from '@rjsf/utils';
import './Form.css';
import MyEditor from '../Editor/Editor';
import { useNavigate, useParams } from 'react-router-dom';

interface FormProps {
    isEdit: boolean
}

function MyForm(props: FormProps) {
    const editorRef = useRef<any>(null);

    const navigate = useNavigate();

    const [allData, setAllData] = useState<any>({})
    let { id } = useParams();
    const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');

    useEffect(() => {
        const url = props.isEdit ? 'http://localhost:8080/api/v1/forms/' : 'http://localhost:8080/api/v1/form-templates/';
        fetch(`${url}${id}`, {
            method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        })
        .then((r) => r.json())
        .then((r) => {
            if (props.isEdit) {
                setAllData(r.data);
            } else {
                setAllData(r);
            }
        })
    }, [])

    const log = () => {
        if (editorRef.current) {
          console.log(editorRef.current.getContent());
        }
    }

    const parse = (data: any) => {
        const elements: JSX.Element[] = [];
        for (const key in data) {
            var el = data[key];
            console.log(el.value);
            elements.push(<section key={el.id}>
                <h2>{el.name}</h2>
                <MyEditor content={el.value} buttons={el.buttons} element={el}></MyEditor>
            </section>)
        }
        return elements;
    }
      
  return (
    <div className='main'>
        <h1>{allData.title}</h1>
        <label>
          Versión:
          <input type='text' defaultValue={allData.version} onChange={(ev: any) => {
            allData.version = ev.currentTarget.value;
          }}></input>
        </label>
        <label>
          Código:
          <input type='text' defaultValue={allData.code} readOnly></input>
        </label>
        {parse(allData.form ? allData.form.sections : [])}
        <button onClick={() => {
            const url = !props.isEdit? `http://localhost:8080/api/v1/forms`: `http://localhost:8080/api/v1/forms/${id}`;
            fetch(`${url}`, {
                method: props.isEdit ? 'PATCH' : 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorageUser.token}`
                },
                body: JSON.stringify({
                    data: allData,
                    formId: parseInt(id!),
                })
            })
            .then((r) => r.json())
            .then((r) => {
                navigate('/forms');
            })
        }}>Guardar formulario</button>
    </div>
  );
}

export default MyForm;
