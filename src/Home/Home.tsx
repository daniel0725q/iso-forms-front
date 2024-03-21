import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Sidebar from '../Sidebar/Sidebar';

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
          <div>¡Bienvenido!</div>
        </div>
        <div>Esta es la página de inicio. Para continuar, elige una de las opciones de nuestro menú lateral.</div>
        <div className={'buttonContainer'}>
          <input
            className={'inputButton'}
            type="button"
            onClick={onButtonClick}
            value={props.loggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
          />
          {props.loggedIn ? <div>Tu email es {props.email}</div> : <div />}
        </div>
      </div>
    </div>
  )
}

export default Home