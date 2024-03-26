import { ChangeEvent, useState } from 'react';
import './modal.css';
import { Button, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface EditCompanyProps {
    id: number;
    setShow: any;
    show: boolean;
    companyName: string;
    companySocialName: string;
    companyLogo: string;
    reload: any;
    isCreate: boolean;
}

const CreateOrEditCompany = (props: EditCompanyProps) => {
  const sessionStorageUser = JSON.parse(localStorage.getItem('user') || '');
  const [companyId, setCompanyId] = useState('');
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

  const createCompany = () => {
    fetch(`http://localhost:8080/api/v1/companies`, {
    method: 'POST',
    body: JSON.stringify({
        id: companyId,
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

  const handleFileChange = (f: any) => {
        fileToBase64(f, function (base64String: any) {
        setCompanyLogo(base64String);
        // You can use the base64String as needed, for example, send it to the server.
        });
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
    <Modal
        title="Crear/Editar empresa"
        open={props.show}
        onCancel={() => props.setShow(false)}
        footer={[
          <div>
            <Button type="default" onClick={() => props.setShow(false)}>
            Cancelar
          </Button>
          <Button
            type="primary"
            className="save"
            onClick={props.isCreate ? createCompany : updateCompany}
          >
            Guardar
          </Button>
          </div>
        ]}
        bodyStyle={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }} // Custom body style for scrolling
      >
      <section className="modal-main">
        {props.isCreate && (
          <div className="inputContainer">
            <h3>NIT de la compañía</h3>
            NIT de la compañía<Input
              value={companyId}
              onChange={(ev) => setCompanyId(ev.target.value)}
              className="inputBox"
              type="number"
              required
            />
          </div>
        )}
        <div className="inputContainer">
          <h3>Nombre de la compañía</h3>
          <Input
            value={companyName}
            onChange={(ev) => setCompanyName(ev.target.value)}
            className="inputBox"
            type="text"
            required
          />
        </div>
        <div className="inputContainer">
          <h3>Nombre social de la compañía</h3>
          <Input
            value={companySocialName}
            onChange={(ev) => setCompanySocialName(ev.target.value)}
            className="inputBox"
            type="text"
            required
          />
        </div>
        <div className="inputContainer">
          <h3>Logo</h3>
          <Upload
            className="logoUpload"
            beforeUpload={() => false} // Disable automatic upload
            onChange={(ev) => handleFileChange(ev.file)}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
          </Upload>
          {companyLogo && (
            <img height={200} width={200} className="logoPreview" src={companyLogo} alt="Company Logo" />
          )}
        </div>
        <div>
        </div>
      </section>
    </Modal>
  );
};

export default CreateOrEditCompany;