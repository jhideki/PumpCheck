import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper"; // Import PaperProvider
import customTheme from "./customTheme"; // Import your custom theme
import HomeScreen from "./screens/HomeScreen";
import AddWorkoutScreen from "./screens/AddWorkoutScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add Workout" component={AddWorkoutScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
