// styles.js

import { StyleSheet } from "react-native";

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
    marginBottom: 12,
  },
  button: {
    wdith: "100%",
    marginBottom: 12,
  },
});

export default styles;
