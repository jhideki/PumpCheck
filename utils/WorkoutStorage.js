import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveWorkout = async (workout) => {
  try {
    const workoutString = JSON.stringify(workout);
    await AsyncStorage.setItem("myEventKey", workoutString);
    console.log("Event saved successfully.");
  } catch (error) {
    console.log("Error saving event:", error);
  }
};

export const getWorkout = async () => {
  try {
    const workoutString = await AsyncStorage.getItem("myEventKey");
    const event = JSON.parse(workoutString);
    console.log("Retrieved event:", event);
    return event;
  } catch (error) {
    console.log("Error retrieving event:", error);
  }
};

export const deleteWorkout = async () => {
  try {
    await AsyncStorage.removeItem("myEventKey");
    console.log("Event deleted successfully.");
  } catch (error) {
    console.log("Error deleting event:", error);
  }
};
