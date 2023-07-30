
export default function Default() {
  if (localStorage.getItem('user-access-endpoint')) {
    window.location.href = '/home'
  }else{
    window.location.href = '/login'
  }
  return (
    <></>
  )
}
