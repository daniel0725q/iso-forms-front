import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
// import './Login.css'

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
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

    if ('' === newPassword) {
      setNewPasswordError('Por favor ingresa una contraseña')
      isError = true;
    }
  
    if (newPassword.length < 7) {
      setNewPasswordError('La contraseña debe tener 8 caracteres o más')
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

    if (newPassword != confirmPassword) {
        setConfirmPasswordError('Las contraseñas deben coincidir')
        isError = true;
    }

    if (isError) return;
    changePassword();
  }

  const changePassword = () => {
    fetch(`http://localhost:8080/api/v1/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`
      },
      body: JSON.stringify({ password, newPassword }),
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
                    <h1>GSIntegral</h1>
                    <h3>Sistemas integrados de gestión</h3>
                </div>
                <div className={'inputContainer'}>
                    <input
                    value={password}
                    placeholder="Contraseña actual"
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
                    value={newPassword}
                    placeholder="Nueva contraseña"
                    onChange={(ev) => setNewPassword(ev.target.value)}
                    className={'inputBox'}
                    type={'password'}
                    />
                    <br />
                    {
                        newPasswordError ? (
                            <div className='error'>
                                <label className="errorLabel">{newPasswordError}</label>
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
                    placeholder="Confirmar contraseña"
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    className={'inputBox'}
                    type={'password'}
                    />
                    <br />
                    {
                        confirmPasswordError ? (
                            <div className='error'>
                                <label className="errorLabel">{confirmPasswordError}</label>
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

export default ChangePassword