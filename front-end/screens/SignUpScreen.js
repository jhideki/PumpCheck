import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Divider } from "react-native-paper";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../api/firebaseAPI";
import User from "../objects/User";
function SignUpScreen() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [passwordVerified, setPasswordVerified] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVerifiedVisible, setIsPasswordVerifiedVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePasswordVerifiedVisibility = () => {
    setIsPasswordVerifiedVisible(!isPasswordVerifiedVisible);
  };

  function createUser(email,password,username){
    const newUser = new User(email,password,username);
    registerUser(newUser);
  }

  const navigation = useNavigation();

  function comparePasswords(string1, string2) {
    return string1 === string2;
  }

  function handleGoogleAuth(token) {
    console.log("Received token: ", token);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button
          icon="google"
          mode="contained"
          style={styles.button}
          onPress={() =>
            navigation.navigate("GoogleAuth", { handleGoogleAuth })
          }
        >
          Sign up with Google
        </Button>
        <View style={styles.textContainer}>
          <View style={styles.text}>
            <Text>Or</Text>
          </View>
          <Divider bold={true} />
          <View style={styles.text}>
            <Text variant="titleMedium">Create an account</Text>
          </View>
        </View>
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
            label="Username"
            value={username}
            onChangeText={(username) => setEmail(username)}
            mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            mode="outlined"
            onBlur={comparePasswords}
            secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? "eye-off" : "eye"}
                onPress={togglePasswordVisibility}
              />
            }
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Re-enter password"
            value={passwordVerified}
            onChangeText={(passwordVerified) =>
              setPasswordVerified(passwordVerified)
            }
            mode="outlined"
            secureTextEntry={!isPasswordVerifiedVisible} // Toggle secureTextEntry
            right={
              <TextInput.Icon
                icon={isPasswordVerifiedVisible ? "eye-off" : "eye"}
                onPress={togglePasswordVerifiedVisibility}
              />
            }
          />
        </View>
      </View>
      <View style={styles.subContent30}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={createUser}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

export default SignUpScreen;
