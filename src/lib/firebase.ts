// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsiCaM6WtAS45qwCtuOYOS7m3JYtIFq5g",
  authDomain: "next-firebase-a03ad.firebaseapp.com",
  projectId: "next-firebase-a03ad",
  storageBucket: "next-firebase-a03ad.appspot.com",
  messagingSenderId: "938459847981",
  appId: "1:938459847981:web:0bc07fe5ee93ef25df07a4",
  
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);

export const storage: FirebaseStorage = getStorage(app);
