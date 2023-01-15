import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  quantity: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.find((item) => item.id === action.payload.id) == null) {
        state.push({ id: action.payload.id, quantity: 1 });
      } else {
        state.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity + 1;
          } else {
            return item;
          }
        });
      }
    },
    removeFromCart: (state, action) => {
      if (state.find((item) => item.id === action.payload.id)?.quantity === 1) {
        return state.filter((item) => item.id !== action.payload.id);
      } else {
        state.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity - 1;
          } else {
            return item;
          }
        });
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
