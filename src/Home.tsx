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
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={props.loggedIn ? 'Log out' : 'Log in'}
        />
        {props.loggedIn ? <div>Your email address is {props.email}</div> : <div />}
      </div>
    </div>
  )
}

export default Home