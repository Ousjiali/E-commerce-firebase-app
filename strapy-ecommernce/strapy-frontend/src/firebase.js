// import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtVA-s4XX9mOs1cMzLZtN6X0qdynG7qGE",
  authDomain: "strapy-63388.firebaseapp.com",
  projectId: "strapy-63388",
  storageBucket: "strapy-63388.appspot.com",
  messagingSenderId: "726660522469",
  appId: "1:726660522469:web:fe1183f99598b5c2c9cf0c",
  measurementId: "G-LLYBRFKP3E"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);

export { db, auth };
