import React, { useContext, useState } from "react";
import { View } from "react-native";
import { TextInput, Appbar, Button } from "react-native-paper";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../api/firebaseAPI";
import User from "../objects/User";
import { AuthContext } from "../utils/AuthContext";

function LoginScreen() {
  const { setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const navigation = useNavigation();

  const handleLogin = async () => {
    user = new User(email, password);
    userCredentials = loginUser(user);
    setCurrentUser(userCredentials);
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Sign In" subtitle={"Subtitle"} />
      </Appbar.Header>
      <View style={styles.content}>
        <View style={styles.input}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            mode="outlined"
            secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? "eye-off" : "eye"}
                onPress={togglePasswordVisibility}
              />
            }
          />
        </View>

        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handleLogin(email, password)}
        >
          Login
        </Button>
        <Button icon="google" mode="contained" style={styles.buttonSecondary}>
          Sign in with Google
        </Button>
        <Button mode="text" onPress={() => navigation.navigate("Signup")}>
          Don't have account? Sign up here.
        </Button>
      </View>
    </View>
  );
}

export default LoginScreen;
