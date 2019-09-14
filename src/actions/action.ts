import actionCreatorFactory from 'typescript-fsa'
import { User } from '../types/type';


const actionCreator = actionCreatorFactory()
export const loginCreator = actionCreator<User>('LOGIN')
export const initLoginCreator = actionCreator('INITLOGIN')
