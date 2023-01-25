import { createSlice } from "@reduxjs/toolkit";

interface utilityType {
  isCartOpen: boolean;
  isUserOpen: boolean;
}

const initialState: utilityType = {
  isCartOpen: false,
  isUserOpen: false,
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
  },
});
export const { setIsCartOpen, setIsUserOpen } = utilitySlice.actions;
export default utilitySlice.reducer;
