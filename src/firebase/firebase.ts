import firebase from 'firebase'
import firebaseConfig from './config'

firebase.initializeApp(firebaseConfig);

export const fireStore = firebase.firestore()
export const questionIndex = "questions"