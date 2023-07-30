import { Link, useParams } from 'react-router-dom';
import AdminNavbar from '../../../components/admin_navbar';
import AdminSidebar from '../../../components/admin_sidebar';
import { useEffect, useState } from 'react';
import report from '../../../functions/report_functions';
import CheckAuth from '../../../auth/auth_control';
import {ContactReportModel} from '../../../model/report_model';
import LoadingBar from '../../../components/loading_bar';
import { ReportDetail, ReportHeader, ReportContent } from '../../../components/report_detail';

const ContactDetailReport = () => {
    const { id } = useParams();

    const [adminInfo, setAdminInfo] = useState({
        name : '...',
        access : 1,
        remainedTime : '...'
    });
    const [isUploading, setIsUploading] = useState(true)
    const [isDetailsUploading, setIsDetailsUploading] = useState(true)
    const [reportData, setReportData] = useState<ContactReportModel>({
        reportId : id,
        readStatus : false,
        date : '',
        content : '',
        reportEmail : '',
        subject : ''
    })
    useEffect(() => {
        const setData = async () => {
            await CheckAuth(setAdminInfo, setIsUploading);
            await report.GetReportDetail('contact',id,setReportData,setIsDetailsUploading)
        };
        setData();
    }, [])
    async function ChangeStatus() {
        await report.ChangeReportStatus('contact',reportData.reportId,reportData.readStatus,setIsDetailsUploading)
    }
    return (
        <>
            {
                isUploading 
                ? 
                (
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
                            isDetailsUploading ? 
                            (
                                <LoadingBar/>
                            ) : (
                                
                                <div className="reportDetailArea">
                                    <Link to={'/reports/reachWe'} id='back-link'>Tüm Bize Ulaşınlara Git</Link>
                                    <h1>Şikayet Detayları</h1>
                                    <ReportDetail>
                                        <ReportHeader header={'Rapor ID'}/>
                                        <ReportContent content={reportData.reportId}/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'E-Mail Adresi'}/>
                                        <ReportContent content={reportData.reportEmail}/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Konu Başlığı'}/>
                                        <ReportContent content={reportData.subject} type='textarea'/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Konu İçeriği	'}/>
                                        <ReportContent content={reportData.content} type='textarea'/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Okunma Durumu'}/>
                                        <ReportContent content={reportData.readStatus == true ? 'İşlem Yapıldı' : 'İşlem Henüz Yapılmadı'}/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Mesaj Tarihi'}/>
                                        <ReportContent content={new Date(reportData.date).toLocaleDateString('tr-TR')}/>
                                    </ReportDetail>

                                    <h1>Mesaj İşlemleri</h1>
                                    <div className="actions">
                                        <a href={`mailto:${reportData.reportEmail}`}><button>Kişiye Yanıt Gönder</button></a>
                                        <button onClick={ChangeStatus}>Şikayet Durumunu Değiştir</button>
                                    </div>
                                </div>
                                
                            )
                        }
                    </div>
                    </>
                )
            }
            
        </>
    )
}

export default ContactDetailReport