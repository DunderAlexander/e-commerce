import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";

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

// export const userSignIn = createAsyncThunk(
//   "userAccount/userSignIn",
//   async (payload: any, thunkApi) => {
//     const { email, password } = payload;
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredentials) => {
//         return userCredentials.user;
//       })
//       .catch((e) => {
//         thunkApi.dispatch(setError(e));
//         return null;
//       });
//   }
// );

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
  // extraReducers: (builder) => {
  //   builder.addCase(userSignIn.pending, (state) => {
  //     state.user = null;
  //     state.error = null;
  //   });
  //   builder.addCase(userSignIn.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //   });
  // },
});

export const { setEmail, setPassword, setUser, setError } =
  userAccountSlice.actions;
export default userAccountSlice.reducer;
