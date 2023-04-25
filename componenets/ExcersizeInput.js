import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import { Muscle } from "../data/exercise.d";
import DropDownPicker from "react-native-dropdown-picker";

function ExcersizeInput(props) {
  const [enteredExText, setEnteredExText] = useState("");
  const [enteredRepsText, setEnteredRepsText] = useState("");
  const [muscleGroup, setMuslceGroup] = useState("chest");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    ...Object.values(Muscle).map((itemValue) => ({
      label: itemValue,
      value: itemValue,
    })),
  ]);

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
        <DropDownPicker
          open={open}
          items={items}
          setOpen={setOpen}
          setItems={setItems}
          style={styles.textInput}
        />
        <View style={styles.textInput}>
          <TextInput
            inputMode="numeric"
            placeholder="Your reps"
            onChangeText={repInputHandler}
            value={enteredRepsText}
          />
        </View>
        <View style={styles.buttonContainer}>
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
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 36,
  },
});
