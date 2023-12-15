// Login.js
import { signInWithEmailAndPassword,registerUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '.firebaseConfig'; 

const loginUser = async (user) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
    console.log("Logged in successfully, user UID:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

const registerUser = async (user) => {
  try {
    const userCredential = await registerUserWithEmailAndPassword(auth, user.email, user.password);
    console.log("Logged in successfully, user UID:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

export default firebaseAPI;
