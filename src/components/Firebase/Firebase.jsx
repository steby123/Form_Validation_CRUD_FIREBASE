import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider, getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC4dNA_VOCw4caYab9xr1OmuVkFeXYhLZc",
  authDomain: "ptvjb-eafe7.firebaseapp.com",
  projectId: "ptvjb-eafe7",
  storageBucket: "ptvjb-eafe7.appspot.com",
  messagingSenderId: "1032915156590",
  appId: "1:1032915156590:web:e0aeddcda620f214c0707f",
  measurementId: "G-VMZ23JJ2PB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { app, auth, db, provider };