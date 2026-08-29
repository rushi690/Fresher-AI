
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
   authDomain: "demointerview-edc3d.firebaseapp.com",
  projectId: "demointerview-edc3d",
  storageBucket: "demointerview-edc3d.firebasestorage.app",
  messagingSenderId: "74985355391",
  appId: "1:74985355391:web:95aa78759bcdd5a078a74a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth , provider}