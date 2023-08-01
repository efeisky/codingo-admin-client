import {useState, useEffect} from 'react'
import CheckAuth from '../../../auth/auth_control'
import LoadingBar from '../../../components/loading_bar';
import AdminNavbar from '../../../components/admin_navbar';
import AdminSidebar from '../../../components/admin_sidebar';
import CustomSelect from '../../../components/custom_selectbox';
import { lessonOption, classOption } from '../../../interfaces/option_lists';
import Option from './../../../interfaces/select_option_interface';
import { AddLessonFunction, setClassSelectBox, setLessonSelectBox } from '../../../functions/lesson_functions';
import './set_lesson.css'
import { ReportContent, ReportDetail, ReportHeader } from '../../../components/report_detail';
import { LessonModel } from '../../../model/lesson_model';
const SetLesson = () => {
    const [adminInfo, setAdminInfo] = useState({
        name : '...',
        access : 1,
        remainedTime : '...'
    });

    const [isUploading, setIsUploading] = useState(true)

    const [lessonFeatures, setLessonFeatures] = useState({
        lesson_type : { value: '', label: '' },
        lesson_class : { value: '', label: '' },
        lesson_subject : '',
    })
    const [lessonSubjectStatus, setLessonSubjectStatus] = useState(false)
    
    useEffect(() => {
        CheckAuth(setAdminInfo, setIsUploading)
    }, [])

    const selectedLesson = async(option : Option) => {
        if (lessonFeatures.lesson_type.value === option.value) {
            alert('Bu ders zaten seçili durumda.')
        }else{
            await setLessonSelectBox(option, setLessonFeatures,setIsUploading);
        }
    }
    
    const selectedClass = async(option : Option) => {
        if (lessonFeatures.lesson_class.value === option.value) {
            alert('Bu sınıf zaten seçili durumda.')
        }else{
            await setClassSelectBox(option, setLessonFeatures,setIsUploading);
        }
    }

    useEffect(() => {
        const CheckValues = async() => {
            if (lessonSubjectStatus) {
                if (lessonFeatures.lesson_class.value === '' && lessonFeatures.lesson_type.value === '') {
                    setLessonSubjectStatus(false);
                }
            } else {
                if (lessonFeatures.lesson_class.value !== '' && lessonFeatures.lesson_type.value !== '') {
                    setLessonSubjectStatus(true);
                }
            }
        }
        CheckValues()
    }, [lessonFeatures])

    const saveLesson = async() => {
        const lesson = new LessonModel({
            lesson_type : lessonFeatures.lesson_type.value,
            lesson_class : lessonFeatures.lesson_class.value,
            lesson_subject : lessonFeatures.lesson_subject
        })
        await AddLessonFunction(lesson, setIsUploading)
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
                <h1>Ders Ekleme Ekranı</h1>
                    <div className="lesson-make-area">
                        <div className="select-set">
                            <label id='selectLabel'>Ders Seçimi</label>
                            <CustomSelect options={lessonOption} default={lessonFeatures.lesson_type.label} onSelected={(option)=>{selectedLesson(option)}} />
                        </div>
                        
                        <div className="select-set">
                            <label id='selectLabel'>Sınıf Seçimi</label>
                            <CustomSelect options={classOption} default={lessonFeatures.lesson_class.label} onSelected={(option)=>{selectedClass(option)}} />
                        </div>
                        
                        {lessonSubjectStatus
                        ? (
                            <div className="select-set">
                                <ReportDetail>
                                    <ReportHeader header={'Ders Konusu Girişi'}/>
                                    <ReportContent content={lessonFeatures.lesson_subject} onChange={(e)=>{
                                        setLessonFeatures((prevFeatures: any) => ({
                                            ...prevFeatures,
                                            lesson_subject: e.target.value,
                                        }));
                                    }} type='input'/>
                                </ReportDetail>
                            </div>
                        )
                        : (<></>)
                        }
                        {lessonSubjectStatus && lessonFeatures.lesson_subject !== ''
                        ? (
                            <button id="question-button" onClick={saveLesson}>Dersi Kaydet</button>
                        )
                        : (<></>)
                        }
                    </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default SetLesson