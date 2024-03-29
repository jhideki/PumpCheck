import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import TabNavigator from "./componenets/TabNavigator";
import CustomTheme from "./styles/theme";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpPersonalInfoScreen from "./screens/SignUpPersonalInfoScreen";
import GoogleSignInScreen from "./screens/GoogleSignInScreen";
import { AuthProvider } from "./utils/AuthContext";
import AuthStateListener from "./utils/AuthStateListener";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AuthStateListener />
      <PaperProvider theme={CustomTheme}>
        <NavigationContainer theme={CustomTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Signup"
              component={SignUpScreen}
              options={{ title: "Create an account", headerTitle: "" }}
            ></Stack.Screen>
            <Stack.Screen
              name="SignupPersonInfo"
              component={SignUpPersonalInfoScreen}
              options={{ title: "Tell us about you" }}
            ></Stack.Screen>
            <Stack.Screen
              name="GoogleAuth"
              component={GoogleSignInScreen}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerTitle: "" }}
            ></Stack.Screen>
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
