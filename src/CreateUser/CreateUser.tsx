import { ChangeEvent, useEffect, useState } from 'react';
import './modal.css';
import { Button, Form, Input, Modal, Select } from 'antd';
import { Option } from 'antd/es/mentions';
const { REACT_APP_API_ENDPOINT } = process.env;

interface CreateUserProps {
    setShow: any;
    show: boolean;
    reloadUsers: any;
}

const CreateUser = (props:CreateUserProps) => {
  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [userEmail, setUserEmail] = useState('');
  const [userCompany, setUserCompany] = useState('123456789');
  const [userPassword, setUserPassword] = useState(Math.random().toString(36).slice(2, 10));
  const [roleId, setRoleId] = useState('3');
  const [companies, setCompanies] = useState<any>([]);
  const [reload, setReload] = useState(true);
  var form: any;

  useEffect(() => {
    getCompanies()
  }, []);

  const createUser = () => {
    if (!userEmail.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
      alert("Ingrese un email válido")
      return
    }
    fetch(`${REACT_APP_API_ENDPOINT}/users`, {
    method: 'POST',
    body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        companyId: userCompany,
        roleId: roleId
    }),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorageUser.token}`
    }
    })
    .then((r) => r.json())
    .then((r) => {
        props.setShow(false);
        props.reloadUsers();
    })
  }

  const getCompanies = () => {
    if (reload) {
      fetch(`${REACT_APP_API_ENDPOINT}/companies?hasLogo=false`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorageUser.token}`
      },
      })
      .then((r) => r.json())
      .then((r) => {
          const r2 = r.sort((e1: any, e2: any) => {
              if (e1.name > e2.name) return 1;
              else if (e1.name == e2.name) return 0;
              else return -1;
          });
          setCompanies(r2);
          setReload(false);
      });
    }
  }

  return (
    <Modal
        title="Crear/Editar usuario"
        open={props.show}
        onCancel={() => props.setShow(false)}
        footer={[
          <Button key="cancel" onClick={() => props.setShow(false)}>
            Cancelar
          </Button>,
          <Button form='form' key="submit" type="primary" onClick={createUser}>
            Crear
          </Button>,
        ]}
        bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }} // Custom body style for scrolling
      >
      <div style={{ marginBottom: '50px' }}>
      <Form form={form} layout="vertical">
        <Form.Item label="Email" required>
          <Input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="inputBox"
            type="text"
          />
        </Form.Item>
        <Form.Item label="Compañía" rules={[{ required: true, message: 'Please enter your email!'}]}>
          <Select
            value={userCompany}
            onChange={(value) => setUserCompany(value)}
            style={{ width: '100%' }}
          >
            {companies.map((company: any) => (
              <Option key={company} value={company.id}>
                {company.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Rol" required>
          <Select
            value={roleId}
            onChange={(value) => setRoleId(value)}
            style={{ width: '100%' }}
          >
            <Option value={'1'}>Administrador</Option>
            <Option value={'2'}>Supervisor</Option>
            <Option value={'3'}>Usuario</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
    </Modal>
  );
};

export default CreateUser;