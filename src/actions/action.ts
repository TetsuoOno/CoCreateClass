import actionCreatorFactory from 'typescript-fsa'
import { User, QuizState } from '../types/type';


const actionCreator = actionCreatorFactory()
export const loginCreator = actionCreator<User>('LOGIN')
export const initLoginCreator = actionCreator('INITLOGIN')
export const quizCreator = actionCreator<QuizState>('QUIZ')
export const initQuizCreator = actionCreator('INITQUIZ')