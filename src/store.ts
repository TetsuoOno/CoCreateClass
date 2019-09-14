import { User } from './types/type';
import  storage  from 'redux-persist/lib/storage';
import { persistReducer,persistStore } from 'redux-persist';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { LoginReducer } from './reduers/loginReducer';
import thunk from 'redux-thunk';


export type AppState = {
    userState: User
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
    })
)

const store = createStore(persistedReducer, {} , applyMiddleware(thunk))

export const persistor = persistStore(store)
export default store
