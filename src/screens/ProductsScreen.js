import React, { useEffect, useMemo } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import TabSwitcher from "../components/TabSwitcher";
import { TAB_CATEGORIES, TAB_LABELS } from "../constants/categories";
import { fetchProductsByCategory } from "../store/slices/productsSlice";
import { goToDetails, setActiveTab } from "../store/slices/uiSlice";

export default function ProductsScreen() {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.auth);
  const { activeTab } = useSelector((state) => state.ui);
  const { categories, loadingCategories, errorCategories } = useSelector(
    (state) => state.products
  );

  const currentCategories = TAB_CATEGORIES[activeTab];

  useEffect(() => {
    currentCategories.forEach((category) => {
      if (!categories[category]) {
        dispatch(fetchProductsByCategory(category));
      }
    });
  }, [dispatch, currentCategories, categories]);

  const products = useMemo(() => {
    return currentCategories.flatMap((category) => categories[category] || []);
  }, [currentCategories, categories]);

  const isLoading = currentCategories.some((category) => loadingCategories[category]);
  const errorMessage = currentCategories.find((category) => errorCategories[category]);

  const handleRefresh = () => {
    currentCategories.forEach((category) => {
      dispatch(fetchProductsByCategory(category));
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
    >
      <Text style={styles.title}>Olá, {userName} 👋</Text>
      <Text style={styles.subtitle}>
        Explore produtos da categoria {TAB_LABELS[activeTab].toLowerCase()}.
      </Text>

      <TabSwitcher activeTab={activeTab} onChange={(tab) => dispatch(setActiveTab(tab))} />

      {errorMessage ? (
        <ErrorState
          message="Não foi possível carregar os produtos dessa categoria."
          onRetry={handleRefresh}
        />
      ) : null}

      {isLoading && products.length === 0 ? <LoadingState text="Buscando produtos..." /> : null}

      {!isLoading && products.length === 0 && !errorMessage ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
          <Text style={styles.emptyText}>Tente atualizar para buscar novamente.</Text>
        </View>
      ) : null}

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onPress={() => dispatch(goToDetails(product.id))}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 18,
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  emptyText: {
    color: "#6B7280",
  },
});
