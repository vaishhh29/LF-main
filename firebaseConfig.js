import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDyQPXA56sXMR4EfEdtixeqh7ivoy9_8Lk",
  authDomain: "rnpushdemo-6b360.firebaseapp.com",
  projectId: "rnpushdemo-6b360",
  storageBucket: "rnpushdemo-6b360.firebasestorage.app",
  messagingSenderId: "23692314207",
  appId: "1:23692314207:web:82f8b5b83deaa3f293fdea",
  measurementId: "G-6ZQCKE64HN"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);