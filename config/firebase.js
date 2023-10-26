// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQB7awShICyzBe9I_PBLxQ1iM5C54QE8c",
  authDomain: "oguaschoolz.firebaseapp.com",
  projectId: "oguaschoolz",
  storageBucket: "oguaschoolz.appspot.com",
  messagingSenderId: "1037296481688",
  appId: "1:1037296481688:web:5c04ee52455ad2924f27ed",
  measurementId: "G-ZK2ZER0G4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };