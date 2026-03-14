import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TAB_LABELS } from "../constants/categories";

export default function TabSwitcher({ activeTab, onChange }) {
  return (
    <View style={styles.container}>
      {Object.keys(TAB_LABELS).map((key) => {
        const isActive = activeTab === key;
        return (
          <Pressable
            key={key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChange(key)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {TAB_LABELS[key]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#6B7280",
    fontWeight: "600",
  },
  activeText: {
    color: "#111827",
  },
});
