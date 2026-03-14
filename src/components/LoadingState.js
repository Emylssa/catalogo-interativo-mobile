import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingState({ text = "Carregando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#111827" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 12,
    color: "#6B7280",
  },
});
