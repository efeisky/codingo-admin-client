import axios from 'axios';
const CheckAuth = async(setAdminInfo, setIsUploading) => {
    if (sessionStorage.getItem('is-login') && sessionStorage.getItem('admin-info')) {
      setAdminInfo(JSON.parse(sessionStorage.getItem('admin-info')))
      setIsUploading(false)
    }else{
      const {data} = await axios.get(
        'https://codingo-admin-backend.onrender.com/getAdminInfo',
        {
          params : {
            token : localStorage.getItem('user-access-endpoint')
          }
        }
      )
      if(data.status){
        sessionStorage.setItem('is-login', true)
        sessionStorage.setItem('admin-info', JSON.stringify({
          name : data.user.admin_name,
          access : data.user.admin_level,
          remainedTime : `${data.tokenTime.hours} saat ${data.tokenTime.minutes} dakika`
        }))
        setAdminInfo({
          name : data.user.admin_name,
          access : data.user.admin_level,
          remainedTime : `${data.tokenTime.hours} saat ${data.tokenTime.minutes} dakika`
        })
        setIsUploading(false)
      }else{
        if (data.error === 'The token is not founded!') {
          alert('Token süreniz dolmuş. Lütfen tekrar giriş yapınız!')
        }
        window.location.href = '/login'
      }
    }
  }

export default CheckAuth