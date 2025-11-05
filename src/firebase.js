// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "PUT YOUR api key",
  authDomain: "polling-app-b69bc.firebaseapp.com",
  databaseURL: "https://polling-app-b69bc-default-rtdb.firebaseio.com",
  projectId: "polling-app-b69bc",
  storageBucket: "polling-app-b69bc.firebasestorage.app",
  messagingSenderId: "910214093825",
  appId: "1:910214093825:web:45efd209bcd8c9f8af3400"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
