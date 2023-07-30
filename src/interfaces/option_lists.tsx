import Option from './select_option_interface';
const typeOptions: Option[] = [
    { value: 'standart', label: 'Standart Soru' },
    { value: 'image', label: 'Resimli Soru' },
];
const levelOptions: Option[] = [
    { value: 'easy', label: 'Kolay' },
    { value: 'medium', label: 'Orta' },
    { value: 'hard', label: 'Zor' },
    { value: 'very-hard', label: 'Çok Zor' },
];
const answerOptions: Option[] = [
    { value: 1, label: 'A' },
    { value: 2, label: 'B' },
    { value: 3, label: 'C' },
    { value: 4, label: 'D' },
];

const lessonOption: Option[] = [
    { value: 'math', label: 'Matematik' },
    { value: 'python', label: 'Python' },
];

const classOption: Option[] = [
    { value: '1', label: '1. Sınıf' },
    { value: '2', label: '2. Sınıf' },
    { value: '3', label: '3. Sınıf' },
    { value: '4', label: '4. Sınıf' },
    { value: '5', label: '5. Sınıf' },
    { value: '6', label: '6. Sınıf' },
    { value: '7', label: '7. Sınıf' },
    { value: '8', label: '8. Sınıf' },
    { value: '9', label: '9. Sınıf' },
    { value: '10', label: '10. Sınıf' },
    { value: '11', label: '11. Sınıf' },
    { value: '12', label: '12. Sınıf' },
    { value: '13', label: 'Mezun' },
];


export {
    typeOptions,
    levelOptions,
    answerOptions,
    lessonOption,
    classOption
}