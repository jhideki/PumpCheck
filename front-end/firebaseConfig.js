// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {FIREBASE_API,FIREBASE_AUTH_DOMAIN,FIREBASE_PROJECT_ID,FIREBASE_STORAGE_BUCKET,FIREBASE_MESSAGE_SENDER_ID,FIREBASE_APP_ID,FIREBASE_MEASUREMENT_ID} from '@env';
const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain:FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};