import { QuizState } from '../types/type';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {quizCreator, initQuizCreator} from '../actions/action'

const initialState: QuizState = {
    questions:[]
}

export const QuizReducer = reducerWithInitialState(initialState).
case(quizCreator,(state, quizData) => {
    return Object.assign({}, state, {
        Question: quizData
    })
}).case(initQuizCreator, state => {
    return Object.assign({}, state, {
        Question: []
    })
})