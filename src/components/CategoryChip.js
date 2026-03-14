import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CategoryChip({ label }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },
  text: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "600",
  },
});
