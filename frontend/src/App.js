import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import GameDashboard from "./GameDashboard";
import Game from "./GameEnv";
import MovieQuiz from "./MovieQuiz";
import MovieTyping from "./MovieTyping";

// ===== Login Component =====
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (username && password) {
      alert(`Welcome ${username}! Redirecting to dashboard...`);
      navigate("/dashboard");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <div className="glass-container animate-slide-up" style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <div className="animate-float" style={{ fontSize: "3rem", marginBottom: "10px" }}>🍿</div>
        <h1 style={{ fontSize: "2.2rem", color: "var(--gold-primary)", marginBottom: "5px" }}>Movie Game Hub</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "30px" }}>Let the show begin!</p>
        
        <h2 style={{ fontSize: "1.4rem", marginBottom: "20px", fontWeight: "600" }}>Sign In</h2>
        <div style={{ textAlign: "left", marginBottom: "15px" }}>
          <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px", display: "block", fontWeight: "600" }}>Username</label>
          <input
            className="input-field"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "left", marginBottom: "25px" }}>
          <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px", display: "block", fontWeight: "600" }}>Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className="btn-primary" onClick={login} style={{ width: "100%" }}>
          Get Ticket 🎟️
        </button>
        
        <p style={{ marginTop: "24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          New to the hub?{" "}
          <Link to="/register" style={{ color: "var(--gold-primary)", textDecoration: "none", fontWeight: "bold" }}>
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

// ===== Register Component =====
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (username && password) {
      alert(`Account created for ${username}`);
      navigate("/");
    } else {
      alert("Fill in all fields");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <div className="glass-container animate-slide-up" style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <div className="animate-float" style={{ fontSize: "3rem", marginBottom: "10px" }}>🎬</div>
        <h1 style={{ fontSize: "2.2rem", color: "var(--gold-primary)", marginBottom: "5px" }}>Movie Game Hub</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "30px" }}>Create your player profile</p>
        
        <h2 style={{ fontSize: "1.4rem", marginBottom: "20px", fontWeight: "600" }}>Register</h2>
        <div style={{ textAlign: "left", marginBottom: "15px" }}>
          <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px", display: "block", fontWeight: "600" }}>Username</label>
          <input
            className="input-field"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "left", marginBottom: "25px" }}>
          <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px", display: "block", fontWeight: "600" }}>Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className="btn-primary" onClick={register} style={{ width: "100%" }}>
          Create Profile 🚀
        </button>
        
        <p style={{ marginTop: "24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Already have a ticket?{" "}
          <Link to="/" style={{ color: "var(--gold-primary)", textDecoration: "none", fontWeight: "bold" }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

// ===== App Component =====
function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<GameDashboard />} />

        {/* Games */}
        <Route path="/game" element={<Game />} />
        <Route path="/quiz" element={<MovieQuiz />} />
        <Route path="/typing" element={<MovieTyping />} />
      </Routes>
    </Router>
  );
}

export default App;
