import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentScreen: "list",
  selectedProductId: null,
  activeTab: "masculino",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    goToList: (state) => {
      state.currentScreen = "list";
      state.selectedProductId = null;
    },
    goToDetails: (state, action) => {
      state.currentScreen = "details";
      state.selectedProductId = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    resetUi: () => initialState,
  },
});

export const { goToList, goToDetails, setActiveTab, resetUi } = uiSlice.actions;
export default uiSlice.reducer;
