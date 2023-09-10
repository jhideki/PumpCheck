import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import styles from "../styles/styles";

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" subtitle={"Subtitle"} />
      </Appbar.Header>

      <View style={styles.content}>
        {/* Other content of the home screen */}
      </View>
    </View>
  );
}

export default HomeScreen;
