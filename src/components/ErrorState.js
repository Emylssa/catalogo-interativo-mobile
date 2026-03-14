import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "./AppButton";

export default function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ops, algo deu errado</Text>
      <Text style={styles.message}>{message}</Text>
      <AppButton title="Tentar novamente" onPress={onRetry} variant="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#FECACA",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#991B1B",
  },
  message: {
    color: "#7F1D1D",
    textAlign: "center",
  },
});
