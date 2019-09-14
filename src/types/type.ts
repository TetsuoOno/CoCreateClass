export type User = {
    userID: string;
    userName: string;
}

export type course = {
    id: string;
    users: User[];
    questions: Question[];
}

export type Question = {
    id: string;
    title: string;
    correctAnswer: number;
}