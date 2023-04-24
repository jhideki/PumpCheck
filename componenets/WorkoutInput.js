import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";

import ExcersizeItem from "./ExcersizeItem";
import ExcersizeInput from "./ExcersizeInput";

function WorkoutInput(Props) {
  const [lifts, setLifts] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddLiftHandler() {
    setModalIsVisible(true);
  }

  function endAddliftHandler() {
    setModalIsVisible(false);
  }
  function addLiftHandler(enteredExText, enteredRepsText) {
    setLifts((currentLifts) => [
      ...currentLifts,
      {
        reps: enteredRepsText,
        liftName: enteredExText,
        id: Math.random().toString(),
      },
    ]);
    endAddliftHandler();
  }

  function deleteGoalHandler(id) {
    setLifts((currentLifts) => {
      return currentLifts.filter((lift) => lift.id !== id);
    });
  }
  return (
    <View style={styles.workoutContainer}>
      <Button
        title="Add New Lift"
        color="#5e0acc"
        onPress={startAddLiftHandler}
      />
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
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
        />
      </View>
      <View styles={styles.inputContainer}>
        <Button title="Log Workout" />
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
    paddingTop: 50,
    PaddingHorizontal: 16,
    flex: 1,
  },
});
