import {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import CheckAuth from '../../../../auth/auth_control';
import LoadingBar from '../../../../components/loading_bar';
import AdminNavbar from '../../../../components/admin_navbar';
import AdminSidebar from '../../../../components/admin_sidebar';
import {QuestionTypes} from '../../../../types/question_type';
import { AddQuestionFunction, setCreateQuestionAsAI } from '../../../../functions/question_functions';
import { QuestionMakeModel } from '../../../../model/question_model';
import { ReportContent, ReportDetail, ReportHeader } from '../../../../components/report_detail';
import CustomSelect from '../../../../components/custom_selectbox';
import { typeOptions,levelOptions,answerOptions } from '../../../../interfaces/option_lists';


const QuestionSetByID = () => {
    const { id } = useParams();

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [adminInfo, setAdminInfo] = useState({
        name : '...',
        access : 1,
        remainedTime : '...'
    });
    const [isUploading, setIsUploading] = useState(true)
    const [isDetailsUploading, setIsDetailsUploading] = useState(true)
    const [question, setQuestion] = useState<QuestionMakeModel>({
        a : '',
        b : '',
        c : '',
        d : '',
        answer : '',
        type : '',
        content : '',
        level : '',
    })
    const [questionList, setQuestionList] = useState<QuestionMakeModel[]>([]);
    const addQuestionToList = (newQuestion: QuestionMakeModel) => {
        setQuestionList(prevQuestionList => [...prevQuestionList, newQuestion]);
    };
    useEffect(() => {
        if (questionList.length > 0) {
            addQuestionFromList();
        }
    }, [questionList])
    
    const [isOpenedEverything, setIsOpenedEverything] = useState(false)
    useEffect(() => {
        const setData = async () => {
            await CheckAuth(setAdminInfo, setIsUploading);
            if (QuestionTypes.Manual == params.get('type')) {
                if (params.get('fromUrl')== QuestionTypes.AI) {
                    const json_data = JSON.parse(sessionStorage.getItem('edited-question')!);
                    setQuestion(new QuestionMakeModel(json_data));
                    setIsDetailsUploading(false)
                }else{
                    setIsOpenedEverything(true)
                    setIsDetailsUploading(false)
                }
            } else {
                if (id) {
                    const questionValue = await setCreateQuestionAsAI(parseInt(id), setIsDetailsUploading);
                    if (questionValue.status && questionValue.question != null) {
                        setQuestion({
                            ...questionValue.question
                        });
                    } else {
                        alert('Soru oluşturma başarısız gerçekleşti !')
                    }
                }else{
                    window.location.href = '/lessons/setQuestion'
                } 
            }
        };
        setData();
    }, [])

    const addQuestion = async()=> {
        await AddQuestionFunction(question, parseInt(id!), setIsDetailsUploading)
        alert("Soru eklenmiştir")
    }
    const addQuestionFromList = async () => {
        for (let i = 0; i < questionList.length; i++) {
            await AddQuestionFunction(questionList[i], parseInt(id!), setIsDetailsUploading);
            if (i >= 3) {
                await wait(1000); // 1 saniye bekle
            }
        }
        alert("Sorular eklenmiştir");
    }
    
    const wait = async (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const editQuestion = async()=> {
        sessionStorage.setItem('edited-question',JSON.stringify(question));
        window.location.href = `${id}?type=${QuestionTypes.Manual}&fromUrl=${QuestionTypes.AI}`
    }
    const dataPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const pastedText = e.clipboardData.getData('text');
      
        try {
          const parsedData = JSON.parse(pastedText);
        
          if (!Array.isArray(parsedData)) {
            if (parsedData && typeof parsedData === 'object') {
                if (
                    'a' in parsedData &&
                    'b' in parsedData &&
                    'c' in parsedData &&
                    'd' in parsedData &&
                    'answer' in parsedData &&
                    'type' in parsedData &&
                    'content' in parsedData &&
                    'level' in parsedData
                  ) {
                    alert('Yapıştırdığınız metin uygulanıyor..');
                    setQuestion(parsedData)
                  } else {
                    alert('Yapıştırdığınız metin ana değerleri içermiyor!');
                  }
              } else {
                alert('Yapıştırdığınız metin kontrol edilebilir değil!')
              }
          }else{
            parsedData.map((question_sample) => {
                if (question_sample && typeof question_sample === 'object') {
                    if (
                        'a' in question_sample &&
                        'b' in question_sample &&
                        'c' in question_sample &&
                        'd' in question_sample &&
                        'answer' in question_sample &&
                        'type' in question_sample &&
                        'content' in question_sample &&
                        'level' in question_sample
                      ) {
                        addQuestionToList(question_sample);
                      } else {
                        alert('Yapıştırdığınız metin ana değerleri içermiyor!');
                      }
                  } else {
                    alert('Yapıştırdığınız metin kontrol edilebilir değil!')
                  }
            })
          }
          
        } catch (error) {
            alert('Yapıştırdığınız metin kontrol edilebilir değil!')
        }
      };
      const paste_area_value = `
        Sen bir eğitim amaçlı soru üreticisin. Kullanıcıdan konu içeriği alarak onunla alakalı sorular üreteceksin. Üreteceğin format aşağıda yer almaktadır
        [
        {
        status : true
        level : Soru Seviyesi easy medium hard very-hard
        type : standart
        content : Soru İçeriği
        a : A şıkkı
        b : B şıkkı
        c : C şıkkı
        d : D şıkkı
        answer : Soru Cevabı A ise 1, B ise 2, C ise 3, D ise 4
        }
        ]

        Eğer soru üretemiyorsan 
        {
        status : false
        }
        döndür ve hiç bir cevap verme. Vereceğin cevaplar yukarıdaki formatlarda olmak zorundadır.

        Konu İçeriği : (Kullanıcı Burayı Ayarlayacak)
        Sadece bu jsonu döndür. Başka mesaj döndürme!
        8 tane soru üret. Liste halinde olsun.
      `
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
                            !isDetailsUploading ?
                            (
                                <>
                                    <h1>{params.get('type') == QuestionTypes.Manual ? 'Manual' : 'Yapay Zeka ile'} Soru Oluşturma</h1>
                                    <div className="reportDetailArea">
                                        <ReportDetail>
                                            <ReportHeader header={'Soruyu Yapıştır'}/>
                                            {params.get('type') == QuestionTypes.Manual ? <textarea placeholder='JSON yapıda destekler' value={paste_area_value} onPaste={dataPaste}></textarea> : null}
                                        </ReportDetail>
                                        <ReportDetail>
                                            <ReportHeader header={'Soru Tipi'}/>
                                            {isOpenedEverything
                                            ? (
                                                <CustomSelect 
                                                options={typeOptions} 
                                                default={question.type} 
                                                onSelected={(option)=>{
                                                    setQuestion((prevValues)=>({
                                                        ...prevValues,
                                                        type : option.value
                                                    }))}}
                                                />
                                            )
                                            : (
                                                <ReportContent content={question.type} />
                                            )
                                            }
                                        </ReportDetail>

                                        <ReportDetail>
                                            <ReportHeader header={'Soru Zorluğu'}/>
                                            {isOpenedEverything
                                            ? (
                                                <CustomSelect 
                                                options={levelOptions} 
                                                default={question.level} 
                                                onSelected={(option)=>{
                                                    setQuestion((prevValues)=>({
                                                        ...prevValues,
                                                        level : option.value
                                                    }))}}
                                                />
                                            )
                                            : (
                                                <ReportContent content={question.level} />
                                            )
                                            }
                                        </ReportDetail>
                                        
                                        <ReportDetail>
                                            <ReportHeader header={'Soru İçeriği'}/>
                                            {params.get('type') == QuestionTypes.Manual ? 
                                            <ReportContent 
                                                content={question.content} 
                                                type='textarea' 
                                                editable={true}
                                                onChange={(e)=>{
                                                    setQuestion((prevValues)=>({
                                                        ...prevValues,
                                                        content : e.target.value
                                                    }))
                                                }}
                                            /> : 
                                            <ReportContent content={question.content} type='textarea' />
                                            }
                                        </ReportDetail>
                                        
                                        <ReportDetail>
                                            <ReportHeader header={'A Şıkkı'}/>
                                            {params.get('type') == QuestionTypes.Manual ? 
                                            <ReportContent 
                                                content={question.a} 
                                                type='textarea' 
                                                editable={true}
                                                onChange={(e)=>{
                                                    setQuestion((prevValues)=>({
                                                        ...prevValues,
                                                        a : e.target.value
                                                    }))
                                                }}
                                            /> : 
                                            <ReportContent content={question.a} type='textarea' />
                                            }
                                            
                                        </ReportDetail>

                                        <ReportDetail>
                                            <ReportHeader header={'B Şıkkı'}/>
                                            {params.get('type') == QuestionTypes.Manual ? 
                                            <ReportContent 
                                                content={question.b} 
                                                type='textarea' 
                                                editable={true}
                                                onChange={(e)=>{
                                                    setQuestion((prevValues)=>({
                                                        ...prevValues,
                                                        b : e.target.value
                                                    }))
                                                }}
                                            /> : 
                                            <ReportContent content={question.b} type='textarea' />
                                            }
                                        </ReportDetail>

                                        <ReportDetail>
                                            <ReportHeader header={'C Şıkkı'}/>
                                            {params.get('type') == QuestionTypes.Manual ? 
                                            <ReportContent 
                                                content={question.c} 
                                                type='textarea' 
                                                editable={true}
                                                onChange={(e)=>{
                                                    setQuestion((prevValues)=>({
                                                        ...prevValues,
                                                        c : e.target.value
                                                    }))
                                                }}
                                            /> : 
                                            <ReportContent content={question.c} type='textarea' />
                                            }
                                        </ReportDetail>
                                        
                                        <ReportDetail>
                                            <ReportHeader header={'D Şıkkı'}/>
                                            {params.get('type') == QuestionTypes.Manual ? 
                                            <ReportContent 
                                                content={question.d} 
                                                type='textarea' 
                                                editable={true}
                                                onChange={(e)=>{
                                                    setQuestion((prevValues)=>({
                                                        ...prevValues,
                                                        d : e.target.value
                                                    }))
                                                }}
                                            /> : 
                                            <ReportContent content={question.d} type='textarea' />
                                            }
                                        </ReportDetail>
                                        
                                        <ReportDetail>
                                            <ReportHeader header={'Soru Cevabı'}/>
                                            
                                            {isOpenedEverything
                                            ? (
                                                <CustomSelect 
                                                options={answerOptions} 
                                                default={question.answer} 
                                                onSelected={(option)=>{
                                                    setQuestion((prevValues)=>({
                                                        ...prevValues,
                                                        answer : option.value
                                                    }))}}
                                                />
                                            )
                                            : (
                                                <ReportContent 
                                                    content={question.answer === 1 ? 'A Şıkkı' : question.answer === 2 ? 'B Şıkkı' : question.answer === 3 ? 'C Şıkkı' : question.answer === 4 ? 'D Şıkkı' : 'Geçersiz cevap'}
                                                />
                                            )
                                            }
                                        </ReportDetail>
                                        <div className="actions">
                                            <button onClick={addQuestion}>Soruyu Ekle</button>
                                            
                                            {params.get('type') == QuestionTypes.AI ? 
                                            (<button onClick={editQuestion}>Soruyu Düzenle</button>) : null}
                                        </div>
                                    </div>
                                </>
                            ) : 
                            (
                                <LoadingBar/>
                            )
                        }
                    </div>
                    </>
                )
            }
        </>
    )
}

export default QuestionSetByID
