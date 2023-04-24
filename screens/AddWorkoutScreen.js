import { StyleSheet, View, Text, Pressable } from "react-native";
import WorkoutInput from "../componenets/WorkoutInput";
function AddWorkoutScreen(Props) {
  return (
    <View style={styles.appContainer}>
      <WorkoutInput />
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
