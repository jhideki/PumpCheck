import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Divider } from "react-native-paper";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";

function SingUpScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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

  const navigation = useNavigation();

  function comparePasswords(string1, string2) {
    return string1 === string2;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button icon="google" mode="contained" style={styles.button}>
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
          onPress={() => navigation.navigate("SignupPersonInfo")}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

export default SingUpScreen;
