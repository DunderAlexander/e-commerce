import { AnyAction, createSlice, Dispatch } from "@reduxjs/toolkit";
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

const initialState: itemsType[] = [];

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addItem } = itemsSlice.actions;

export const fetchItems = () => async (dispatch: Dispatch<AnyAction>) => {
  const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((doc) => {
    dispatch(
      addItem({
        id: doc.id,
        name: doc.data().name,
        type: doc.data().type,
        price: doc.data().price,
        description: doc.data().description,
        img: doc.data().img,
      })
    );
  });
};
export default itemsSlice.reducer;
