import * as Keychain from "react-native-keychain";

// Storing the token
const storeToken = async (token) => {
  try {
    await Keychain.setGenericPassword("access_token", token);
  } catch (error) {
    // Handle storage error
  }
};

// Retrieving the token
const retrieveToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    // Handle retrieval error
  }
};

// Function to delete the access token
const deleteToken = async () => {
  try {
    await Keychain.resetGenericPassword(); // This will delete the stored token
  } catch (error) {
    // Handle deletion error
  }
};

export default { storeToken, retrieveToken, deleteToken };
