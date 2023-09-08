import { DefaultTheme } from "react-native-paper";

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "blue", // Change the primary color
    accent: "red", // Change the accent color
  },
};

export default customTheme;
