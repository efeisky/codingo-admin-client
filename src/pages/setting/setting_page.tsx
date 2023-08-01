import { useState, useEffect } from "react";
import CheckAuth from "../../auth/auth_control";
import LoadingBar from "../../components/loading_bar";
import AdminNavbar from "../../components/admin_navbar";
import AdminSidebar from "../../components/admin_sidebar";
import GetSetting from "../../functions/setting_function";
import { SettingModel } from "../../model/setting_model";
import { ReportContent, ReportDetail, ReportHeader } from "../../components/report_detail";
import { Link } from "react-router-dom";
import { SecretCopyContent, SecretShowContent } from "../../components/secret_content";

const SettingPage = () => {
  
  const [adminInfo, setAdminInfo] = useState({
    name : '...',
    access : 1,
    remainedTime : '...'
  });

  const [adminValue, setAdminValue] = useState<SettingModel>({
    id : 0,
    admin_email : '',
    admin_key : '',
    admin_level : 0,
    admin_name : '',
    admin_password : '',
    admin_phone_number : '',
    admin_status : true,
    unique_id : ''
  });

  const [secretValue, setSecretValue] = useState({
    secret_password : '',
    secret_key : '',
    secret_id : ''
  })
  
  const [isUploading, setIsUploading] = useState(true)

  useEffect(() => {
    const setData = async () => {
      await CheckAuth(setAdminInfo, setIsUploading);
      await GetSetting(setAdminValue,setSecretValue, setIsUploading);
    };
    setData();
  }, [])
  
  return (
    <div className='setting-area'>
      {!isUploading ? (
        <>
          <AdminNavbar name={adminInfo.name} remainedTime={adminInfo.remainedTime} />
          <AdminSidebar accessLevel={adminInfo.access} />
          <div className="admin-area">
            <div className="reportDetailArea">
              <h1>Ayarlar</h1>
              <ReportDetail>
                <ReportHeader header={"Admin İsmi"} />
                <ReportContent content={adminValue.admin_name}/>
              </ReportDetail>

              <ReportDetail>
                <ReportHeader header={"Admin E-Mail Adresi"} />
                <ReportContent content={adminValue.admin_email}/>
              </ReportDetail>

              <ReportDetail>
                <ReportHeader header={"Admin Erişim Seviyesi"} />
                <ReportContent content={`${adminValue.admin_level}. Seviye`}/>
              </ReportDetail>

              <ReportDetail>
                <ReportHeader header={"Admin Şifresi"} />
                <SecretShowContent show_content={secretValue.secret_password} secret_content={adminValue.admin_password}/>
              </ReportDetail>
              
              <ReportDetail>
                <ReportHeader header={"512 Bit Gizli Anahtar"} />
                <SecretCopyContent show_content={secretValue.secret_key} secret_content={adminValue.admin_key}/>
              </ReportDetail>

              <ReportDetail>
                <ReportHeader header={"Admin Telefon Numarası"} />
                <ReportContent content={`+${adminValue.admin_phone_number}`}/>
              </ReportDetail>
              
              <ReportDetail>
                <ReportHeader header={"Hesap Durumu"} />
                <ReportContent content={`${adminValue.admin_status ? 'Aktif Hesap' : 'İnaktif Hesap'}`}/>
              </ReportDetail>

              <ReportDetail>
                <ReportHeader header={"Hesap ID"} />
                <ReportContent content={`${adminValue.id}`}/>
              </ReportDetail>

              <ReportDetail>
                <ReportHeader header={"Hesap Benzersiz ID"} />
                <SecretCopyContent show_content={secretValue.secret_id} secret_content={adminValue.unique_id}/>
              </ReportDetail>
            </div>
          </div>
        </>
      ) : (
        <div className="loading-area">
            <LoadingBar />
        </div>
      )}
    </div>
  )
}

export default SettingPage