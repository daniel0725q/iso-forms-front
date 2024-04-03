import React, { useEffect, useRef, useState } from 'react';
import './Form.css';
import MyEditor from '../Editor/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
const { REACT_APP_API_ENDPOINT } = process.env;

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
        const url = props.isEdit ? `${REACT_APP_API_ENDPOINT}/forms/` : `http://localhost:8080/api/v1/form-templates/`;
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
const onFinish = (values: any, id: any) => {
    const url = !props.isEdit ? `${REACT_APP_API_ENDPOINT}}/forms` : `${REACT_APP_API_ENDPOINT}/forms/${id}`;
    fetch(url, {
        method: props.isEdit ? 'PATCH' : 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorageUser.token}`
        },
        body: JSON.stringify({
        data: values,
        formId: parseInt(id)
        })
    })
    .then((response) => response.json())
    .then(() => {
        navigate('/forms');
    });
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
          <Form
            layout="vertical"
            initialValues={{ version: allData.version, code: allData.code }}
            onFinish={(values: any) => onFinish(values, id)}
            >
            <Form.Item label="Versión">
                <Input name={'version'} value={allData.version} />
            </Form.Item>
            <Form.Item label="Código">
                <Input readOnly name={'code'} value={allData.code} />
            </Form.Item>
            {parse(allData.form ? allData.form.sections : [])}
            <Button type="primary" onClick={
                () => {
                    const url = !props.isEdit? `${REACT_APP_API_ENDPOINT}/forms`: `${REACT_APP_API_ENDPOINT}/forms/${id}`;
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
                }
            }>
                Guardar formulario
            </Button>
            </Form>

        </div>
      );
}

export default MyForm;
