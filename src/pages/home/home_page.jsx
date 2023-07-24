import { useEffect, useState } from 'react'
import LoadingBar from '../../components/loading_bar'
import './home_page.css';
import axios from 'axios';
import AdminNavbar from '../../components/admin_navbar';
import AdminSidebar from '../../components/admin_sidebar';
import './../admin_area.css'
function HomePage() {

  const [adminInfo, setAdminInfo] = useState({
    name : '...',
    access : 1,
    remainedTime : '...'
  });

  const [isUploading, setIsUploading] = useState(true)

  const getAdminInfos = async() => {
    const {data} = await axios.get(
      '/getAdminInfoForHome',
      {
        params : {
          token : localStorage.getItem('user-access-endpoint')
        }
      }
    )
    if(data.status){
      setAdminInfo({
        name : data.user.admin_name,
        access : data.user.admin_level,
        remainedTime : `${data.tokenTime.hours} saat ${data.tokenTime.minutes} dakika`
      })
      setIsUploading(false)
    }else{

    }
  }

  useEffect(() => {
    getAdminInfos()
  }, [])
  

  return (
    <div className='home-area'>
      {
        isUploading
        ? (
          <div className="loading-area">
            <div className="load-content">
              <LoadingBar/>
              <div id="loadingText">Sayfa Ayarlanıyor..</div>
            </div>
          </div>
        )
        : (
          <>
            <AdminNavbar
            name={adminInfo.name}
            accessLevel={adminInfo.access}
            remainedTime={adminInfo.remainedTime}
            />
            <AdminSidebar
            accessLevel={adminInfo.access}
            />
            <div className='admin-area'>
              <div className="center">
                <img src="assests/image/alert_circle_icon.svg" alt="Alert Image" title='Alert Image'/>
                <div id='warn'>Bu sayfada gösterilecek bir şey yok.</div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default HomePage