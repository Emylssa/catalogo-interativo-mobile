import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import AppButton from "../components/AppButton";
import { login } from "../store/slices/authSlice";
import { clearSelectedProduct } from "../store/slices/productsSlice";
import { goToList, setActiveTab } from "../store/slices/uiSlice";

export default function LoginScreen() {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!userName.trim()) {
      Alert.alert("Campos obrigatórios", "Digite seu nome para entrar no aplicativo.");
      return;
    }

    dispatch(login(userName.trim()));
    dispatch(goToList());
    dispatch(setActiveTab("masculino"));
    dispatch(clearSelectedProduct());
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Entre para visualizar os produtos por categoria.
        </Text>

        <Text style={styles.label}>Nome do usuário</Text>
        <TextInput
          value={userName}
          onChangeText={setUserName}
          placeholder="Digite seu nome"
          style={styles.input}
        />

        <AppButton title="Entrar" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  label: {
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },
});
