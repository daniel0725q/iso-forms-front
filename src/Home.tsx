import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

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
        <div className={'buttonContainer'}>
          {props.loggedIn ? <div>Tu email es {props.email}</div> : <div />}
          <input
            className={'inputButton'}
            type="button"
            onClick={onButtonClick}
            value={props.loggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
          />
        </div>
      </div>
    </div>
  )
}

export default Home