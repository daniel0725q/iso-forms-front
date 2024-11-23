import React, { useEffect, useRef, useState } from 'react';
import './Form.css';
import MyEditor from '../Editor/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
const { REACT_APP_API_ENDPOINT } = process.env;

interface FormProps {
    isEdit: boolean
}

function MyFormEdit(props: FormProps) {
    const editorRef = useRef<any>(null);

    const navigate = useNavigate();

    const [allData, setAllData] = useState<any>({})
    const [version, setVersion] = useState<number>(0);
    let { id, template } = useParams();
    const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');

    useEffect(() => {
        const url = props.isEdit ? `${REACT_APP_API_ENDPOINT}/forms/` : `${REACT_APP_API_ENDPOINT}/form-templates/`;
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
                setVersion(r.version);
            } else {
                setAllData(r.data);
            }
        })
    }, [])

const onFinish = (values: any, id: any) => {
    const url = !props.isEdit ? `${REACT_APP_API_ENDPOINT}}/forms/templates/` : `${REACT_APP_API_ENDPOINT}/forms/${id}`;
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
                    const url = !props.isEdit? `${REACT_APP_API_ENDPOINT}/forms`: `${REACT_APP_API_ENDPOINT}/forms`;
                    fetch(`${url}`, {
                        method: props.isEdit ? 'POST' : 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorageUser.token}`
                        },
                        body: JSON.stringify({
                            data: allData,
                            formId: parseInt(template!),
                            version: version + 1,
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

export default MyFormEdit;
