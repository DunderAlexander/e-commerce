import { useState } from "react";
import { auth } from "../api/firebase";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {};
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
    </div>
  );
};

export default User;
