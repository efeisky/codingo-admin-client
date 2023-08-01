import axios from "axios";
import { AdminModel } from "../model/admin_model";

const GetAdmin = async(setAdminValue : any, setIsUploading : any) => {
    setIsUploading(true);
    const {data} = await axios.get(
      '/admin/getAdmin'
    )
    if (data.status) {
        setAdminValue(data.result);
        setIsUploading(false);
    }else{
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz!')
    }
}
const DetailAdminByID = async(id : number, setAdminValue : any, setSecretValue : any, setIsUploading : any) => {
    setIsUploading(true);
    const {data} = await axios.get(
      '/admin/detailAdmin',
      {
        params : {
            id : id
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

const ChangeAdminStatus = async(id : number, setIsUploading : any) => {
  setIsUploading(true);
  const {data} = await axios.patch(
    '/admin/changeStatus',
    {
      id : id
    }
  )
  if (data.status) {
      window.location.reload()
  }else{
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz!')
  }
}
const ChangeAdminKey = async(id : number, setIsUploading : any) => {
  setIsUploading(true);
  const {data} = await axios.patch(
    '/admin/changeKey',
    {
      id : id
    }
  )
  if (data.status) {
      window.location.reload()
  }else{
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz!')
  }
}

const CreateAdminUser = async(value : any, setIsLoading : any) => {
  setIsLoading(true);
  const {data} = await axios.post(
    '/admin/add',
    {
      ...value
    }
  )
  if (data.status) {
    window.location.href = 'show'
  }else{
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz!')
  }
}

const CheckAdminData = (value : AdminModel) => {
  if (value.admin_email != '' && value.admin_name != '' && value.admin_password != '' && value.admin_phone_number != '' && value.admin_level != 0) {
    return true;
  } else {
    return false;
  }
}

const DeleteAdmin = async(id : number, setIsUploading : any) => {
  setIsUploading(true);
  const {data} = await axios.delete(
    '/admin/delete',
    {
      params : {
        id : id
      }
    }
  )
  if (data.status) {
    window.location.href = '/setAdmin/show'
  }else{
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz!')
  }
}
export {
    GetAdmin,
    DetailAdminByID,
    ChangeAdminStatus,
    ChangeAdminKey,
    CreateAdminUser,
    CheckAdminData,
    DeleteAdmin
}