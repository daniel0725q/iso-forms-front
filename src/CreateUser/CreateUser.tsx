import { ChangeEvent, useState } from 'react';
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
        <input
            value={userCompany}
            onChange={(ev) => setCompanyId(ev.target.value)}
            className={'inputBox'}
            type={'number'}
            />
        </div>
        <div className={'inputContainer'}>
        <h3>Rol</h3>
        <input
            value={roleId}
            onChange={(ev) => setRoleId(ev.target.value)}
            className={'inputBox'}
            type={'number'}
            />
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