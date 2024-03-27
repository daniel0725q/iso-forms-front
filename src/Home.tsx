import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHelmetSafety } from '@fortawesome/free-solid-svg-icons';

interface HomeProps { 
    loggedIn: boolean;
    email: string;
    setLoggedIn: any;
}

const Home = (props: HomeProps) => {
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (props.loggedIn) {
      localStorage.removeItem('user')
      props.setLoggedIn(false)
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <div className="mainContainer">
        <div className={'titleContainer'}>
          <img src='logogs.png' height={80}></img>
        </div>
        <div>
          <b>Bienvenido</b>
          <p>
          Esta es la página de inicio. Para continuar, elige una de las opciones de nuestro menú lateral o inicia sesión.
          </p>
        </div>
        <div>
          <img src='logoiso.gif' height={200} width={200} onClick={() => {
            navigate('/forms?formId=1')
          }}></img>
          <img src='ods.png' height={200} width={300} onClick={() => {
            alert("Disponible próximamente")
          }}></img>
        </div>
        <div>
          <img src='basc.png' height={250} width={250} onClick={() => {
            alert("Disponible próximamente")
          }}></img>
          <img src='logosst.png' height={250} width={250} onClick={() => {
            navigate('/forms?formId=2')
          }}></img>  
        </div>
      </div>
    </div>
  )
}

export default Home