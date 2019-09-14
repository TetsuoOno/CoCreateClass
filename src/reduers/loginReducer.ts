import { User } from '../types/type';
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { loginCreator, initLoginCreator } from '../actions/action';


const initialState: User = {
    userID: '',
    userName: '',
}

export const LoginReducer = reducerWithInitialState(initialState)
    .case(loginCreator, (state, loginData)  => {
        return Object.assign({}, state, {
            userID: loginData.userID,
            userName: loginData.userName
        })
    }).case(initLoginCreator,(state) => {
        return Object.assign({}, state, {        
            userID: '',
            userName: '',
        })
    })
