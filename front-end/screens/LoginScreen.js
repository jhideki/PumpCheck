import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Appbar, Button, IconButton } from "react-native-paper";
import styles from "../styles/styles";

function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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

        <Button mode="contained"></Button>
      </View>
    </View>
  );
}

export default LoginScreen;
