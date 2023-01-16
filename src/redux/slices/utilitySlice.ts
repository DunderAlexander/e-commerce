import { createSlice } from "@reduxjs/toolkit";

interface utilityType {
  isCartOpen: boolean;
}

const initialState: utilityType = {
  isCartOpen: false,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
  },
});
export const { setIsCartOpen } = utilitySlice.actions;
export default utilitySlice.reducer;
