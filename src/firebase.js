import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDSwUGegB5X9ecGgGiqNMmORArVk5YKXAY",
    authDomain: "learn-b46a8.firebaseapp.com",
    projectId: "learn-b46a8",
    storageBucket: "learn-b46a8.firebasestorage.app",
    messagingSenderId: "707991192150",
    appId: "1:707991192150:web:0f8cf80f1da847e18871f7",
    measurementId: "G-68FWKYM001"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();