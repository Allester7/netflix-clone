// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6phYzzGoi1MRfm0A86zwoHc4HfHFCy5A",
  authDomain: "netflix-a4d9a.firebaseapp.com",
  projectId: "netflix-a4d9a",
  storageBucket: "netflix-a4d9a.firebasestorage.app",
  messagingSenderId: "861072962264",
  appId: "1:861072962264:web:ad032b7f3e2c29dd071dad",
  measurementId: "G-0KTNQDZM87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();