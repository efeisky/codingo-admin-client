import { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/admin_navbar';
import CheckAuth from '../../../auth/auth_control';
import AdminSidebar from '../../../components/admin_sidebar';
import LoadingBar from '../../../components/loading_bar';
import { ChangeAdminKey, ChangeAdminStatus, DeleteAdmin, DetailAdminByID } from '../../../functions/admin_functions';
import { AdminModel } from '../../../model/admin_model';
import { useParams } from 'react-router-dom';
import { ReportDetail, ReportHeader, ReportContent } from '../../../components/report_detail';
import { SecretShowContent, SecretCopyContent } from '../../../components/secret_content';

const DetailAdminPage = () => {
    const {id} = useParams()
    const [adminInfo, setAdminInfo] = useState({
      name : '...',
      access : 1,
      remainedTime : '...'
    });
  
    const [isUploading, setIsUploading] = useState(true)
    const [reportAreaStatus, setReportAreaStatus] = useState(false)
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
    const [secretValue, setSecretValue] = useState({
      secret_password : '',
      secret_key : '',
      secret_id : ''
    })
    useEffect(() => {
        const setData = async () => {
          await CheckAuth(setAdminInfo, setIsUploading);
          await DetailAdminByID(parseInt(id!), setAdminValue, setSecretValue, setReportAreaStatus);
        };
        setData();
    }, [])

    const changeStatus = async() => {
      if (adminInfo.name == adminValue.admin_name && adminInfo.access == adminValue.admin_level) {
        await ChangeAdminStatus(adminValue.id, setIsUploading)
      } else {
        alert('Kendi Profilini İnaktif Yapamazsın')
      }
    }
    
    const changeKey = async() => {
      await ChangeAdminKey(adminValue.id, setIsUploading)
    }

    const deleteAccount = async() => {
      if (adminInfo.name == adminValue.admin_name && adminInfo.access == adminValue.admin_level) {
        await DeleteAdmin(adminValue.id, setIsUploading)
      } else {
        alert('Kendi Profilini Silemezsin')
      }
    }
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
                  <div className="reportDetailArea">
                    <h1>Admin Detayları</h1>
                    <ReportDetail>
                        <ReportHeader header={"Admin İsmi"} />
                        <ReportContent content={adminInfo.name == adminValue.admin_name && adminInfo.access == adminValue.admin_level ? `${adminValue.admin_name} (ben)` : adminValue.admin_name}/>
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

                    <div className="actions">
                        {
                          adminInfo.name == adminValue.admin_name && adminInfo.access == adminValue.admin_level ? (<></>) : (<button onClick={changeStatus}>Hesap Durumunu Değiştir</button>)
                        }
                        <button onClick={changeKey}>Hesap Key Değiştir</button>
                        {
                          adminInfo.name == adminValue.admin_name && adminInfo.access == adminValue.admin_level ? (<></>) : (<button onClick={deleteAccount}>Hesap Sil</button>)
                        }
                    </div>
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

export default DetailAdminPage