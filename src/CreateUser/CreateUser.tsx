import { ChangeEvent, useEffect, useState } from 'react';
import './modal.css';

interface CreateUserProps {
    setShow: any;
    show: boolean;
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

  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <div className={'inputContainer'}>
      <h3>Email</h3> 
       <input
           value={userEmail}
           onChange={(ev) => setUserEmail(ev.target.value)}
           className={'inputBox'}
           type={'text'}
           />
       </div>
      <div className={'inputContainer'}>
       <h3>Compañía</h3> 
       <select value={userCompany} onChange={e => setCompanyId(e.target.value)}>
        {companies.map((el: any) => (
              <option key={el.value} value={el.id}>{el.name}</option>
          ))}
       </select>
        </div>
        <div className={'inputContainer'}>
        <h3>Rol</h3>
        <select value={roleId} onChange={e => setRoleId(e.target.value)}>
          <option value={1}>Administrador</option>
          <option value={2}>Supervisor</option>
          <option value={3}>Usuario</option>
        </select>
        </div>
        <br></br>
        <button type="button" onClick={() => props.setShow(false)}>
          Cancelar
        </button>
        <button type="button" className='save' onClick={() => {
            createUser()
        }}>
            Guardar
        </button>
        <br />
      </section>
    </div>
  );
};

export default CreateUser;