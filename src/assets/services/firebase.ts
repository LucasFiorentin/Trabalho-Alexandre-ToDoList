// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuUYIK9FrxKF-hZTFN_0huYLC6DMzD_Fs',
  authDomain: 'prova-web2-e8d86.firebaseapp.com',
  projectId: 'prova-web2-e8d86',
  storageBucket: 'prova-web2-e8d86.appspot.com',
  messagingSenderId: '543165882824',
  appId: '1:543165882824:web:15a14a1db16bc682b4e0fd',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
