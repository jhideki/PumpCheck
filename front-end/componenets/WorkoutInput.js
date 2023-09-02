import { useState } from "react";
import { StyleSheet, View, FlatList, Button, TextInput } from "react-native";

import ExcersizeItem from "./ExcersizeItem";
import ExcersizeInput from "./ExcersizeInput";

function WorkoutInput(Props) {
  const [lifts, setLifts] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [enteredNameText, setEnteredNameText] = useState("");

  function startAddLiftHandler() {
    setModalIsVisible(true);
  }

  function endAddliftHandler() {
    setModalIsVisible(false);
  }
  function addLiftHandler(muscleGroup, excersiseName, enteredRepsText) {
    setLifts((currentLifts) => [
      ...currentLifts,
      {
        muscle: muscleGroup,
        reps: enteredRepsText,
        liftName: excersiseName,
        id: Math.random().toString(),
      },
    ]);
    endAddliftHandler();
  }

  function addWorkoutHandler() {
    Props.onLogWorkout(lifts, enteredNameText);
  }

  function deleteGoalHandler(id) {
    setLifts((currentLifts) => {
      return currentLifts.filter((lift) => lift.id !== id);
    });
  }

  function workOutInputHandler(userInput) {
    setEnteredNameText(userInput);
  }

  return (
    <View style={styles.workoutContainer}>
      <View styles={styles.addNewLiftButtonContainer}>
        <Button
          title="Add New Lift"
          color="#5e0acc"
          onPress={startAddLiftHandler}
        />
      </View>
      {modalIsVisible && (
        <ExcersizeInput
          onAddLift={addLiftHandler}
          visible={modalIsVisible}
          onCancel={endAddliftHandler}
        />
      )}
      <View style={styles.liftsContainer}>
        <FlatList
          data={lifts}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <ExcersizeItem
                id={item.id}
                reps={item.reps}
                liftName={item.liftName}
                muscleGroup={item.muscle}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
        />
      </View>
      <View styles={styles.exportLiftContainer}>
        <View styles={styles.textInput}>
          <TextInput
            placeholder="Name your workout"
            onChangeText={workOutInputHandler}
            value={enteredNameText}
          />
        </View>
        <Button title="Log Workout" onPress={addWorkoutHandler} />
      </View>
    </View>
  );
}

export default WorkoutInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  liftsContainer: {
    flex: 3,
    padding: 32,
  },
  workoutContainer: {
    PaddingHorizontal: 16,
    flex: 1,
  },
  textInput: {
    PaddingHorizontal: 16,
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
    padding: 8,
    alignItems: "center",
  },
  addNewLiftButtonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  exportLiftContainer: {
    flex: 1,
  },
});
