import { ChangeEvent, useState } from 'react';
import './modal.css';

interface EditCompanyProps {
    id: number;
    setShow: any;
    show: boolean;
    companyName: string;
    companySocialName: string;
    companyLogo: string;
    reload: any;
}

const EditCompany = (props: EditCompanyProps) => {
    console.log(props);

  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [companyName, setCompanyName] = useState(props.companyName);
  const [companySocialName, setCompanySocialName] = useState(props.companySocialName);
  const [companyLogo, setCompanyLogo] = useState(props.companyLogo);

  const updateCompany = () => {
    fetch(`http://localhost:8080/api/v1/companies/${props.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
        id: props.id,
        name: companyName,
        socialName: companySocialName,
        logo: companyLogo
    }),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorageUser.token}`
    }
    })
    .then((r) => r.json())
    .then((r) => {
        props.reload();
        props.setShow(false);
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        fileToBase64(e.target.files[0], function (base64String: any) {
        setCompanyLogo(base64String);
        // You can use the base64String as needed, for example, send it to the server.
        });
      }
  };

  const fileToBase64 = (file: File, callback: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64String = reader.result;;
      callback(base64String);
    };
    reader.onerror = function (error) {
      console.error('Error converting file to base64:', error);
    };
  }

  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <div className={'inputContainer'}>
       <h3>Nombre de la companía</h3> 
        <input
            value={companyName}
            onChange={(ev) => setCompanyName(ev.target.value)}
            className={'inputBox'}
            type={'text'}
            />
        </div>
        <div className={'inputContainer'}>
        <h3>Nombre social de la companía</h3>
        <input
            value={companySocialName}
            onChange={(ev) => setCompanySocialName(ev.target.value)}
            className={'inputBox'}
            type={'text'}
            />
        </div>
        <div className={'inputContainer'}>
        <h3>Logo</h3>
        <img className='logo'
            src={companyLogo}
            />
            <br></br>
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
        </div>
        <br></br>
        <button type="button" onClick={() => props.setShow(false)}>
          Cancelar
        </button>
        <button type="button" className='save' onClick={() => {
            updateCompany()
            }}>
          Guardar
        </button>
        <br />
      </section>
    </div>
  );
};

export default EditCompany;