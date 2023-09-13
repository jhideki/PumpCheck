// styles.js

import { StyleSheet } from "react-native";
import { CustomTheme } from "./theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "flex-end",
    marginRight: 16,
    marginTop: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%", // Set the width to 100% to make it full width
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
    width: "60%",
    backgroundColor: CustomTheme.colors.primary,
  },
  button2: {
    marginBottom: 10,
    width: "60%",
    backgroundColor: CustomTheme.colors.secondary,
  },
});

export default styles;
