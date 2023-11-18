import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Appbar, Button } from "react-native-paper";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../api/api";

function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const navigation = useNavigation();
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

        <Button mode="contained" style={styles.button}>
          Login
        </Button>
        <Button
          icon="google"
          mode="contained"
          style={styles.buttonSecondary}
          onPress={() => signIn("", "", true)}
        >
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
