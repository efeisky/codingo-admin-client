import axios from "axios";
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import './verify_login.css'
import LoadingBar from "../../components/loading_bar";

const VerifyLogin = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [datas, setDatas] = useState({
        id : '',
        name : '',
        otp : ''
    })
    const [isLoading, setIsLoading] = useState(true)

    async function checkToken() {
        const token = params.get('token');
        const {data} = await axios.get(
            '/controlToken',
            {
                params:{
                    token : token,
                    id : params.get('id')
                }
            }
        )
        if (data.status) {
            setDatas({
                id : params.get('id'),
                name : sessionStorage.getItem('admin_name'),
                otp : data.otp
            })
        }else{
            window.location.href = '/login'
        }
    }

    useEffect(() => {
        const setVerifyData = async () => {
            if (params.get('id') && params.get('token')) {
                await checkToken();
                setIsLoading(false)
            }else{
                window.location.href = '/login'
            }
        };
        setVerifyData();
    }, [])
    
    const CreatePermanentToken = async() => {
        const {data} = await axios.post(
            '/setPermanentToken',
            {
                id : datas.id
            }
        );
        if (data.status) {
            localStorage.setItem('user-access-endpoint',data.token);
            window.location.href = '/home'
        }else{
            alert('Beklenmeyen Hata Oluştu!');
            window.location.href = '/login'
        }
    }
  
    const [otp, setOtp] = useState('');
    const [isTrue, setIsTrue] = useState(true)
    useEffect(() => {
      if(otp.length === 6){
        if (otp === datas.otp) {
            setIsTrue(true)
            setIsLoading(true);
            const setData = async () => {
                await CreatePermanentToken();
            };
            setData();
            //Aktif token ve otp silinip, 1 günlük token atanacak ve bu değer session storagede tutulacak. 1 Günlük biterse tekrar login isteği olacak, 
            //token = user_id, expiredTime, ip
            // window.location.href = '/home'
        }else{
            setIsTrue(false)
        }
      }
    }, [otp])
    return (
        <div className="area">
            {
                isLoading
                ? 
                ( 
                    <LoadingBar/>
                )
                :
                (
                    <div className="area-popup">
                        <div className="texts">
                            <div id="area-header">Admin Doğrulama</div>
                            <p id="area-content">Hoş Geldin, {datas.name}</p>
                            </div>
                        <div className="otp-area">
                            <span id="area-span">Admin sistemi güvenliği için, her girişe için 5 dakika süre verilecek şekilde mail adresinize 6 haneli tek kullanımlık kod gelecektir.</span>
                            <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span style={{width:'2.5rem'}}></span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                width:'5rem',
                                height:'7rem',
                                fontSize:'2.6rem',
                                fontFamily:'Inter, sans-serif',
                                fontWeight:'500',
                                border: isTrue ? ('1px solid #cbcbcb') : ('1px solid #EA4335'),
                                borderRadius:'.5rem',
                                outlineColor: '#4285F4'
                            }}
                            />
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default VerifyLogin