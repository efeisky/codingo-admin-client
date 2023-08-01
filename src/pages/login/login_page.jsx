import './login_page.css';
import LoginInputArea from '../../components/login_input_area';
import { useState, useRef, useEffect } from 'react';
import getIp from '../../functions/ip_functions';
import LoadingBar from '../../components/loading_bar';
import axios from 'axios';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userIp, setUserIp] = useState(null);
  const loginAttemptRef = useRef({});
  const MAX_LOGIN_ATTEMPTS = 5
  const COOL_DOWN_PERIOD = 600000;


  useEffect(() => {

    const fetchIp = async () => {
      const ipAdress = await getIp();
      setUserIp(ipAdress);
      setIsLoading(false)
    };
    fetchIp();
  }, []);

  const login_admin = async(login_data) => {
    const { email, password, secretKey } = login_data;
    setIsLoading(true);
    if (!loginAttemptRef.current[userIp]) {
      loginAttemptRef.current[userIp] = {
        attempts: 1,
        lastAttempt: Date.now(),
      };
    } else {
      loginAttemptRef.current[userIp].attempts += 1;
      loginAttemptRef.current[userIp].lastAttempt = Date.now();
    }

    if (loginAttemptRef.current[userIp].attempts >= MAX_LOGIN_ATTEMPTS) {
      if (Date.now() - loginAttemptRef.current[userIp].lastAttempt <= COOL_DOWN_PERIOD) {
        alert("Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.");
        return;
      } else {
        loginAttemptRef.current[userIp].attempts = 1;
        loginAttemptRef.current[userIp].lastAttempt = Date.now();
      }
    }
    try {
      const {data} = await axios.post(
        "https://codingo-admin-backend.onrender.com/login",
        {
          email : email,
          password : password,
          key : secretKey
        }
      )
      if (data.status) {
        const { id, name, token} = data;
        sessionStorage.setItem('admin_name',name)
        window.location.href = `/login/verify?token=${token}&id=${id}`
      }else{
        if (data.error === 'The user is not defined!') {
          alert('Hatalı Giriş')
        }
      }
    } catch (error) {
      alert('Problem oluştu : ', error)
    }
    setIsLoading(false);
  };

  return (
    <div className='area'>
      {
        isLoading
        ? (
          <LoadingBar/>
        )
        : (
          <div className="area-popup">
            <h1 id="area-header">Codingo Admin ~ Giriş Yap</h1>
            <LoginInputArea isLogining={login_admin} />
          </div>
        )
      }
    </div>
  );
}

export default LoginPage;
