import { createSlice } from "@reduxjs/toolkit";
import items from "../../util/items";

//TODO - get items from Firestore

const initialState = items;

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
});

export default itemsSlice.reducer;
