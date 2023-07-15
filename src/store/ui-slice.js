import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartVisible: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    showNotificationNull(state) {
        state.notification = null;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
