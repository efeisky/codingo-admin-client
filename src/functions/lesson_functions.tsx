import axios from "axios";
import Option from "./../interfaces/select_option_interface";
import { LessonModel } from "../model/lesson_model";

const setLessonSelectBox = async(option : Option,setFeature : any,  setLoading : any) => {
    setLoading(true);
    setFeature((prevFeatures: any) => ({
        ...prevFeatures,
        lesson_type: {
            value : option.value,
            label : option.label,
        }
    }));
    setLoading(false);
}
const setClassSelectBox = async(option : Option,setFeature : any,  setLoading : any) => {
    setLoading(true);
    setFeature((prevFeatures: any) => ({
        ...prevFeatures,
        lesson_class: {
            value : option.value,
            label : option.label,
        }
    }));
    setLoading(false);
}
const AddLessonFunction = async(lesson : LessonModel, setLoading: any) => {
    setLoading(true);
    const {data} = await axios.post(
      'https://codingo-admin-backend.onrender.com/lessons/addLesson',
      {
        lesson_type : lesson.lesson_type,
        lesson_class : parseInt(lesson.lesson_class),
        lesson_subject : lesson.lesson_subject,
      }
    );
    if (data.status) {
        alert('Ders Başarıyla Eklendi!');
    }else{
        alert(`Bir problem oluştu. Problem : ${data.error}`);
    }
    setLoading(false);
}
export { setLessonSelectBox, setClassSelectBox, AddLessonFunction };