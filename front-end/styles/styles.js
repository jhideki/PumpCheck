import { StyleSheet } from "react-native";
import { CustomTheme } from "./theme";

const commonVerticalSpacing = 10; // Adjust the value for your desired spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "flex-end",
    marginRight: 16,
    marginTop: 16,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  subContent30: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginVertical: commonVerticalSpacing, // Apply vertical spacing to inputs
  },
  button: {
    width: "60%",
    backgroundColor: CustomTheme.colors.primary,
    marginVertical: commonVerticalSpacing, // Apply vertical spacing to buttons
  },
  buttonSecondary: {
    width: "60%",
    backgroundColor: CustomTheme.colors.secondary,
    marginVertical: commonVerticalSpacing, // Apply vertical spacing to secondary buttons
  },
  textContainer: {
    width: "80%",
    marginVertical: commonVerticalSpacing, // Apply vertical spacing to text containers
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: commonVerticalSpacing, // Apply vertical spacing to text
  },
  horizontalContent: {
    flexDirection: "row",
  },
  horizontalInput: {
    width: "40%",
    marginVertical: commonVerticalSpacing, // Apply vertical spacing to horizontal inputs
  },
});

export default styles;
