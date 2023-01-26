import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../api/firebase";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        setError(error);
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
