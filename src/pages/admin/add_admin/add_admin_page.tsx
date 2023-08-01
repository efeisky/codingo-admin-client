import { useState, useEffect } from "react";
import CheckAuth from "../../../auth/auth_control";
import { AdminModel } from "../../../model/admin_model";
import AdminNavbar from "../../../components/admin_navbar";
import AdminSidebar from "../../../components/admin_sidebar";
import LoadingBar from "../../../components/loading_bar";
import { ReportContent, ReportDetail, ReportHeader } from "../../../components/report_detail";
import CustomSelect from "../../../components/custom_selectbox";
import { accessOption } from "../../../interfaces/option_lists";
import { CheckAdminData, CreateAdminUser } from "../../../functions/admin_functions";

const AddAdminPage = () => {

  const [adminInfo, setAdminInfo] = useState({
    name : '...',
    access : 1,
    remainedTime : '...'
  });

  const [isUploading, setIsUploading] = useState(true)
  const [adminValue, setAdminValue] = useState<AdminModel>({
    id : 0,
    admin_email : '',
    admin_key : '',
    admin_level : 0,
    admin_name : '',
    admin_password : '',
    admin_phone_number : '',
    admin_status : true,
    unique_id : ''
  })
  useEffect(() => {
      const setData = async () => {
        await CheckAuth(setAdminInfo, setIsUploading);
      };
      setData();
  }, [])

  const addAdmin = async() => {
    if (CheckAdminData(adminValue)) {
      await CreateAdminUser(adminValue, setIsUploading)
    } else {
      alert('Tüm değerler girilmelidir!')
    }
  }
  return (
    <div className='home-area'>
      {
        isUploading
        ? (
          <div className="loading-area">
              <LoadingBar/>
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
              <h1>Admin Ekle</h1>
              <div className="reportDetailArea">
                <ReportDetail>
                  <ReportHeader header={'Admin İsmi'}/>
                  <ReportContent 
                  type="input" 
                  placeholder="Giriş Alanı"
                  content={adminValue.admin_name} 
                  onChange={(e)=>{
                    setAdminValue((prevValues)=>({
                        ...prevValues,
                        admin_name : e.target.value
                    }))
                  }}
                  />
                </ReportDetail>

                <ReportDetail>
                  <ReportHeader header={'Admin E-Mail'}/>
                  <ReportContent 
                  type="input" 
                  placeholder="Giriş Alanı"
                  content={adminValue.admin_email} 
                  onChange={(e)=>{
                    setAdminValue((prevValues)=>({
                        ...prevValues,
                        admin_email : e.target.value
                    }))
                  }}
                  />
                </ReportDetail>

                <ReportDetail>
                  <ReportHeader header={'Admin Erişim Seviyesi'}/>
                  <CustomSelect 
                  default={adminValue.admin_key}
                  onSelected={(option)=>{
                    setAdminValue((prevValues)=>({
                        ...prevValues,
                        admin_level : typeof(option.value) == "number" ? option.value : parseInt(option.value)
                    }))}}
                  options={accessOption}
                  />
                </ReportDetail>

                <ReportDetail>
                  <ReportHeader header={'Admin Şifresi'}/>
                  <ReportContent 
                  type="input" 
                  placeholder="Giriş Alanı"
                  content={adminValue.admin_password} 
                  onChange={(e)=>{
                    setAdminValue((prevValues)=>({
                        ...prevValues,
                        admin_password : e.target.value
                    }))
                  }}
                  isSecret
                  />
                </ReportDetail>
                
                <ReportDetail>
                  <ReportHeader header={'Admin Telefon Numarası'}/>
                  <ReportContent 
                  type="input" 
                  placeholder="Giriş Alanı"
                  content={adminValue.admin_phone_number} 
                  onChange={(e)=>{
                    setAdminValue((prevValues)=>({
                        ...prevValues,
                        admin_phone_number : e.target.value
                    }))
                  }}
                  />
                </ReportDetail>
                
                <div className="actions">
                    <button onClick={addAdmin}>Admini Ekle</button>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default AddAdminPage