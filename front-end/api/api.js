import axios from "axios";
import { deleteToken, storeToken, retrieveToken } from "./storage";
const BASE_URL = "http://127.0.0.1:5000";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (username, password, google) => {
  var response;
  try {
    if (google) {
      console.log("test");
      response = await axios.get(`${BASE_URL}/auth/api_google_login`);
      console.log(response);
    } else {
      response = await axios.post(`${BASE_URL}auth/api/login`, {
        username,
        password,
      });
    }

    // store access token
    const accessToken = response.data.access_token;
    storeToken(accessToken);

    return { success: true, accessToken };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
