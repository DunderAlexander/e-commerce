import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

type itemsType = {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  img: string;
  reviews?: { [uid: string]: SingleReview };
};

export type SingleReview = {
  userName: string;
  rating: number;
  review: string;
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
      reviews: doc.data().reviews,
    });
  });
  return itemsArray;
});

const initialState: itemsType[] = [];

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.length = 0;
      state.push(...action.payload);
    });
  },
});

export const {} = itemsSlice.actions;

export default itemsSlice.reducer;
