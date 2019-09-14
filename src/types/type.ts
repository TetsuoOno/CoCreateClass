export type User = {
    userID: string;
    userName: string;
}

export type Course = {
    className: string,
    classDate: string,
    classTime: string,
    questionName: string,
    questions: {
        questionNumber: number,
        questionID: string,
        questionTitle: string,
        likes: 0
    }[]
}

export type Question = {
    id: string;
    title: string;
    correctAnswer: string;
}
