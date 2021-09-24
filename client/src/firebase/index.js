import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-J4dLMZ-w7smAICbPGkg-SKRK-0Pc-no",
    authDomain: "isha-fea30.firebaseapp.com",
    projectId: "isha-fea30",
    storageBucket: "isha-fea30.appspot.com",
    messagingSenderId: "940940791210",
    appId: "1:940940791210:web:a0148ba052eec69891afd3",
    measurementId: "G-F3QE6RT1VC"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
