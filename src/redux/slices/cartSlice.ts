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
      if (state.find((item) => item.id === action.payload.item.id) == null) {
        state.push({ id: action.payload.item.id, quantity: 1 });
      } else {
        state.map((item) => {
          if (item.id === action.payload.item.id) {
            item.quantity = item.quantity + 1;
          } else {
            return item;
          }
        });
      }
      localStorage.setItem(`cart_${action.payload.uid}`, JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      if (
        state.find((item) => item.id === action.payload.item.id)?.quantity === 1
      ) {
        const filteredCart = state.filter(
          (item) => item.id !== action.payload.item.id
        );
        localStorage.setItem(
          `cart_${action.payload.uid}`,
          JSON.stringify(filteredCart)
        );
        return filteredCart;
      } else {
        state.map((item) => {
          if (item.id === action.payload.item.id) {
            item.quantity = item.quantity - 1;
          } else {
            return item;
          }
        });
      }
      localStorage.setItem(`cart_${action.payload.uid}`, JSON.stringify(state));
    },
    getCart: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { addToCart, removeFromCart, getCart } = cartSlice.actions;

export default cartSlice.reducer;
