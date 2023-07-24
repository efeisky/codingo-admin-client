import { Link } from 'react-router-dom'
import './css/admin_sidebar.css'
import { useEffect, useState } from 'react'

const AdminSidebar = ({accessLevel}) => {
    const [batteryLevel, setBatteryLevel] = useState(null);

    useEffect(() => {
    if ('getBattery' in navigator) {
        navigator.getBattery()
          .then(battery => {
            setBatteryLevel(Math.floor(battery.level * 100) + '%');
            battery.onlevelchange = () => {
              setBatteryLevel(Math.floor(battery.level * 100) + '%');
            };
          })
          .catch(err => console.error('Batarya durumu alınamadı: ', err));
      } else {
        console.warn('Tarayıcı batarya durumu API\'yi desteklemiyor.');
      }
    
    }, [])
    
  return (
    <nav className='admin-sidebar'>
        <div id="sidebar-header">
            Admin Yönetim Paneli
        </div>
        <div id="sidebar-items">
            <Link  to={'/home'} title='Anasayfa' id="item">Anasayfa</Link>
            <Link  to={'/lessons/setQuestion'} title='Soru Hazırla' id="item">Soru Hazırla</Link>
            <Link  to={'/reports/reachWe'} title='Bize Ulaşın Oku' id="item">Bize Ulaşın Oku</Link>
            <Link  to={'/reports/profile'} title='Profil Şikayetleri' id="item">Profil Şikayetleri</Link>
            <Link  to={'/setting'} title='Ayarlar' id="item">Ayarlar</Link>
        </div>
        <div id="sidebar-copyright">
            <div id="device-charge-status">{batteryLevel != null ? `${batteryLevel} Şarjın Kaldı` : 'Cihaz Şarjı Bilinmiyor'}</div>
            <span id="copyright">Codingo Admin © 2023</span>
        </div>
    </nav>
  )
}

export default AdminSidebar