import { useEffect, useState } from 'react'
import LoadingBar from '../../components/loading_bar'
import './contact_reports.css';
import AdminNavbar from '../../components/admin_navbar';
import AdminSidebar from '../../components/admin_sidebar';
import './../admin_area.css'
import './../../components/css/report_table.css'
import CheckAuth from '../../auth/auth_control';
import report from '../../functions/report_functions';
import {ProfileReportModel, ContactReportModel} from '../../model/report_model';
function ContactReports() {

  const [adminInfo, setAdminInfo] = useState({
    name : '...',
    access : 1,
    remainedTime : '...'
  });
  const [isUploading, setIsUploading] = useState(true)
  const [readStatus, setReadStatus] = useState(0);
  const [reportList, setReportList] = useState<ContactReportModel[]>([]);
  const [reportAreaStatus, setReportAreaStatus] = useState(true)
  useEffect(() => {
    const setData = async () => {
      await CheckAuth(setAdminInfo, setIsUploading);
      await report.SetReportData('contact',readStatus, setReportList, setReportAreaStatus);
    };
    setData();
  }, [])
  const toShortText = (text : string, maxLength = 50) => {
    return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
  };

  async function ChangeMode() {
    if (readStatus === 0) {
      report.SetReportData('contact',1, setReportList, setReportAreaStatus);
      setReadStatus(1);
    }else{
      report.SetReportData('contact',0, setReportList, setReportAreaStatus);
      setReadStatus(0);
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
                  <div className="reportArea">
                    <div className="mode-area">
                      <h2>Bize Ulaş Bilgileri</h2>
                      <button onClick={ChangeMode}>{readStatus === 0 ? 'Okunmuş ' : 'Okunmamış '} Mesajları Getir </button>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Rapor ID</th>
                          <th>E-Mail Adresi</th>
                          <th>Konu Başlığı</th>
                          <th>Konu İçeriği</th>
                          <th>Okuma Durumu</th>
                          <th>Tarih</th>
                          <th>İşlemler</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportList.map((report) => (
                          <tr key={report.reportId}>
                            <td>{report.reportId}</td>
                            <td>{report.reportEmail}</td>
                            <td>{toShortText(report.subject)}</td>
                            <td>{toShortText(report.content)}</td>
                            <td id='badget-td'>{report.readStatus ? <span className='badget badget-okey'>Okundu</span> : <span className='badget badget badget-error'>Okunmadı</span>}</td>
                            <td>{new Date(report.date).toLocaleDateString('tr-TR')}</td>
                            <td id='button-td'><a id='process' href={`reachWe/${report.reportId}`}>İşlem Yap</a></td>
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

export default ContactReports