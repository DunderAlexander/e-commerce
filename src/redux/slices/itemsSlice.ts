import { createSlice } from "@reduxjs/toolkit";
import items from "../../util/items";

const initialState = items;

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
});

export default itemsSlice.reducer;
