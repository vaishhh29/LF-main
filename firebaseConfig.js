import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

import AsyncStorage from "@react-native-async-storage/async-storage"; // optional for persistence

const firebaseConfig = {
  apiKey: "AIzaSyCwsgnu8mvdL94cKIvZjltDkFhy2ipi5pg",
  authDomain: "lea-flexi.firebaseapp.com",
  projectId: "lea-flexi",
  storageBucket: "lea-flexi.firebasestorage.app",
  messagingSenderId: "603452160187",
  appId: "1:603452160187:web:30200640759228dd3e519e",
  measurementId: "G-1W4PD56SRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);       // Works for React Native
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage };
