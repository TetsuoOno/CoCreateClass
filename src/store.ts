import { User, QuizState } from './types/type';
import  storage  from 'redux-persist/lib/storage';
import { persistReducer,persistStore } from 'redux-persist';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { LoginReducer } from './reduers/loginReducer';
import { QuizReducer } from './reduers/quizReducer';

import thunk from 'redux-thunk';


export type AppState = {
    userState: User
    quizState: QuizState
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userState'], 
    blacklist: ['tagState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({
        userState: LoginReducer,
        quizState: QuizReducer
    })
)

const store = createStore(persistedReducer, {} , applyMiddleware(thunk))

export const persistor = persistStore(store)
export default store
