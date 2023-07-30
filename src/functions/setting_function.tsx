import axios from "axios";

const GetSetting = async(setAdminValue : any, setSecretValue : any, setIsUploading : any) => {
    setIsUploading(true);
    const {data} = await axios.get(
      '/getSetting',
      {
        params : {
            name : JSON.parse(sessionStorage.getItem('admin-info')!).name
        }
      }
    )
    if (data.status) {
        setAdminValue(data.result);
        setSecretValue({
          secret_password : "*****",
          secret_key : data.result.admin_key.substring(0, 3) + "********",
          secret_id: data.result.unique_id.substring(0, 5) + "********"
        })
        setIsUploading(false);
    }else{
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz!')
    }
}

export default GetSetting