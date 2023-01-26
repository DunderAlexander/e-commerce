import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./slices/itemsSlice";
import cartReducer from "./slices/cartSlice";
import utilityReducer from "./slices/utilitySlice";
import userAccountReducer from "./slices/userAccountSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
    utility: utilityReducer,
    userAccount: userAccountReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
