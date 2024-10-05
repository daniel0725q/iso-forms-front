import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
const { REACT_APP_API_ENDPOINT } = process.env;

interface LoginProps {
    setLoggedIn: any;
    setEmail: any;
}

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false)

  const navigate = useNavigate()

  const onButtonClick = () => {
    var isError = false;
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Por favor ingresa tu email')
      isError = true;
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Por favor ingresa un email válido')
      isError = true;
    }

    if (isPasswordForgotten) {
        recoverPassword();
        return;
    }
  
    if ('' === password) {
      setPasswordError('Por favor ingresa una contraseña')
      isError = true;
    }
  
    if (password.length < 7) {
      setPasswordError('La contraseña debe tener 8 caracteres o más')
      isError = true;
    }

    if (isError) return;
    logIn()
  }

  const logIn = () => {
    fetch(`${REACT_APP_API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.token && r.token.length > 0) {
          localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
          props.setLoggedIn(true)
          props.setEmail(email)
          navigate('/home')
        } else {
          window.alert('Email o contraseña incorrecta')
        }
      })
  }

  const recoverPassword = () => {
    fetch(`${REACT_APP_API_ENDPOINT}/auth/recovery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((r) => {
        alert("Se ha enviado un email con las instrucciones para el cambio de contraseña.")
        setIsPasswordForgotten(false);
      })
  }

  return (
    <div className='parentContainer'>
      <img src='banner.jpg' className='banner'></img>
        <div className={'centered'}>
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                  <img src='logogs.png' height={160}></img>
                  <h3>Sistemas integrados de gestión</h3>
                </div>
                <div className={'inputContainer'}>
                    <input
                    value={email}
                    placeholder="Ingresa tu email"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={'inputBox'}
                    />
                    <br />
                    {
                        emailError ? (
                            <div className='error'>
                                <label className="errorLabel">{emailError}</label>
                                <br />
                            </div>
                        ) : (
                            ''
                        )
                    }
                    
                </div>
                {
                    isPasswordForgotten ? (
                        ''
                    ) : (
                        <div className={'inputContainer'}>
                            <input
                            value={password}
                            placeholder="Ingresa tu contraseña"
                            onChange={(ev) => setPassword(ev.target.value)}
                            className={'inputBox'}
                            type={'password'}
                            />
                            <br />
                            {
                                passwordError ? (
                                    <div className='error'>
                                        <label className="errorLabel">{passwordError}</label>
                                        <br />
                                    </div>
                                ) : (
                                    ''
                                )
                            }
                        </div>
                    )
                }
                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={isPasswordForgotten ? 'Recuperar contraseña' : 'Iniciar sesión'} />
                </div>
                <div className={'inputContainer'}>
                    <Link to={'#'} onClick={() => setIsPasswordForgotten(true)}>{isPasswordForgotten ? '' : '¿Olvidó su contraseña?'}</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login