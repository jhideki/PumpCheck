import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import AddWorkoutScreen from "../screens/AddWorkoutScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Workout"
        component={AddWorkoutScreen}
        options={{
          tabBarLabel: "Add Workout",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={LoginScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
