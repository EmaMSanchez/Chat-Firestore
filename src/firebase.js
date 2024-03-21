import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl6kxWLiPD4OrzjvV362nyugy-uKNOZxU",
  authDomain: "clon-realtime.firebaseapp.com",
  projectId: "clon-realtime",
  storageBucket: "clon-realtime.appspot.com",
  messagingSenderId: "619116392120",
  appId: "1:619116392120:web:c02f71804c8839e0bb0e4d"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider() //Trae el provedor de google para usar el metodo de autenticacion de google por popUp (popUp recive autenicacion(auth incluye la conexion) y el proveedor)

export {app, auth, db, provider}