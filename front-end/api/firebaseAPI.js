import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

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
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    console.log("User registered successfully, user UID:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
};

export {registerUser, loginUser};
