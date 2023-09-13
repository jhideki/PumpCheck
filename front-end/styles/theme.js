import React from "react";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
  reactNavigationLight: NavigationLightTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const CustomTheme = CombinedDefaultTheme;
console.log(CustomTheme);
export { CustomTheme };
