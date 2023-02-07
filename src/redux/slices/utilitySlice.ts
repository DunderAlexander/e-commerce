import { createSlice } from "@reduxjs/toolkit";

interface utilityType {
  isCartOpen: boolean;
  isUserOpen: boolean;
  searchQuery: string;
}

const initialState: utilityType = {
  isCartOpen: false,
  isUserOpen: false,
  searchQuery: "",
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    setIsUserOpen: (state, action) => {
      state.isUserOpen = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
export const { setIsCartOpen, setIsUserOpen, setSearchQuery } =
  utilitySlice.actions;
export default utilitySlice.reducer;
