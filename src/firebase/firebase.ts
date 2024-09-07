// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAneSPnbgzDHW8uN4UUKWNqq9FJjm7iveo",
  authDomain: "admin-dashboard-21c94.firebaseapp.com",
  projectId: "admin-dashboard-21c94",
  storageBucket: "admin-dashboard-21c94.appspot.com",
  messagingSenderId: "171026361960",
  appId: "1:171026361960:web:2ea12ee3ae8b14b5db15dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
