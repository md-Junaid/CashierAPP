import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBgWuInhZg5GW4uTb-yp_lt-Ek6b613Q88",
  authDomain: "cashier-app-3de7e.firebaseapp.com",
  projectId: "cashier-app-3de7e",
  storageBucket: "cashier-app-3de7e.firebasestorage.app",
  messagingSenderId: "439712938302",
  appId: "1:439712938302:web:1f313a17345df17637146f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);
const db = getFirestore(app);

export { db };