// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC8vgQ8WDgJcUNwyLQAFVnUVAsvlSyjtM",
  authDomain: "code-to-give-breads.firebaseapp.com",
  projectId: "code-to-give-breads",
  storageBucket: "code-to-give-breads.appspot.com",
  messagingSenderId: "670362121297",
  appId: "1:670362121297:web:8670a3cdb2d956482bb470",
  measurementId: "G-ZZFVXJGLNK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
