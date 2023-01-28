import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { setError } from "../redux/slices/userAccountSlice";
import { RootState } from "../redux/store";

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

  if (user) {
    return (
      <div className="fixed top-20 right-36 w-64 h-64 bg-slate-100 rounded-lg p-4 pb-8 z-10">
        <h1>
          Welcome,{" "}
          <b className="text-xs">{user.userName ? user.userName : user.uid}</b>
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
    <div className="fixed top-20 right-36 w-64 h-64 bg-slate-100 rounded-lg p-4 pb-8 z-10">
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign in</button>
      </form>
      {error && (
        <div>
          <p className="text-red-600 font-medium">Wrong password or email.</p>
        </div>
      )}
    </div>
  );
};

export default User;