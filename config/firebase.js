// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsCXEuorKeu0bdcgRdBX2_ahJpbaPoSd0",
  authDomain: "fooddelivery-grupi2.firebaseapp.com",
  projectId: "fooddelivery-grupi2",
  storageBucket: "fooddelivery-grupi2.firebasestorage.app",
  messagingSenderId: "382317126727",
  appId: "1:382317126727:web:baf1b943b6992ebbbc3d62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

export default app;