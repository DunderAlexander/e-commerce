import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import items from "../../util/items";

const initialState = items;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});
