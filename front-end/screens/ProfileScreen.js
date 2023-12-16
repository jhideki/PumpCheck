import React, { useEffect, useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../utils/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import styles from "../styles/styles";
import { logoutUser } from "../api/firebaseAPI";

function ProfileScreen() {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    logoutUser();
  };

  useEffect(() => {
    if (!currentUser) {
      navigation.navigate("Login");
    }
  }, [currentUser, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handleLogout()}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

export default ProfileScreen;
