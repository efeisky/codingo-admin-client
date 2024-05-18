import axios from "axios";
import Option from "./../interfaces/select_option_interface";
import {QuestionMakeModel, QuestionModel} from "../model/question_model";

const setLessonSelectBox = async(option : Option,setQuestionFeatures : any,  setQuestionAreaLoading : any) => {
    setQuestionAreaLoading(true);
    setQuestionFeatures((prevFeatures: any) => ({
        ...prevFeatures,
        question_lesson: {
            value : option.value,
            label : option.label,
        }
    }));
    setQuestionAreaLoading(false);
}
const setClassSelectBox = async(option : Option,setQuestionFeatures : any,  setQuestionAreaLoading : any) => {
    setQuestionAreaLoading(true);
    setQuestionFeatures((prevFeatures: any) => ({
        ...prevFeatures,
        question_class: {
            value : option.value,
            label : option.label,
        }
    }));
    setQuestionAreaLoading(false);
}
const setSubjectSelectBox = async(option : Option,setQuestionFeatures : any,  setQuestionAreaLoading : any) => {
    setQuestionAreaLoading(true);
    setQuestionFeatures((prevFeatures: any) => ({
        ...prevFeatures,
        question_subject: {
            value : option.value,
            label : option.label,
        }
    }));
    setQuestionAreaLoading(false);
}
const setLessonOptions = async(questionFeatures : any,  setQuestionAreaLoading : any,setLessonSubjectOption : any) => {
    setQuestionAreaLoading(true);
    const {data} = await axios.get(
      'https://codingo-admin-backend.onrender.com/lessons/getLessons',
      {
        params : {
            lesson_type : questionFeatures.question_lesson.value,
            lesson_class : questionFeatures.question_class.value
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
    setQuestionAreaLoading(false);
}
const setCreateQuestionAsAI = async(questionId : number, setIsDetailsUploading : any) => {
    setIsDetailsUploading(true);
    const {data} = await axios.get(
      'https://codingo-admin-backend.onrender.com/lessons/createQuestionAsAI',
      {
        params : {
            id : questionId
        }
      }
    )
    setIsDetailsUploading(false);
    if(data.status){
        return {
            status : true,
            question : new QuestionMakeModel(data.question)
        }
    }else{
        return {
            status : false,
            question : null
        }
    }
}
const AddQuestionFunction = async(question : QuestionMakeModel, lessonID : number, setQuestionAreaLoading: any) => {
    setQuestionAreaLoading(true);
    const {data} = await axios.post(
      'https://codingo-admin-backend.onrender.com/lessons/addQuestion',
      {
        question : question,
        lesson_id : lessonID
      }
    );
    if (!data.status) {
        alert(`Bir problem oluştu. Problem : ${data.error}`);
    }
    setQuestionAreaLoading(false);
}
export { setLessonSelectBox, setClassSelectBox, setSubjectSelectBox, setLessonOptions, setCreateQuestionAsAI, AddQuestionFunction };
