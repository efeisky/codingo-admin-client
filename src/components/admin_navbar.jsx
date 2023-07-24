import './css/admin_navbar.css'
const AdminNavbar = ({name, remainedTime}) => {
  return (
    <nav className='admin-navbar'>
        <div id="navbar-name">Hoş Geldin, {name}</div>
        <div id="navbar-time">Üyelik Bitişine {remainedTime} kaldı</div>
    </nav>
  )
}

export default AdminNavbar