import AsyncStorage from "@react-native-async-storage/async-storage";

const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem("userToken", userData.uid); // or userData.uid
  } catch (error) {
    console.log("error saving token");
  }
};
export default storeUserData;
