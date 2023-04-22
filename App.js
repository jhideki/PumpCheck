import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [enteredExText, setEnteredExText] = useState("");
  const [enteredRepsText, setEnteredRepsText] = useState("");
  const [lifts, setLifts] = useState([]);
  const [lift, setLift] = useState({ reps: "", liftName: "" });

  function exInputHandler(userInput) {
    setEnteredExText(userInput);
  }
  function repInputHandler(userInput) {
    setEnteredRepsText(userInput);
  }
  function addLiftHandler() {
    setLift({ reps: enteredRepsText, liftName: enteredExText });
    setEnteredExText("");
    setEnteredRepsText("");
  }
  useEffect(() => {
    if (lift.reps !== "" && lift.liftName !== "") {
      setLifts((currentLift) => [...currentLift, lift]); // iterate through lifts and add to end
    }
  }, [lift]);
  const renderArray = (array) => {
    return array.map((item, index) => {
      return (
        <View key={index}>
          <Text>{item.reps}</Text>
          <Text>{item.liftName}</Text>
        </View>
      );
    });
  };
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.TextInput}>
          <TextInput
            placeholder="Your lift"
            onChangeText={exInputHandler}
            onSubmitEditing={addLiftHandler}
          />
        </View>
        <View style={styles.TextInput}>
          <TextInput
            inputMode="numeric"
            placeholder="Your reps"
            onChangeText={repInputHandler}
            onSubmitEditing={addLiftHandler}
          />
        </View>
        <Button title="Add lift" onPress={addLiftHandler} />
      </View>
      <View style={styles.liftsContainer}>{renderArray(lifts)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    PaddingHorizontal: 16,
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  TextInput: {
    borderWidth: 1,
    borderColer: "#cccccc",
    width: "80%",
    barginRight: 8,
    padding: 8,
    marginRight: 8,
  },
  liftsContainer: {
    flex: 3,
    padding: 32,
  },
});
