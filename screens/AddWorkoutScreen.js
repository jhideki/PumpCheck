import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import WorkoutInput from "../componenets/WorkoutInput";
import { saveWorkout } from "../utils/WorkoutStorage";
function AddWorkoutScreen(Props) {
  const [Workout, setWorkout] = useState({
    excsersizes: {},
    name: "",
    date: "",
    id: "",
  });

  function addWorkoutHandler(lifts, enteredName) {
    setWorkout({
      excsersizes: lifts,
      name: enteredName,
      date: new Date().toLocaleDateString(),
      id: Math.random().toString(),
    });
    saveWorkout(Workout);
  }
  return (
    <View style={styles.appContainer}>
      <WorkoutInput onLogWorkout={addWorkoutHandler} />
    </View>
  );
}
export default AddWorkoutScreen;

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    PaddingHorizontal: 16,
    flex: 1,
  },

  liftsContainer: {
    flex: 3,
    padding: 32,
  },
});
