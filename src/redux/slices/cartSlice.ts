import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  quantity: number;
}
const cartStorage = localStorage.getItem("cart");
const initialState: CartItem[] = cartStorage ? JSON.parse(cartStorage) : [];

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
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      if (state.find((item) => item.id === action.payload.id)?.quantity === 1) {
        const filteredCart = state.filter(
          (item) => item.id !== action.payload.id
        );
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        return filteredCart;
      } else {
        state.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity - 1;
          } else {
            return item;
          }
        });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
