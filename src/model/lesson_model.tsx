class LessonModel {
    lesson_type: string;
    lesson_class: string;
    lesson_subject: string;
    constructor(data: { lesson_type: string;lesson_class: string;lesson_subject: string;}) {
        const {
            lesson_type,
            lesson_class,
            lesson_subject
        } = data;

        this.lesson_type = lesson_type;
        this.lesson_class = lesson_class;
        this.lesson_subject = lesson_subject;
    }
}

export {
    LessonModel
};