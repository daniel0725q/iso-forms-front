import { ChangeEvent, useEffect, useState } from 'react';
import './modal.css';
import { Button, Input, Modal, Select } from 'antd';
import { Option } from 'antd/es/mentions';

interface CreateUserProps {
    setShow: any;
    show: boolean;
    reloadUsers: any;
}

const CreateUser = (props:CreateUserProps) => {
  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [userEmail, setUserEmail] = useState('');
  const [userCompany, setCompanyId] = useState('123456789');
  const [userPassword, setUserPassword] = useState(Math.random().toString(36).slice(2, 10));
  const [roleId, setRoleId] = useState('3');
  const [companies, setCompanies] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => getCompanies(), []);

  const createUser = () => {
    fetch(`http://localhost:8080/api/v1/users`, {
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
      fetch(`http://localhost:8080/api/v1/companies?hasLogo=false`, {
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
          <Button key="submit" type="primary" onClick={createUser}>
            Crear
          </Button>,
        ]}
        bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }} // Custom body style for scrolling
      >
      <div style={{ marginBottom: '50px' }}>
          <b>Email:</b>
          <Input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="inputBox"
            type="text"
            required
          />
          <b>Compañía:</b>
          <Select
            value={userCompany}
            onChange={(value) => setCompanyId(value)}
            style={{ width: '100%' }}
          >
            {companies.map((company: any) => (
              <Option key={company.id} value={company.id}>
                {company.name}
              </Option>
            ))}
          </Select>
          <b>Rol:</b>
          <Select
            value={roleId}
            onChange={(value) => setRoleId(value)}
            style={{ width: '100%' }}
          >
            <Option value={'1'}>Administrador</Option>
            <Option value={'2'}>Supervisor</Option>
            <Option value={'3'}>Usuario</Option>
          </Select>
      </div>
    </Modal>
  );
};

export default CreateUser;