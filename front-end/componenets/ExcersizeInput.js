import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Text } from "react-native";
import { Muscle } from "../data/exercise.d";
import { Dropdown } from "react-native-element-dropdown";
import { GetExercisesByMuscle } from "../utils/SortExersizes";

function ExcersizeInput(props) {
  const [enteredRepsText, setEnteredRepsText] = useState(""); // user input
  const [muscleGroup, setMuscleGroup] = useState(""); // user input
  const [excersise, setExcersise] = useState(""); // user input
  const [exercisesItems, setExcersisesItems] = useState([]); // dropdown items
  const [muscleGroupItems, setMuscleGroupItems] = useState(
    Object.values(Muscle).map((itemValue) => ({
      label: itemValue,
      value: itemValue,
      name: itemValue,
      id: Math.random().toString(),
    }))
  ); // dropdown items

  useEffect(() => {
    async function fetchData() {
      const filteredExercises = GetExercisesByMuscle(muscleGroup);
      const formattedExercises = filteredExercises.map((exercise) => ({
        label: exercise,
        value: exercise,
        name: exercise,
        id: Math.random().toString(),
      }));

      setExcersisesItems(formattedExercises);
    }
    fetchData();
  }, [muscleGroup]);

  function exInputHandler(userInput) {
    setEnteredExText(userInput);
  }

  function repInputHandler(userInput) {
    setEnteredRepsText(userInput);
  }

  function addLiftHandler() {
    props.onAddLift(muscleGroup, excersise, enteredRepsText);
    setMuscleGroup("");
    setEnteredRepsText("");
    setExcersise("");
  }

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <View style={styles.dropDownContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={muscleGroupItems}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select muscle group"
            searchPlaceholder="Search..."
            value={muscleGroup}
            onChange={(muscleGroupItems) => {
              setMuscleGroup(muscleGroupItems.value);
            }}
          />
        </View>
        <View style={styles.dropDownContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={exercisesItems}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select excersise"
            searchPlaceholder="Search..."
            value={excersise}
            onChange={(exercisesItems) => {
              setExcersise(exercisesItems.value);
            }}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            inputMode="numeric"
            placeholder="Number of reps"
            onChangeText={repInputHandler}
            value={enteredRepsText}
            placeholderTextColor="black"
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
  },
  textInput: {
    fontSize: 16,
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  dropDownContainer: {
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
