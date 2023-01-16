import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slices/itemsSlice";
import cartReducer from "./slices/cartSlice";
import utilityReducer from "./slices/utilitySlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
    utility: utilityReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
