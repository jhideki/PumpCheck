import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
function ExcersizeInput(props) {
  const [enteredExText, setEnteredExText] = useState("");
  const [enteredRepsText, setEnteredRepsText] = useState("");

  function exInputHandler(userInput) {
    setEnteredExText(userInput);
  }
  function repInputHandler(userInput) {
    setEnteredRepsText(userInput);
  }

  function addLiftHandler() {
    props.onAddLift(enteredExText, enteredRepsText);
    setEnteredExText("");
    setEnteredRepsText("");
  }
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Your lift"
            onChangeText={exInputHandler}
            value={enteredExText}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            inputMode="numeric"
            placeholder="Your reps"
            onChangeText={repInputHandler}
            value={enteredRepsText}
          />
        </View>
        <View>
          <Button title="Add lift" onPress={addLiftHandler} />
          <Button title="Cancel" onPress={props.onCancel} />
        </View>
      </View>
    </Modal>
  );
}
export default ExcersizeInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColer: "#cccccc",
    width: "80%",
    barginRight: 8,
    padding: 8,
    marginRight: 8,
  },
});
