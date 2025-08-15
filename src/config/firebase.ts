// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDM2rR-vegpCdbWVjQUd0HawzWJgC7rSzg",
   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cloudcareerss.firebaseapp.com",
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cloudcareerss",
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cloudcareerss.firebasestorage.app",
   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "515861551757",
   appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:515861551757:web:9a10e05799714410bba0c4",
   databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://cloudcareerss-default-rtdb.firebaseio.com",
};

// Validate Firebase configuration
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
   throw new Error('Firebase configuration is incomplete. Please check your environment variables.');
}

console.log('Firebase config loaded:', {
   apiKey: firebaseConfig.apiKey ? '✓' : '✗',
   authDomain: firebaseConfig.authDomain ? '✓' : '✗',
   projectId: firebaseConfig.projectId ? '✓' : '✗',
   storageBucket: firebaseConfig.storageBucket ? '✓' : '✗',
   messagingSenderId: firebaseConfig.messagingSenderId ? '✓' : '✗',
   appId: firebaseConfig.appId ? '✓' : '✗',
   databaseURL: firebaseConfig.databaseURL ? '✓' : '✗'
});

// Initialize Firebase
let app;
try {
   app = initializeApp(firebaseConfig);
   console.log('Firebase initialized successfully');
} catch (error) {
   console.error('Error initializing Firebase:', error);
   throw error;
}

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
