import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHelmetSafety } from '@fortawesome/free-solid-svg-icons';
import PaypalButton from './Paypal/PaypalButton';
import Modal from 'react-modal';

interface HomeProps {
  loggedIn: boolean;
  email: string;
  setLoggedIn: any;
}

const Home = (props: HomeProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedISO, setSelectedISO] = useState<string | null>(null);

  const onButtonClick = () => {
    if (props.loggedIn) {
      localStorage.removeItem('user');
      props.setLoggedIn(false);
    } else {
      navigate('/login');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedISO(null);
  };

  const openISOModal = (iso: string) => {
    setIsModalOpen(false); // Cerramos el modal principal antes de abrir el de detalle
    setSelectedISO(iso);
    setIsDetailModalOpen(true);
  };

  const goBackToMainModal = () => {
    setIsDetailModalOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <img src='logogs.png' height={80} alt="Logo GS" />
      </div>
      <div className="welcomeContainer">
        <b>Bienvenido</b>
        <p>
          Esta es la página de inicio. Para continuar, elige una de las opciones de nuestro menú lateral o inicia sesión.
        </p>
      </div>
      <div className="paypalContainer">
        <PaypalButton totalValue="10" invoice="Pago de prueba" customId='1' />
      </div>
      <div className="imageGrid">
        <div className="imageItem">
          <img
            src='logoiso.gif'
            height={200}
            width={230}
            alt="Logo ISO"
            onClick={openModal}
          />
        </div>
        <div className="imageItem">
          <img
            src='ods.png'
            height={200}
            width={300}
            alt="ODS Logo"
            onClick={() => {
              alert("Disponible próximamente");
            }}
          />
        </div>
        <div className="imageItem">
          <img
            src='basc.png'
            height={250}
            width={250}
            alt="Logo BASC"
            onClick={() => {
              alert("Disponible próximamente");
            }}
          />
        </div>
        <div className="imageItem">
          <img
            src='logosst.png'
            height={250}
            width={250}
            alt="Logo SST"
            onClick={() => {
              navigate('/forms?formId=2');
            }}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Normas ISO"
        className="modalContainer centeredModal"
        overlayClassName="modalOverlay"
      >
        <h2>Principales Normas ISO</h2>
        <div className="isoImagesContainer">
          <img
            src='iso9001.png'
            height={150}
            width={150}
            alt="ISO 9001"
            onClick={() => openISOModal('ISO 9001')}
          />
          <img
            src='iso14001.png'
            height={150}
            width={150}
            alt="ISO 14001"
            onClick={() => openISOModal('ISO 14001')}
          />
          <img
            src='iso45001.png'
            height={150}
            width={150}
            alt="ISO 45001"
            onClick={() => openISOModal('ISO 45001')}
          />
          <img
            src='iso27001.png'
            height={150}
            width={150}
            alt="ISO 27001"
            onClick={() => openISOModal('ISO 27001')}
          />
          <img
            src='iso22000.png'
            height={150}
            width={150}
            alt="ISO 22000"
            onClick={() => openISOModal('ISO 22000')}
          />
        </div>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>

      {isDetailModalOpen && selectedISO && (
        <Modal
          isOpen={isDetailModalOpen}
          onRequestClose={closeModal}
          contentLabel={selectedISO}
          className="isoDetailModal centeredModal"
          overlayClassName="modalOverlay"
        >
          <h2>{selectedISO}</h2>
          <p>
            {selectedISO === 'ISO 9001' && 'ISO 9001: Sistemas de gestión de la calidad. Esta norma está diseñada para ayudar a las organizaciones a garantizar que cumplen con las necesidades de los clientes y otras partes interesadas, mejorando la satisfacción del cliente.'}
            {selectedISO === 'ISO 14001' && 'ISO 14001: Sistemas de gestión ambiental. Esta norma se centra en ayudar a las organizaciones a mejorar su desempeño ambiental mediante un uso más eficiente de los recursos y la reducción de residuos.'}
            {selectedISO === 'ISO 45001' && 'ISO 45001: Sistemas de gestión de seguridad y salud en el trabajo. Su propósito es reducir el riesgo de accidentes laborales y enfermedades, proporcionando un entorno de trabajo seguro.'}
            {selectedISO === 'ISO 27001' && 'ISO 27001: Gestión de la seguridad de la información. Esta norma tiene como objetivo proteger la información dentro de una organización y garantizar la confidencialidad, integridad y disponibilidad de los datos.'}
            {selectedISO === 'ISO 22000' && 'ISO 22000: Gestión de la seguridad alimentaria. Está destinada a las organizaciones involucradas en la cadena alimentaria, asegurando que los alimentos sean seguros para el consumo.'}
          </p>
          <button onClick={goBackToMainModal}>Volver</button>
          <button onClick={closeModal}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
};

export default Home;