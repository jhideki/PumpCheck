import { StyleSheet, View, Text, Pressable } from "react-native";
function ExcersizeItem(props) {
  return (
    <Pressable
      android_ripple={{ color: "#210644" }}
      onPress={props.onDeleteItem.bind(this, props.id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.excersizeItem}>
        <Text style={styles.excersizeText}>{props.reps}</Text>
        <Text style={styles.excersizeText}>{props.liftName}</Text>
      </View>
    </Pressable>
  );
}

export default ExcersizeItem;

const styles = StyleSheet.create({
  excersizeItem: {
    flexDirection: "row",
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  excersizeText: {
    color: "white",
    padding: 8,
  },
});
