import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import database from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB0Px6dHZzp8U2PiqSME8vIBG9Zr69gtnQ",
  authDomain: "gcollab-109ba.firebaseapp.com",
  projectId: "gcollab-109ba",
  storageBucket: "gcollab-109ba.appspot.com",
  messagingSenderId: "871201771773",
  appId: "1:871201771773:web:63dd9d5b0307b66e4a2e94",
  measurementId: "G-Y1QGH1C4TS",
};

firebase.initializeApp(firebaseConfig);

let dbref = firebase.database().ref();

export const username = prompt("Name");

const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get("id");
if (roomID) {
  dbref = dbref.child(roomID);
} else {
  dbref = dbref.push();
  window.history.replaceState(null, "Meet", "?id=" + dbref.key);
}

export default dbref;
