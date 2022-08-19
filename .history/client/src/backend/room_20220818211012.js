import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import database from "firebase/compat/database";

var firebaseConfig = {
  apiKey: "AIzaSyB0Px6dHZzp8U2PiqSME8vIBG9Zr69gtnQ",
  authDomain: "gcollab-109ba.firebaseapp.com",
  projectId: "gcollab-109ba",
  storageBucket: "gcollab-109ba.appspot.com",
  messagingSenderId: "871201771773",
  appId: "1:871201771773:web:63dd9d5b0307b66e4a2e94",
  measurementId: "G-Y1QGH1C4TS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

export const userName = prompt("What's your name?");
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
}

export default firepadRef;
