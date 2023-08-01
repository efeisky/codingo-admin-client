import { useEffect, useState } from "react";
import CheckAuth from "../../../auth/auth_control";
import LoadingBar from "../../../components/loading_bar";
import AdminNavbar from "../../../components/admin_navbar";
import AdminSidebar from "../../../components/admin_sidebar";
import './set_information.css'
import { InformationTypes } from "../../../types/question_type";
import CustomSelect from "../../../components/custom_selectbox";
import Option from './../../../interfaces/select_option_interface';
import {setLessonSelectBox, setClassSelectBox, setLessonOptions, setSubjectSelectBox} from './../../../functions/information_functions'
import { Link } from "react-router-dom";
import { lessonOption, classOption } from "../../../interfaces/option_lists";
const SetInformation = () => {
    const [adminInfo, setAdminInfo] = useState({
        name : '...',
        access : 1,
        remainedTime : '...'
    });

    const [isUploading, setIsUploading] = useState(true)
    const [informationAreaLoading, setInformationAreaLoading] = useState(false);

    useEffect(() => {
        CheckAuth(setAdminInfo, setIsUploading)
    }, [])
  
    const [informationType, setInformationType] = useState<InformationTypes>(InformationTypes.NounSelected);

    const [informationFeatures, setInformationFeatures] = useState({
        information_lesson : { value: '', label: '' },
        information_class : { value: '', label: '' },
        information_subject : { value: '', label: '' },
    })

    const [lessonSubjectOption, setLessonSubjectOption] = useState<Option[]>([])
    const [lessonSubjectStatus, setLessonSubjectStatus] = useState(false)
    const SetLessonOptions = async() => {
        await setLessonOptions(informationFeatures, setInformationAreaLoading, setLessonSubjectOption);
    }
    const selectedLesson = async(option : Option) => {
        if (informationFeatures.information_lesson.value === option.value) {
            alert('Bu ders zaten seçili durumda.')
        }else{
            await setLessonSelectBox(option, setInformationFeatures,setInformationAreaLoading);
        }
    }
    
    const selectedClass = async(option : Option) => {
        if (informationFeatures.information_class.value === option.value) {
            alert('Bu sınıf zaten seçili durumda.')
        }else{
            await setClassSelectBox(option, setInformationFeatures,setInformationAreaLoading);
        }
    }

    const selectedSubject = async(option : Option) => {
        if (informationFeatures.information_subject.value === option.value) {
            alert('Bu konu zaten seçili durumda.')
        }else{
            await setSubjectSelectBox(option, setInformationFeatures,setInformationAreaLoading);
        }
    }

    useEffect(() => {
        const CheckValues = async() => {
            if (informationFeatures.information_class.value !== '' && informationFeatures.information_lesson.value !== '') {
                await SetLessonOptions();
            }
        }
        CheckValues()
    }, [informationFeatures])

    useEffect(() => {
      if (informationFeatures.information_class.value !== '' && informationFeatures.information_lesson.value !== '') {
        setLessonSubjectStatus(true)
      }
    }, [lessonSubjectOption])
    
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
                <h1>Bilgilendirme Ekranı</h1>
                {
                    informationType === InformationTypes.NounSelected ? (
                        <div className="question-create-type-area">
                            <button onClick={()=>{setInformationType(InformationTypes.Manual)}}>Manual Bilgilendirme Oluşturma</button>
                            <button onClick={()=>{setInformationType(InformationTypes.AI)}}>Yapay Zeka ile Bilgilendirme Oluşturma</button>
                        </div>
                    ) : null
                }
                {
                    informationType !== InformationTypes.NounSelected ? (
                        
                    <div className="information-make-area">
                        <h2>{informationType === InformationTypes.Manual ? 'Manual Bilgilendirme Oluştur' : 'Yapay Zeka ile Bilgilendirme Oluştur'}</h2>
                        {
                            !informationAreaLoading ? (
                                <>
                                    <div className="select-set">
                                        <label id='selectLabel'>Ders Seçimi</label>
                                        <CustomSelect options={lessonOption} default={informationFeatures.information_lesson.label} onSelected={(option)=>{selectedLesson(option)}} />
                                    </div>
                                    <div className="select-set">
                                        <label id='selectLabel'>Sınıf Seçimi</label>
                                        <CustomSelect options={classOption} default={informationFeatures.information_class.label} onSelected={(option)=>{selectedClass(option)}} />
                                    </div>
                                    {lessonSubjectStatus
                                    ? (
                                        <div className="select-set">
                                            <label id='selectLabel'>Ders Konusu Seçimi</label>
                                            <CustomSelect options={lessonSubjectOption} default={informationFeatures.information_subject.label} onSelected={(option)=>{selectedSubject(option)}} />
                                        </div>
                                    )
                                    : (<></>)
                                    }
                                    {lessonSubjectStatus && informationFeatures.information_subject.value != ''
                                    ? (
                                        <Link to={`${informationFeatures.information_subject.value}?type=${informationType}`}>
                                            <button id="question-button">Başla</button>
                                        </Link>
                                    )
                                    : (<></>)
                                    }
                                </>
                            ) : (
                                <LoadingBar/>
                            )
                        }
                    </div>
                    ) : (
                        <></>
                    )
                }
            </div>
          </>
        )
      }
    </div>
  )
}

export default SetInformation


