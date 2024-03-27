import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import './Login.css'

const RecoverPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate()

  const onButtonClick = () => {
    var isError = false;
    // Set initial error values to empty
    setPasswordError('')
  
    if ('' === password) {
      setPasswordError('Por favor ingresa una contraseña')
      isError = true;
    }
  
    if (password.length < 7) {
      setPasswordError('La contraseña debe tener 8 caracteres o más')
      isError = true;
    }

    if ('' === confirmPassword) {
        setConfirmPasswordError('Por favor ingresa una contraseña')
        isError = true;
      }
    
      if (confirmPassword.length < 7) {
        setConfirmPasswordError('La contraseña debe tener 8 caracteres o más')
        isError = true;
      }

    if (password != confirmPassword) {
        setConfirmPasswordError('Las contraseñas deben coincidir')
        isError = true;
    }

    if (isError) return;
    changePassword();
  }

  const changePassword = () => {
    const token = searchParams.get("token")
    fetch(`http://localhost:8080/api/v1/auth/recover-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        navigate("/")
      })
  }

  return (
    <div className='parentContainer'>
        <div className={'centered'}>
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                  <img src='logogs.png' height={80}></img>
                  <h3>Sistemas integrados de gestión</h3>
                </div>
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
                <div className={'inputContainer'}>
                    <input
                    value={confirmPassword}
                    placeholder="Ingresa tu contraseña"
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
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
                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Cambiar contraseña'} />
                </div>
            </div>
        </div>
        <div className='secondaryContainer'></div>
    </div>
  )
}

export default RecoverPassword