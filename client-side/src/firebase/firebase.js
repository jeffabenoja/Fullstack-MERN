import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-stack-ed8e2.firebaseapp.com",
  projectId: "mern-stack-ed8e2",
  storageBucket: "mern-stack-ed8e2.appspot.com",
  messagingSenderId: "734033555530",
  appId: "1:734033555530:web:4fa6c14db66bb53f15b6b3",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
