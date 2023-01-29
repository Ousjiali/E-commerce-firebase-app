import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.user.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.user.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.user = state.user.filter((item) => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.user = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
