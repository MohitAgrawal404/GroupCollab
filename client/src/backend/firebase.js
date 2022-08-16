import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  //ASK FOR DETAILS
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();