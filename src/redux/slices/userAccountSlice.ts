import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userType {
  userName: string;
  uid: string;
}
interface userAccountType {
  user: userType | null;
  error: string | null;
}

const initialState: userAccountType = {
  user: null,
  error: null,
};

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = userAccountSlice.actions;
export default userAccountSlice.reducer;
