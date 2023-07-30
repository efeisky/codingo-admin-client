import { useEffect, useState } from "react";
import CheckAuth from "../../../auth/auth_control";
import LoadingBar from "../../../components/loading_bar";
import AdminNavbar from "../../../components/admin_navbar";
import AdminSidebar from "../../../components/admin_sidebar";
import './set_question.css'
import QuestionTypes from "../../../types/question_type";
import CustomSelect from "../../../components/custom_selectbox";
import Option from './../../../interfaces/select_option_interface';
import {setLessonSelectBox, setClassSelectBox, setLessonOptions, setSubjectSelectBox} from './../../../functions/question_functions'
import { Link } from "react-router-dom";
import { lessonOption, classOption } from "../../../interfaces/option_lists";

const SetQuestion = () => {
    const [adminInfo, setAdminInfo] = useState({
        name : '...',
        access : 1,
        remainedTime : '...'
    });

    const [isUploading, setIsUploading] = useState(true)
    const [questionAreaLoading, setQuestionAreaLoading] = useState(false);

    useEffect(() => {
        CheckAuth(setAdminInfo, setIsUploading)
    }, [])
  
    const [questionType, setQuestionType] = useState<QuestionTypes>(QuestionTypes.NounSelected);

    const [questionFeatures, setQuestionFeatures] = useState({
        question_lesson : { value: '', label: '' },
        question_class : { value: '', label: '' },
        question_subject : { value: '', label: '' },
    })

    const [lessonSubjectOption, setLessonSubjectOption] = useState<Option[]>([])
    const [lessonSubjectStatus, setLessonSubjectStatus] = useState(false)
    const SetLessonOptions = async() => {
        await setLessonOptions(questionFeatures, setQuestionAreaLoading, setLessonSubjectOption);
    }
    const selectedLesson = async(option : Option) => {
        if (questionFeatures.question_lesson.value === option.value) {
            alert('Bu ders zaten seçili durumda.')
        }else{
            await setLessonSelectBox(option, setQuestionFeatures,setQuestionAreaLoading);
        }
    }
    
    const selectedClass = async(option : Option) => {
        if (questionFeatures.question_class.value === option.value) {
            alert('Bu sınıf zaten seçili durumda.')
        }else{
            await setClassSelectBox(option, setQuestionFeatures,setQuestionAreaLoading);
        }
    }

    const selectedSubject = async(option : Option) => {
        if (questionFeatures.question_subject.value === option.value) {
            alert('Bu konu zaten seçili durumda.')
        }else{
            await setSubjectSelectBox(option, setQuestionFeatures,setQuestionAreaLoading);
        }
    }

    useEffect(() => {
        const CheckValues = async() => {
            if (questionFeatures.question_class.value !== '' && questionFeatures.question_lesson.value !== '') {
                await SetLessonOptions();
            }
        }
        CheckValues()
    }, [questionFeatures])

    useEffect(() => {
      if (questionFeatures.question_class.value !== '' && questionFeatures.question_lesson.value !== '') {
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
                <h1>Soru Kayıt Ekranı</h1>
                <div className="question-create-type-area">
                    <button onClick={()=>{setQuestionType(QuestionTypes.Manual)}}>Manual Soru Oluşturma</button>
                    <button onClick={()=>{setQuestionType(QuestionTypes.AI)}}>Yapay Zeka ile Soru Oluşturma</button>
                </div>
                {
                    questionType !== QuestionTypes.NounSelected ? (
                        
                    <div className="question-make-area">
                        <h2>{questionType === QuestionTypes.Manual ? 'Manual Soru Kayıt' : 'Yapay Zeka Soru Kayıt'}</h2>
                        {
                            !questionAreaLoading ? (
                                <>
                                    <div className="select-set">
                                        <label id='selectLabel'>Ders Seçimi</label>
                                        <CustomSelect options={lessonOption} default={questionFeatures.question_lesson.label} onSelected={(option)=>{selectedLesson(option)}} />
                                    </div>
                                    <div className="select-set">
                                        <label id='selectLabel'>Sınıf Seçimi</label>
                                        <CustomSelect options={classOption} default={questionFeatures.question_class.label} onSelected={(option)=>{selectedClass(option)}} />
                                    </div>
                                    {lessonSubjectStatus
                                    ? (
                                        <div className="select-set">
                                            <label id='selectLabel'>Ders Konusu Seçimi</label>
                                            <CustomSelect options={lessonSubjectOption} default={questionFeatures.question_subject.label} onSelected={(option)=>{selectedSubject(option)}} />
                                        </div>
                                    )
                                    : (<></>)
                                    }
                                    {lessonSubjectStatus && questionFeatures.question_subject.value != ''
                                    ? (
                                        <Link to={`${questionFeatures.question_subject.value}?type=${questionType}`}>
                                            <button id="question-button">{questionType == QuestionTypes.Manual ? 'Manual Soru Ekle' : 'Yapay Zeka ile Soru Ekle'}</button>
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

export default SetQuestion