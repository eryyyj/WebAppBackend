import React, { useState } from "react";

const SignupPage = ({ setPage, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setPage("dashboard");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => setPage("login")}>Back to Login</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </div>
  );
};

export default SignupPage;
