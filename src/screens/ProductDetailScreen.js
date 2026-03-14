import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../components/AppButton";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import { fetchProductById } from "../store/slices/productsSlice";
import { goToList } from "../store/slices/uiSlice";

export default function ProductDetailScreen() {
  const dispatch = useDispatch();
  const { selectedProductId } = useSelector((state) => state.ui);
  const { selectedProduct, selectedProductLoading, selectedProductError } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (selectedProductId) {
      dispatch(fetchProductById(selectedProductId));
    }
  }, [dispatch, selectedProductId]);

  if (selectedProductLoading || !selectedProduct) {
    return (
      <View style={styles.centered}>
        {selectedProductError ? (
          <ErrorState
            message="Não foi possível carregar os detalhes do produto."
            onRetry={() => dispatch(fetchProductById(selectedProductId))}
          />
        ) : (
          <LoadingState text="Carregando detalhes..." />
        )}
        <View style={{ marginTop: 12 }}>
          <AppButton title="Voltar" onPress={() => dispatch(goToList())} variant="secondary" />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: selectedProduct.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{selectedProduct.title}</Text>
      <Text style={styles.category}>{selectedProduct.category}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Preço</Text>
        <Text style={styles.infoValue}>R$ {selectedProduct.price}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Desconto</Text>
        <Text style={styles.infoValue}>{selectedProduct.discountPercentage}%</Text>
      </View>

      <AppButton title="Voltar para a lista" onPress={() => dispatch(goToList())} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  centered: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  category: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    color: "#374151",
    marginBottom: 12,
    fontWeight: "600",
  },
  description: {
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 18,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 12,
  },
  infoLabel: {
    color: "#6B7280",
    marginBottom: 6,
  },
  infoValue: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
  },
});
