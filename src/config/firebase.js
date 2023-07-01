// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE_FL7GSoI7I1QIyCWlLD74Cd3JXV2Il8",
  authDomain: "biletcim-e8b24.firebaseapp.com",
  projectId: "biletcim-e8b24",
  storageBucket: "biletcim-e8b24.appspot.com",
  messagingSenderId: "461538869709",
  appId: "1:461538869709:web:23c353b1b66bc9dcf70484",
  measurementId: "G-SHLH20PQB4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

