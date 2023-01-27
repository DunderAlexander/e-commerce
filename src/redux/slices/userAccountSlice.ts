import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface userAccountType {
  email: string;
  password: string;
  user: any | null;
  error: string | null;
}

const initialState: userAccountType = {
  email: "",
  password: "",
  user: null,
  error: null,
};

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEmail, setPassword, setUser, setError } =
  userAccountSlice.actions;
export default userAccountSlice.reducer;
