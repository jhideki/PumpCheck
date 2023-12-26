import { supabase } from "../supabase";

const signInWithEmail = async (user) => {
  try {
    const userCredential = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    console.log("Signed in successfully.");
    return userCredential;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

const signUpWithEmail = async (user) => {
  try {
    const userCredential = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });
    console.log("Signed up in successfully.");
    return userCredential;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

const signOut = async () => {
  try {
    const response = await supabase.auth.signOut();
    console.log("Signed out successfully");
  } catch (error) {
    console.error("Logout failed");
  }
};

export { signInWithEmail, signUpWithEmail, signOut };
