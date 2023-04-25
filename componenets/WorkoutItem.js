import React from "react";
import { StyleSheet, View, Text } from "react-native";

const WorkoutItem = ({ workout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.excersizeText}>{workout.date}</Text>
      <Text style={styles.location}>{workout.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  date: {
    fontSize: 16,
    color: "#666666",
    marginTop: 8,
  },
  time: {
    fontSize: 16,
    color: "#666666",
    marginTop: 4,
  },
  location: {
    fontSize: 16,
    color: "#666666",
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    marginTop: 12,
  },
});

export default WorkoutItem;
