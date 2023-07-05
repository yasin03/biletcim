import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCE_FL7GSoI7I1QIyCWlLD74Cd3JXV2Il8",
  authDomain: "biletcim-e8b24.firebaseapp.com",
  projectId: "biletcim-e8b24",
  storageBucket: "biletcim-e8b24.appspot.com",
  messagingSenderId: "461538869709",
  appId: "1:461538869709:web:23c353b1b66bc9dcf70484",
  measurementId: "G-SHLH20PQB4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
