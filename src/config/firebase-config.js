import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyB3aZsD-LDGFQvwvtpixS3BYMGx_Qgt2Ac",
    authDomain: "quiz-1dac7.firebaseapp.com",
    projectId: "quiz-1dac7",
    storageBucket: "quiz-1dac7.appspot.com",
    messagingSenderId: "309945456604",
    appId: "1:309945456604:web:8e32508259ae93831d2119"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)