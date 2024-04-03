import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
const { REACT_APP_API_ENDPOINT } = process.env;
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
    fetch(`${REACT_APP_API_ENDPOINT}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`
      },
      body: JSON.stringify({ password, newPassword }),
    })
      .then((r) => {
        if (r.ok) navigate("/home")
        else navigate("/auth-error")
      })
  }

  return (
    <div className="parentContainer" style={{marginLeft: '10%'}}>
      <div className="centered">
        <div className="mainContainer">
          <div className="titleContainer">
            <img src='logogs.png' height={80}></img>
            <h3>Sistemas integrados de gestión</h3>
          </div>
          <Form onFinish={changePassword}>
            <Form.Item
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              <Input.Password
                value={password}
                placeholder="Contraseña actual"
                onChange={(ev) => setPassword(ev.target.value)}
                className="inputBox"
              />
            </Form.Item>
            <Form.Item
              validateStatus={newPasswordError ? 'error' : ''}
              help={newPasswordError || ''}
            >
              <Input.Password
                value={newPassword}
                placeholder="Nueva contraseña"
                onChange={(ev) => setNewPassword(ev.target.value)}
                className="inputBox"
              />
            </Form.Item>
            <Form.Item
              validateStatus={confirmPasswordError ? 'error' : ''}
              help={confirmPasswordError || ''}
            >
              <Input.Password
                value={confirmPassword}
                placeholder="Confirmar contraseña"
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                className="inputBox"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="inputButton">
                Cambiar contraseña
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="secondaryContainer"></div>
    </div>
  );
}

export default ChangePassword