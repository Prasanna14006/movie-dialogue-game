import React from "react";
import { useNavigate } from "react-router-dom";

function GameDashboard() {
  const navigate = useNavigate();

  const games = [
    {
      name: "🎬 Movie Dialogue Game",
      path: "/game",
      desc: "Hear legendary movie quotes and identify the film. Great fun for the whole family!",
      color: "var(--gold-primary)",
      icon: "🍿"
    },
    {
      name: "🧠 Movie Trivia Quiz",
      path: "/quiz",
      desc: "Test your movie knowledge with multiple-choice questions on directors, actors, and songs.",
      color: "#00f2fe",
      icon: "🎥"
    },
    {
      name: "⚡ Speed Typing Game",
      path: "/typing",
      desc: "Race against the clock! Type famous movie lines accurately before time runs out.",
      color: "#ff007f",
      icon: "⚡"
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", padding: "40px 20px" }}>
      {/* Top Bar / Navigation header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1000px", margin: "0 auto", width: "100%", marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.8rem" }}>🎬</span>
          <span style={{ fontWeight: "800", fontSize: "1.2rem", letterSpacing: "1px", color: "var(--gold-primary)" }}>CINEPLAY</span>
        </div>
        <button 
          className="btn-secondary" 
          onClick={() => navigate("/")}
          style={{ padding: "8px 20px", fontSize: "0.9rem" }}
        >
          🚪 Leave Lobby
        </button>
      </div>

      {/* Main Content */}
      <div className="animate-fade-in" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "3rem", color: "#ffffff", marginBottom: "15px", fontWeight: "800" }}>
            Movie Game Hub
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
            Step into the ultimate arena for film lovers of all generations. Pick your theater show and test your cinema smarts!
          </p>
        </div>

        {/* Game cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            width: "100%",
            marginTop: "20px",
          }}
        >
          {games.map((game, index) => (
            <div
              key={index}
              className="glass-container animate-slide-up"
              onClick={() => navigate(game.path)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "35px",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                textAlign: "left",
                animationDelay: `${index * 0.15}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = game.color;
                e.currentTarget.style.boxShadow = `0px 15px 35px rgba(0, 0, 0, 0.6), 0px 0px 25px ${game.color}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.borderColor = "var(--glass-border)";
                e.currentTarget.style.boxShadow = "0 16px 40px var(--glass-shadow)";
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ fontSize: "2.5rem" }}>{game.icon}</div>
                  <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)", fontWeight: "600" }}>Theater {index+1}</span>
                </div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "12px", color: "#ffffff" }}>
                  {game.name}
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "25px" }}>
                  {game.desc}
                </p>
              </div>
              
              <button
                className="btn-primary"
                style={{
                  width: "100%",
                  background: `linear-gradient(135deg, ${game.color} 0%, #ff8800 100%)`,
                  color: game.color === "var(--gold-primary)" ? "#080612" : "#ffffff",
                  boxShadow: `0 4px 15px ${game.color}33`
                }}
              >
                🎬 Play Now
              </button>
            </div>
          ))}
        </div>

        <footer style={{ marginTop: "70px", fontSize: "0.95rem", color: "var(--text-muted)", textAlign: "center" }}>
          🍿 Grab your popcorn & enjoy! Works great on tablets, mobile, and desktops.
        </footer>
      </div>
    </div>
  );
}

export default GameDashboard;
