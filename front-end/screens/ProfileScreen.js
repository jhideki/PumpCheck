import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { supabase } from "../supabase";
import { signOut } from "../api/Auth";

function ProfileScreen() {
  const navigation = useNavigation();
  const [session, setSession] = useState(null);

  const handleLogout = async () => {
    const response = await signOut();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );
  }, []);

  useEffect(() => {
    if (session == null) {
      navigation.navigate("Login");
    }
  }, [session, navigation]);

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
            <Title>Signed in as:{session ? session.user.id : "none"}</Title>
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
