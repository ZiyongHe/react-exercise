import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage, ref } from 'firebase/storage';
import { getFirestore } from "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDnlANlg4jnMvtxBxdlSwFg3n9xphNRDGI",
    authDomain: "training-players.firebaseapp.com",
    projectId: "training-players",
    storageBucket: "training-players.appspot.com",
    messagingSenderId: "190999706451",
    appId: "1:190999706451:web:e1aff41dbb05be98d8bfa6",
    measurementId: "G-46KCLWYPJB"
})

export const auth = app.auth()
export const db = getFirestore()
export const storage = getStorage(app)
export default app