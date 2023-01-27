import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import {
  setEmail,
  setError,
  setPassword,
  setUser,
} from "../redux/slices/userAccountSlice";
import { RootState } from "../redux/store";

const User = () => {
  const { email, password, user, error } = useSelector(
    (state: RootState) => state.userAccount
  );
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user));
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
  if (user) {
    return (
      <div className="fixed top-20 right-36 w-64 h-64 bg-slate-100 rounded-lg p-4 pb-8 z-10">
        <h1>
          Welcome, <b className="text-xs">{user.uid}</b>
        </h1>
      </div>
    );
  }
  return (
    <div className="fixed top-20 right-36 w-64 h-64 bg-slate-100 rounded-lg p-4 pb-8 z-10">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            dispatch(setEmail(e.target.value));
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            dispatch(setPassword(e.target.value));
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
