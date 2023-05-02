// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getAuth, setPersistence, browserLocalPersistence} from "firebase/auth"
import {getFirestore} from "@firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBRHz_UHCM-qVhQPczyG5Vxog4zicvB9aw",
  authDomain: "redux-auth-router.firebaseapp.com",
  projectId: "redux-auth-router",
  storageBucket: "redux-auth-router.appspot.com",
  messagingSenderId: "1090879297981",
  appId: "1:1090879297981:web:3800e5797b41f84a1f5ad4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)

export {setPersistence, browserLocalPersistence}

 // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID