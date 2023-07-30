import { useEffect, useState } from 'react'
import LoadingBar from '../../components/loading_bar'
import './home_page.css';
import AdminNavbar from '../../components/admin_navbar';
import AdminSidebar from '../../components/admin_sidebar';
import './../admin_area.css'
import CheckAuth from '../../auth/auth_control';


function HomePage() {

  const [adminInfo, setAdminInfo] = useState({
    name : '...',
    access : 1,
    remainedTime : '...'
  });

  const [isUploading, setIsUploading] = useState(true)

  useEffect(() => {
    CheckAuth(setAdminInfo, setIsUploading)
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
            remainedTime={adminInfo.remainedTime}
            />
            <AdminSidebar
            accessLevel={adminInfo.access}
            />
            <div className='admin-area'>
              <div className="center">
                <img src="/assests/image/alert_circle_icon.svg" alt="Alert Image" title='Alert Image'/>
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