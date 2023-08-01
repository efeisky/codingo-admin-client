import axios from 'axios';
import {ProfileReportModel, ContactReportModel} from '../model/report_model';
const SetReportData = async (reportType, readStatus, setReportList, setReportAreaStatus) => {
    setReportAreaStatus(true);
    const {data} = await axios.get(
      reportType === 'profile' ? 'https://codingo-admin-backend.onrender.com/reports/profileReports' : 'https://codingo-admin-backend.onrender.com/reports/contactReports',
      {
        params : {
            read_status : readStatus
        }
      }
    )
    if(data.status){
        const report_list = [...data.report_data];
        let modeled_list;
        if (reportType === 'profile') {
            modeled_list = report_list.map((report) => {
                return new ProfileReportModel(report)
            })
        }else{
            modeled_list = report_list.map((report) => {
                return new ContactReportModel(report)
            })
        }
        setReportList([
            ...modeled_list
        ])
    }else{
        alert(`Bir problem oluştu : ${data.error}`);
        setReportList(null)
    }
    setReportAreaStatus(false);
}
const GetReportDetail = async(reportType, reportId, setReportData, setIsDetailsLoading) => {
    setIsDetailsLoading(true);
    const {data} = await axios.get(
      reportType === 'profile' ? 'https://codingo-admin-backend.onrender.com/reports/profileDetail' : 'https://codingo-admin-backend.onrender.com/reports/contactDetail',
      {
        params : {
            reportId : reportId
        }
      }
    )
    console.log(data);
    if(data.status){
        let modeled_data;
        if (reportType === 'profile') {
            modeled_data = new ProfileReportModel(data.report_data)
        }else{
            modeled_data = new ContactReportModel(data.report_data)
        }
        
        setReportData(
            modeled_data
        )
    }else{
        alert(`Bir problem oluştu : ${data.error}`);
        setReportData(null)
    }
    setIsDetailsLoading(false);
}
const ChangeReportStatus = async(reportType, reportId, activeStatus, setIsDetailsLoading) => {
    setIsDetailsLoading(true);
    const { data } = await axios.patch('https://codingo-admin-backend.onrender.com/reports/changeStatus', {
        reportType: reportType,
        reportId: reportId,
        activeStatus: activeStatus,
    });
    if(data.status){
        window.location.reload()
    }else{
        alert(`Bir problem oluştu !`);
    }
    setIsDetailsLoading(false);
}
export default {
    SetReportData,
    GetReportDetail,
    ChangeReportStatus
};