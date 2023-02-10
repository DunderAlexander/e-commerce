import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  Dispatch,
} from "@reduxjs/toolkit";
import items from "../../util/items";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

//TODO: get items from Firestore

type itemsType = {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  img: string;
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const itemsArray: itemsType[] = [];
  querySnapshot.forEach((doc) => {
    itemsArray.push({
      id: doc.id,
      name: doc.data().name,
      type: doc.data().type,
      price: doc.data().price,
      description: doc.data().description,
      img: doc.data().img,
    });
  });
  return itemsArray;
});

const initialState = {
  items: [] as itemsType[],
  isLoading: false,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items.length = 0;
      state.items.push(...action.payload);
      state.isLoading = false;
    });
  },
});

export const {} = itemsSlice.actions;

export default itemsSlice.reducer;
