import * as SecureStore from "expo-secure-store";

const storeToken = async (authToken, key = "authToken") => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error in Storung");
  }
};

const getToken = async (key = "authToken") => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error");
  }
};

const removeToken = async (key = "authToken") => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error in removing auth token");
  }
};

export default {
  getToken,
  removeToken,
  storeToken,
};
