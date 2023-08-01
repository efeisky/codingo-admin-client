import { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/admin_navbar';
import CheckAuth from '../../../auth/auth_control';
import AdminSidebar from '../../../components/admin_sidebar';
import LoadingBar from '../../../components/loading_bar';
import { GetAdmin } from '../../../functions/admin_functions';
import { AdminModel } from '../../../model/admin_model';

const ShowAdminPage = () => {

    const [adminInfo, setAdminInfo] = useState({
      name : '...',
      access : 1,
      remainedTime : '...'
    });
  
    const [isUploading, setIsUploading] = useState(true)
    const [reportAreaStatus, setReportAreaStatus] = useState(false)
    const [adminValue, setAdminValue] = useState<AdminModel[]>([])
    useEffect(() => {
        const setData = async () => {
          await CheckAuth(setAdminInfo, setIsUploading);
          await GetAdmin(setAdminValue, setIsUploading);
        };
        setData();
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
              {
                reportAreaStatus ? (
                  <>
                    <LoadingBar/>
                  </>
                ) : (
                  <div className="reportArea">
                  <div className="mode-area">
                    <h2>Profil Şikayetleri</h2>
                    <a href='add'><button>Admin Ekle</button></a>
                  </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Admin ID</th>
                          <th>İsim</th>
                          <th>E-Mail Adresi</th>
                          <th>Erişim Seviyesi</th>
                          <th>Gizli Anahtar</th>
                          <th>Hesap Durumu</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminValue.map((admin) => (
                          <tr key={admin.unique_id}>
                          <td>{admin.id}</td>
                            <td>{admin.admin_name}</td>
                            <td>{admin.admin_email}</td>
                            <td>{admin.admin_level}. Seviye</td>
                            <td>{admin.admin_key.substring(0,25)}...</td>
                            <td>{admin.admin_status? 'Aktif Hesap' : 'İnaktif Hesap'}</td>
                            <td id='badget-td'><a id='process' href={`${admin.id}/process`}>İşlem Yap</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default ShowAdminPage