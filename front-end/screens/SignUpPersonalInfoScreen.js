import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Divider } from "react-native-paper";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { initializeUserData } from "../api/firebaseAPI";

function SignUpPersonalInfoScreen() {
  const navigate = useNavigation;
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [feet, setFeet] = React.useState("");
  const [inches, setInches] = React.useState("");
  const [bodyFat, setBodyFat] = React.useState("");
  const [bench, setBench] = React.useState("");
  const [squat, setSquat] = React.useState("");
  const [deadlift, setDeadlift] = React.useState("");

  const clearTextInputOnFocus = () => {
    setBodyFat("");
  };
  const handleCreateAccount = () => {
    user = new User();
    user.setUserData(
      username,
      name,
      age,
      weight,
      feet,
      inches,
      bodyFat,
      bench,
      squat,
      deadlift,
    );
    initializeUserData(user)
      .then((result) => {
        console.log(result.message);
        if (result.success) {
          navigation.navigate("Profile");
        } else {
          console.log("error saving data");
        }
      })
      .catch((error) => {
        console.log("Error calling initializeUserData", error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.input}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(name) => setName(name)}
            mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={(username) => setUsername(username)}
            mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Age"
            value={age}
            keyboardType="numeric"
            onChangeText={(age) => setAge(age)}
            mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Weight"
            value={weight}
            keyboardType="numeric"
            onChangeText={(weight) => setWeight(weight)}
            mode="outlined"
          />
        </View>
        <Text variant="bodyLarge">Height</Text>
        <View style={styles.horizontalContent}>
          <View style={styles.horizontalInput}>
            <TextInput
              label="feet"
              value={feet}
              keyboardType="numeric"
              onChangeText={(feet) => setFeet(feet)}
              mode="outlined"
            />
          </View>
          <View style={styles.horizontalInput}>
            <TextInput
              label="inches"
              value={inches}
              keyboardType="numeric"
              onChangeText={(inches) => setInches(inches)}
              mode="outlined"
            />
          </View>
        </View>
        <View style={styles.input}>
          <TextInput
            label="Estimated Body Fat"
            value={bodyFat}
            keyboardType="numeric"
            onChangeText={(text) => {
              if (!text.endsWith(" %")) {
                setBodyFat(text + " %");
              } else {
                setBodyFat(text);
              }
            }}
            onFocus={clearTextInputOnFocus}
            mode="outlined"
          />
        </View>

        <View style={styles.input}>
          <TextInput
            label="Bench"
            value={bench}
            keyboardType="numeric"
            onChangeText={(bench) => setBench(bench)}
            mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Squat"
            value={squat}
            keyboardType="numeric"
            onChangeText={(squat) => setSquat(squat)}
            mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Deadlift"
            value={deadlift}
            keyboardType="numeric"
            onChangeText={(deadlift) => setDeadlift(deadlift)}
            mode="outlined"
          />
        </View>
      </View>

      <View style={styles.subContent30}>
        <Button
          onPress={handleCreateAccount}
          mode="contained"
          style={styles.button}
        >
          Create Account
        </Button>
      </View>
    </View>
  );
}

export default SignUpPersonalInfoScreen;
