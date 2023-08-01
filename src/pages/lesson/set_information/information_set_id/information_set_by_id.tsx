import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CheckAuth from '../../../../auth/auth_control';
import LoadingBar from '../../../../components/loading_bar';
import AdminNavbar from '../../../../components/admin_navbar';
import AdminSidebar from '../../../../components/admin_sidebar';
import { InformationTypes, QuestionTypes } from '../../../../types/question_type';
import { AddInformationFunction, setCreateInformationAsAI } from '../../../../functions/information_functions';
import { ReportContent, ReportDetail, ReportHeader } from '../../../../components/report_detail';
import { InformationModel } from '../../../../model/information_model';

const InformationSetByID = () => {
  const { id } = useParams();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [adminInfo, setAdminInfo] = useState({
    name: '...',
    access: 1,
    remainedTime: '...'
  });
  const [isUploading, setIsUploading] = useState(true);
  const [isDetailsUploading, setIsDetailsUploading] = useState(true);
  const [information, setInformation] = useState<InformationModel>({
    status : true,
    information_content: '',
    video_src: ''
  });
  const [isOpenedEverything, setIsOpenedEverything] = useState(false);

  useEffect(() => {
    const setData = async () => {
      await CheckAuth(setAdminInfo, setIsUploading);
      if (InformationTypes.Manual === params.get('type')) {
        if (params.get('fromUrl') === QuestionTypes.AI) {
          const json_data = JSON.parse(sessionStorage.getItem('edited-information')!);
          setIsOpenedEverything(true);
          setInformation(new InformationModel(json_data));
          setIsDetailsUploading(false);
        } else {
          setIsOpenedEverything(true);
          setIsDetailsUploading(false);
        }
      } else {
        if (id) {
          const informationValue = await setCreateInformationAsAI(parseInt(id), setIsDetailsUploading);
          if (informationValue.status && informationValue.information !== null) {
            setInformation({
              ...informationValue.information
            });
          } else {
            alert('Bilgilendirme oluşturma başarısız gerçekleşti!');
          }
        } else {
          window.location.href = '/lessons/setInformation';
        }
      }
    };
    setData();
  }, []);

  const addInformation = async () => {
    await AddInformationFunction(information, parseInt(id!), setIsDetailsUploading);
  };

  const editInformation = async () => {
    sessionStorage.setItem('edited-information', JSON.stringify(information));
    window.location.href = `${id}?type=${QuestionTypes.Manual}&fromUrl=${QuestionTypes.AI}`;
  };

  const dataPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');

    try {
      const parsedData = JSON.parse(pastedText);

      if (parsedData && typeof parsedData === 'object') {
        if ('video_src' in parsedData && 'information_content' in parsedData) {
          alert('Yapıştırdığınız metin uygulanıyor..');
          setInformation(new InformationModel(parsedData));
        } else {
          alert('Yapıştırdığınız metin ana değerleri içermiyor!');
        }
      } else {
        alert('Yapıştırdığınız metin kontrol edilebilir değil!');
      }
    } catch (error) {
      alert('Yapıştırdığınız metin kontrol edilebilir değil!');
    }
  };

  const paste_area_value = `
    Sen bir eğitim amaçlı bilgilendirme üreticisin. Kullanıcıdan konu içeriği alarak onunla alakalı bilgilendirmeler üreteceksin. Üreteceğin format aşağıda yer almaktadır

    {
      status: true,
      video_src: '', // bu konuyla alakalı bir videonun url'i olacak youtube ağırlıklı ve link çalışsın
      information_content: '', // bu html'deki p etiketini kullanabileceğin ve konuyu detaylıca anlatacağın kısım
    }

    Eğer bilgilendirme üretemiyorsan 
    {
      status: false,
    }
    döndür ve hiçbir cevap verme. Vereceğin cevaplar yukarıdaki formatlarda olmak zorundadır.

    Sadece bu json'u döndür. Başka mesaj döndürme!
  `;
    
  return (
    <>
      {isUploading ? (
        <div className="loading-area">
          <div className="load-content">
            <LoadingBar />
            <div id="loadingText">Sayfa Ayarlanıyor..</div>
          </div>
        </div>
      ) : (
        <>
          <AdminNavbar name={adminInfo.name} remainedTime={adminInfo.remainedTime} />
          <AdminSidebar accessLevel={adminInfo.access} />
          <div className="admin-area">
            {!isDetailsUploading ? (
              <>
                <h1>{params.get('type') === InformationTypes.Manual ? 'Manual' : 'Yapay Zeka ile'} Bilgilendirme Oluşturma</h1>
                <div className="reportDetailArea">
                  {
                    params.get('type') === InformationTypes.Manual ? 
                    (
                    <ReportDetail>
                        <ReportHeader header={'Bilgilendirmeyi Yapıştır'} />
                        {params.get('type') === InformationTypes.Manual ? (
                          <textarea
                            placeholder="JSON yapıda destekler"
                            defaultValue={paste_area_value}
                            onPaste={dataPaste}
                          />
                        ) : null}
                      </ReportDetail>
                    ) 
                    : null 
                  }

                  <ReportDetail>
                    <ReportHeader header={'Bilgilendirme Videosu Linki'} />
                    {isOpenedEverything ? (
                      <ReportContent 
                            content={information.video_src} 
                            type='textarea' 
                            editable={true}
                            onChange={(e)=>{
                                setInformation((prevValues)=>({
                                    ...prevValues,
                                    video_src : e.target.value
                                }))
                            }}
                        />
                    ) : (
                        <ReportContent
                        content={information.video_src}
                        type="textarea"
                        onChange={(e) => {
                          setInformation((prevValues) => ({
                            ...prevValues,
                            video_src: e.target.value
                          }));
                        }}
                      />
                    )}
                  </ReportDetail>

                  <ReportDetail>
                    <ReportHeader header={'Soru İçeriği'} />
                    {params.get('type') === InformationTypes.Manual ? (
                      <ReportContent 
                            content={information.information_content} 
                            type='textarea' 
                            editable={true}
                            onChange={(e)=>{
                                setInformation((prevValues)=>({
                                    ...prevValues,
                                    information_content : e.target.value
                                }))
                            }}
                        />
                    ) : (
                      <ReportContent content={information.information_content} type="textarea" />
                    )}
                  </ReportDetail>

                  <div className="actions">
                    <button onClick={addInformation}>Bilgilendirmeyi Ekle</button>

                    {params.get('type') === InformationTypes.AI ? (
                      <button onClick={editInformation}>Bilgilendirmeyi Düzenle</button>
                    ) : null}
                  </div>
                </div>
              </>
            ) : (
              <LoadingBar />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default InformationSetByID;
