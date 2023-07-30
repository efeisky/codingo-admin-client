import { Link, useParams } from 'react-router-dom';
import AdminNavbar from '../../../components/admin_navbar';
import AdminSidebar from '../../../components/admin_sidebar';
import { useEffect, useState } from 'react';
import report from '../../../functions/report_functions';
import CheckAuth from '../../../auth/auth_control';
import {ProfileReportModel} from '../../../model/report_model';
import LoadingBar from '../../../components/loading_bar';
import { ReportDetail, ReportHeader, ReportContent } from '../../../components/report_detail';

const ProfileDetailReport = () => {
    const { id } = useParams();

    const [adminInfo, setAdminInfo] = useState({
        name : '...',
        access : 1,
        remainedTime : '...'
    });
    const [isUploading, setIsUploading] = useState(true)
    const [isDetailsUploading, setIsDetailsUploading] = useState(true)
    const [reportData, setReportData] = useState<ProfileReportModel>({
        reportId : id,
        readStatus : false,
        date : '',
        content : '',
        complainedUser : '',
        complainingUser : '',
        complainedEmail : '',
        complainingEmail : ''
    })
    useEffect(() => {
        const setData = async () => {
            await CheckAuth(setAdminInfo, setIsUploading);
            await report.GetReportDetail('profile',id,setReportData,setIsDetailsUploading)
        };
        setData();
    }, [])
    async function ChangeStatus() {
        await report.ChangeReportStatus('profile',reportData.reportId,reportData.readStatus,setIsDetailsUploading)
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
                                    <Link to={'/reports/profileReports'} id='back-link'>Tüm Şikayetlere Git</Link>
                                    <h1>Şikayet Detayları</h1>
                                    <ReportDetail>
                                        <ReportHeader header={'Şikayet ID'}/>
                                        <ReportContent content={reportData.reportId}/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Şikayet Eden Kullanıcı'}/>
                                        <ReportContent content={reportData.complainingUser} type='link'/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Şikayet Edilen Kullanıcı'}/>
                                        <ReportContent content={reportData.complainedUser} type='link'/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Şikayet Sebebi'}/>
                                        <ReportContent content={reportData.content} type='textarea'/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Şikayet Durumu'}/>
                                        <ReportContent content={reportData.readStatus == true ? 'İşlem Yapıldı' : 'İşlem Henüz Yapılmadı'}/>
                                    </ReportDetail>
                                    
                                    <ReportDetail>
                                        <ReportHeader header={'Şikayet Tarihi'}/>
                                        <ReportContent content={new Date(reportData.date).toLocaleDateString('tr-TR')}/>
                                    </ReportDetail>

                                    <h1>Şikayet İşlemleri</h1>
                                    <div className="actions">
                                        <a href={`mailto:${reportData.complainingEmail}`}><button>Şikayet Edene Yanıt Gönder</button></a>
                                        <a href={`mailto:${reportData.complainedEmail}`}><button>Şikayet Edilene Yanıt Gönder</button></a>
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

export default ProfileDetailReport