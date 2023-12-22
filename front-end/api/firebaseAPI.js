import { database } from "../firebaseConfig";
import { useContext } from "react";
import { ref, set, get } from "firebase/database";
import { AuthContext } from "../utils/AuthContext";

const initializeUserData = async (user) => {
  const { currentUser } = useContext(AuthContext);
  try {
    await set(ref(database, "users", currentUser.uid), user.getProfileData());
    return { success: true, message: "User data saved." };
  } catch (error) {
    console.log("error saving user profile data");
    return { success: false, message: "Failed to save user data" };
  }
};

export default initializeUserData;
