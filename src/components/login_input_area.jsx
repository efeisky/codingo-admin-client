import { useState } from 'react';
import './css/login_input_area.css';
import EmailInput from './inputs/email_input';
import PasswordInput from './inputs/password_input';
import SecretKeyInput from './inputs/secret_key_input';

export default function LoginInputArea({isLogining}) {
  const [loginData, setLoginData] = useState({
    email : '',
    password : '',
    secretKey : ''
  });
  
  const login = async(e) => {
    e.preventDefault();
    isLogining(loginData)
  }
  return (
    <form className='input-area' method='POST' onSubmit={login}>
      <EmailInput 
      value={loginData.email} 
      onChange={(newEmail) => setLoginData({ ...loginData, email: newEmail })}
      />
      <PasswordInput 
      value={loginData.password} 
      onChange={(newPassword) => setLoginData({ ...loginData, password: newPassword })}
      />
      <SecretKeyInput
      value={loginData.secretKey} 
      onChange={(newSecretKey) => setLoginData({ ...loginData, secretKey: newSecretKey })}
      />
      <button type="submit" id='login-button' >Giriş Yap</button>
    </form>
  )
}