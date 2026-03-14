import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native";
import store from "./src/store";
import LoginScreen from "./src/screens/LoginScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import { logout } from "./src/store/slices/authSlice";
import AppButton from "./src/components/AppButton";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, userName } = useSelector((state) => state.auth);
  const { currentScreen } = useSelector((state) => state.ui);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        {currentScreen === "details" ? "Detalhes do Produto" : "Catálogo Interativo"}
      </Text>
      {isAuthenticated ? (
        <View style={styles.headerRight}>
          <Text style={styles.headerUser} numberOfLines={1}>
            {userName}
          </Text>
          <AppButton title="Sair" onPress={() => dispatch(logout())} compact />
        </View>
      ) : null}
    </View>
  );
}

function Root() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { currentScreen } = useSelector((state) => state.ui);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      {isAuthenticated ? (
        currentScreen === "details" ? <ProductDetailScreen /> : <ProductsScreen />
      ) : (
        <LoginScreen />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    maxWidth: "45%",
  },
  headerUser: {
    color: "#6B7280",
    fontSize: 13,
    flexShrink: 1,
  },
});
