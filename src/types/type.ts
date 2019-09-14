export type User = {
    userID: string;
    userName: string;
}

export type  Course = {
    className: string,
    classDate: string,
    classTime: string,
    studentNumber: number,
    questionName: string,
    questions: {
        questionNumber: number,
        questionID: string,
        questionTitle: string,
        collectAnswers: number
    }[]
}

export type Question = {
    id: string;
    title: string;
    correctAnswer: number;
    correctAnswers: number;
}

export type QuizState = {
    questions:{
        questionNumber: number,
        isCollect: boolean
    }[]
}