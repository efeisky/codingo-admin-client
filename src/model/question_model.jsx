class QuestionModel {
    constructor(data) {
        const {
            lesson_id,
            lesson_name,
            lesson_subject,
            lesson_class,
            question_count,
        } = data;

        this.lesson_id = lesson_id;
        this.lesson_name = lesson_name;
        this.lesson_subject = lesson_subject;
        this.lesson_class = lesson_class;
        this.question_count = question_count;
    }
}
class QuestionMakeModel {
    constructor(data) {
        const {
            level,
            type,
            content,
            a,
            b,
            c,
            d,
            answer
        } = data;

        this.level = level;
        this.type = type;
        this.content = content;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.answer = answer;
    }
}
export {
    QuestionModel,
    QuestionMakeModel
};