import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { setError } from "../redux/slices/userAccountSlice";
import { RootState } from "../redux/store";
import { setIsUserOpen } from "../redux/slices/utilitySlice";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, error } = useSelector((state: RootState) => state.userAccount);
  const dispatch = useDispatch();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(setError(null));
      })
      .catch((error) => {
        dispatch(setError(error.code));
      });
  };
  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  if (user) {
    return (
      <div className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 min-w-[14rem] drop-shadow-2xl bg-white rounded-lg p-4 z-10 flex flex-col">
        <button
          className="absolute right-2 top-0 font-bold"
          onClick={() => {
            dispatch(setIsUserOpen(false));
          }}
        >
          x
        </button>
        <h1 className="text-center mb-2">
          Welcome, <b>{user.displayName}</b>
        </h1>
        <button
          className="bg-blue-600 p-2 rounded-lg text-white text-xs"
          onClick={() => signOut(auth)}
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 max-w-60 drop-shadow-2xl bg-white rounded-lg p-8 z-10 flex flex-col gap-2">
      <button
        className="absolute right-2 top-0 font-bold"
        onClick={() => {
          dispatch(setIsUserOpen(false));
        }}
      >
        x
      </button>
      <form onSubmit={handleSignIn} className="flex flex-col gap-2">
        <input
          className="p-3 rounded-lg border border-gray-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="p-3 rounded-lg border border-gray-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className="bg-blue-700 text-white p-2 rounded-lg">
          Sign in
        </button>
      </form>
      <button
        className="bg-red-600 text-white p-2 rounded-lg"
        onClick={() => handleSignInWithGoogle()}
      >
        Sign in with Google
      </button>
      {error && (
        <div>
          <p className="text-red-600 font-medium">Wrong password or email.</p>
        </div>
      )}
    </div>
  );
};

export default User;
