import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Divider } from "react-native-paper";
import styles from "../styles/styles";

function SignUpPersonalInfoScreen() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [feet, setFeet] = React.useState("");
  const [inches, setInches] = React.useState("");
  const [bodyFat, setBodyFat] = React.useState("");

  // Function to clear the text input when it's focused
  const clearTextInputOnFocus = () => {
    setBodyFat(""); // Clear the bodyFat text when the input is focused
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
              // Check if the last character is not "%"
              if (!text.endsWith(" %")) {
                // Append "%" to the input value before setting it in state
                setBodyFat(text + " %");
              } else {
                // If the input already ends with "%", set it directly in state
                setBodyFat(text);
              }
            }}
            onFocus={clearTextInputOnFocus}
            mode="outlined"
          />
        </View>
      </View>

      <View style={styles.subContent30}>
        <Button mode="contained" style={styles.button}>
          Create Account
        </Button>
      </View>
    </View>
  );
}

export default SignUpPersonalInfoScreen;
