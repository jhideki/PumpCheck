import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import AddWorkoutScreen from "./screens/AddWorkoutScreen";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Workout" component={AddWorkoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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
