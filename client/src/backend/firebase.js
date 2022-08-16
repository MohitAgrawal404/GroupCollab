import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  //ASK FOR DETAILS
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
