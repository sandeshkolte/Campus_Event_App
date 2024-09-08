import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "comrade-ec6f7.firebaseapp.com",
  projectId: "comrade-ec6f7",
  storageBucket: "comrade-ec6f7.appspot.com",
  messagingSenderId: "468108977786",
  appId: "1:468108977786:web:3d36ef3d8cd5cc7d40fdc3"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)