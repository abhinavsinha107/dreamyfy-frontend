import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "eduapp-67479.firebaseapp.com",
  projectId: "eduapp-67479",
  storageBucket: "eduapp-67479.appspot.com",
  messagingSenderId: "78961930586",
  appId: "1:78961930586:web:8d86447f81b593ad5e0363",
};

export const app = initializeApp(firebaseConfig);
