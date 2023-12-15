import { database } from "../firebaseConfig";
import { ref, set, get } from "firebase/database";

const initializeUserData = async (user) => {
  try {
    await set(ref(database, "users", user.uid), user.getProfileData());
  } catch (error) {
    console.log("error saving user profile data");
  }
};

export default initializeUserData;
