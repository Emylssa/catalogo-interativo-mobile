import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return {
      category,
      products: response.data.products || [],
    };
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
);

const initialState = {
  categories: {},
  loadingCategories: {},
  errorCategories: {},
  selectedProduct: null,
  selectedProductLoading: false,
  selectedProductError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.selectedProductError = null;
      state.selectedProductLoading = false;
    },
    resetProducts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        const category = action.meta.arg;
        state.loadingCategories[category] = true;
        state.errorCategories[category] = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { category, products } = action.payload;
        state.loadingCategories[category] = false;
        state.categories[category] = products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        const category = action.meta.arg;
        state.loadingCategories[category] = false;
        state.errorCategories[category] =
          action.error.message || "Erro ao carregar produtos.";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProductLoading = true;
        state.selectedProductError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProductError =
          action.error.message || "Erro ao carregar detalhes.";
      });
  },
});

export const { clearSelectedProduct, resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
