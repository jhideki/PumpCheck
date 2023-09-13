import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Appbar, Button, Text, Divider } from "react-native-paper";
import styles from "../styles/styles";

function SingUpScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button icon="google" mode="contained" style={styles.button}>
          Sign up with Google
        </Button>
        <Text>Or</Text>
        <Divider />
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
      </View>
    </View>
  );
}

export default SingUpScreen;
