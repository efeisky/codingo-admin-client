import axios from "axios";
import Option from "./../interfaces/select_option_interface";
import {QuestionModel} from "../model/question_model";
import { InformationModel } from "../model/information_model";

const setLessonSelectBox = async(option : Option,setInformationFeatures : any,  setInformationAreaLoading : any) => {
    setInformationAreaLoading(true);
    setInformationFeatures((prevFeatures: any) => ({
        ...prevFeatures,
        information_lesson: {
            value : option.value,
            label : option.label,
        }
    }));
    setInformationAreaLoading(false);
}
const setClassSelectBox = async(option : Option,setInformationFeatures : any,  setInformationAreaLoading : any) => {
    setInformationAreaLoading(true);
    setInformationFeatures((prevFeatures: any) => ({
        ...prevFeatures,
        information_class: {
            value : option.value,
            label : option.label,
        }
    }));
    setInformationAreaLoading(false);
}
const setSubjectSelectBox = async(option : Option,setInformationFeatures : any,  setInformationAreaLoading : any) => {
    setInformationAreaLoading(true);
    setInformationFeatures((prevFeatures: any) => ({
        ...prevFeatures,
        information_subject: {
            value : option.value,
            label : option.label,
        }
    }));
    setInformationAreaLoading(false);
}
const setLessonOptions = async(informationFeatures : any,  setInformationAreaLoading : any,setLessonSubjectOption : any) => {
    setInformationAreaLoading(true);
    const {data} = await axios.get(
      '/lessons/getUnInformationLessons',
      {
        params : {
            lesson_type : informationFeatures.information_lesson.value,
            lesson_class : informationFeatures.information_class.value
        }
      }
    )
    if(data.status){
        const lessons_list: any[] = data.lessons;
        const modeled_data = lessons_list.map((lesson) => {
          return new QuestionModel(lesson);
        });
        
        const lessonSubjectOption: Option[] = modeled_data.map((lesson) => {
          return {
            value: lesson.lesson_id,
            label: `${lesson.lesson_subject} ~ ${lesson.question_count} Soru`,
          };
        });
        
        setLessonSubjectOption(lessonSubjectOption)
    }else{
        alert(`Bir problem oluştu : ${data.error}`);
    }
    setInformationAreaLoading(false);
}
const setCreateInformationAsAI = async(lessonId : number, setIsDetailsUploading : any) => {
    setIsDetailsUploading(true);
    const {data} = await axios.get(
      '/lessons/createInformationAsAI',
      {
        params : {
            id : lessonId
        }
      }
    )
    setIsDetailsUploading(false);
    if(data.status){
        return {
            status : true,
            information : new InformationModel(data.information)
        }
    }else{
        return {
            status : false,
            information : null
        }
    }
}
const AddInformationFunction = async(information : InformationModel, lessonID : number, setInformationAreaLoading: any) => {
    setInformationAreaLoading(true);
    const {data} = await axios.post(
      '/lessons/addInformation',
      {
        information : information,
        lesson_id : lessonID
      }
    );
    if (data.status) {
        alert('Bilgilendirme Başarıyla Eklendi!');
    }else{
        alert(`Bir problem oluştu. Problem : ${data.error}`);
    }
    setInformationAreaLoading(false);
}
export { setLessonSelectBox, setClassSelectBox, setSubjectSelectBox, setLessonOptions, setCreateInformationAsAI, AddInformationFunction };