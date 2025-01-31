// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4vfd_jC1ELt1XCofGc0BiIM_osPRIywI",
  authDomain: "haachicodictivity.firebaseapp.com",
  projectId: "haachicodictivity",
  storageBucket: "haachicodictivity.firebasestorage.app",
  messagingSenderId: "442919444651",
  appId: "1:442919444651:web:e9dbbcde0a9ce6bfab17ee",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
