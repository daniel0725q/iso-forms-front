import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHelmetSafety } from '@fortawesome/free-solid-svg-icons';
import PaypalButton from  './Paypal/PaypalButton';

interface HomeProps {
  loggedIn: boolean;
  email: string;
  setLoggedIn: any;
}

const Home = (props: HomeProps) => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (props.loggedIn) {
      localStorage.removeItem('user');
      props.setLoggedIn(false);
    } else {
      navigate('/login');
    }
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
      <div className="imageGrid">
        <div className="imageItem">
          <img
            src='logoiso.gif'
            height={200}
            width={230}
            alt="Logo ISO"
            onClick={() => {
              navigate('/forms?formId=1');
            }}
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
        <div className="paypal">
          <PaypalButton totalValue="10" invoice="Pago de prueba"/>
          </div>
      </div>
    </div>
  );
};

export default Home;