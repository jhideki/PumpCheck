import React, { useEffect, useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../utils/AuthContext";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import { logoutUser } from "../api/firebaseAPI";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

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

  const userEmail =
    currentUser && currentUser.email ? currentUser.email : "Unknown";

  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: "https://placekitten.com/500/300" }} />
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Image
              size={80}
              source={{ uri: "https://placekitten.com/100/100" }}
            />
            <Title>Signed in as:{userEmail}</Title>
          </View>
        </Card.Content>
      </Card>
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
