import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function MovieTyping() {
  const navigate = useNavigate();

  // Kollywood Dialogues & Songs categorized by difficulty
  const easyDialogues = [
    "Kabali da",
    "Magizhchi",
    "Singam single ah varum",
    "Ithu enna piraviyo",
    "Vera level",
    "Vaathi coming",
    "En vazhi thani vazhi",
    "Aaluma doluma",
    "Rowdy baby",
    "Naan veezhven endru ninaithayo",
    "Theri double theri",
    "Aadama jaichomada",
    "Verithanam",
    "Podu thakka thimi",
    "Chitti the robot"
  ];

  const mediumDialogues = [
    "Naan oru thadava sonna, nooru thadava sonna madhiri",
    "Neenga nallavara kettavara nu enaku theriyathu",
    "Singam single-ah dhaan varum, panni dhaan koottama varum",
    "Amma, naan unga pulla illa da, naan oru rowdy da",
    "Naan thottaa current pass aagum da, paathirukiya",
    "Unaku adhu venum nu thonichu na, adha nee dhaan thedi ponom",
    "Kanna, laddu thinna aasaiya nu ketta, aasa thaan solluven",
    "Chellama en chellama, unna paathu naanum sokki ponen",
    "Kutti story oru kutti story, pay attention please",
    "Ennoda bullet unna absolute-ah thookum paathiya",
    "Who is the black sheep? Two points for the black sheep",
    "Oru murai mudivu panna en pechane ketka maaten",
    "Wasted wasted wasted, en vazhkaiye wasted aayiduchi",
    "Jimikki ponnu nee jimikki ponnu, en manasa thottutiye",
    "Otha sollaala en usirey edutha, nee en devadhai"
  ];

  const hardDialogues = [
    "If you are bad, I am your dad! Idhu thaan da en vazhi, en style!",
    "Singam single-ah dhaan varum, panni dhaan koottama varum, aana naan singamum illa panniyum illa, naanthaan da Kabali!",
    "Naan oru thadava sonna, nooru thadava sonna madhiri! Kettuko, purinjiko!",
    "Neenga nallavara kettavara? Enaku theriyadhu, aana enaku unna nallavara dhaan theriyum.",
    "Oru dharavi rowdy ah kootitu vaa nu sonna, nee oru bayangaramana aal kootitu vandhurukye da!",
    "En vazhi, thani vazhi! Enna ethirkura yarum vazhnthadha sarithirame kidaiyadhu, therinjiko!",
    "Ulagathileye bayangaramana aal yaar nu ketta, adhu naanthaan nu solluven da!",
    "Un mugathil oru bayam iruku paathiya? Adhudhaan en vetri, adhudhaan en gethu!",
    "Aalaporaan thamizhan ulagam ellaam, avan peyarai kettale current pass aagum da!",
    "Who is the black sheep? Two points! Oru thadava sonna nooru thadava sonna madhiri!",
    "Ennoda bullet unna absolute-ah thookum da! Chellama en chellama, enna paathu shock aayitingala?",
    "Why this kolaveri kolaveri di? Enna paathu yen ipdi kettukittu iruka nee?",
    "Kutti story oru kutti story! Let me tell a small story, don't worry, be happy baby!",
    "Kabali da! Singam single-ah dhaan varum nu sonnanga, aana Kabali eppodhume mass ah dhaan varuvan!",
    "Amma, naan unga pulla illa da, naan oru rowdy da! Naan thottaa current pass aagum da!"
  ];

  const [difficulty, setDifficulty] = useState(() => {
    return localStorage.getItem("typing_difficulty") || "easy";
  });

  const [activeQuotes, setActiveQuotes] = useState([]);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [gameOver, setGameOver] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [roundStats, setRoundStats] = useState([]);

  const inputRef = useRef(null);

  // Get timer duration based on difficulty
  const getTimerDuration = (diff) => {
    if (diff === "hard") return 15;
    if (diff === "medium") return 20;
    return 25;
  };

  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Start new game round of 5 questions
  const startNewRound = (currentDiff) => {
    let pool = easyDialogues;
    if (currentDiff === "medium") pool = mediumDialogues;
    if (currentDiff === "hard") pool = hardDialogues;

    const selectedQuotes = shuffleArray(pool).slice(0, 5);
    setActiveQuotes(selectedQuotes);
    setCurrentQuoteIdx(0);
    setInput("");
    setScore(0);
    setTimeLeft(getTimerDuration(currentDiff));
    setGameOver(false);
    setRoundStats([]);
    setResultMessage("");

    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  // Initialize round on mount or difficulty change (when starting fresh)
  useEffect(() => {
    startNewRound(difficulty);
  }, []);

  // Timer logic for current quote
  useEffect(() => {
    if (gameOver || activeQuotes.length === 0) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Time ran out for the current quote
      handleQuoteComplete(false);
    }
  }, [timeLeft, gameOver, currentQuoteIdx, activeQuotes]);

  // Handle typing input verification
  const checkTyping = (e) => {
    const val = e.target.value;
    setInput(val);
    const targetQuote = activeQuotes[currentQuoteIdx];

    if (val === targetQuote) {
      handleQuoteComplete(true);
    }
  };

  // Move to next quote or end the round
  const handleQuoteComplete = (isCorrect) => {
    const targetQuote = activeQuotes[currentQuoteIdx];
    const newStats = [...roundStats, { quote: targetQuote, correct: isCorrect }];
    setRoundStats(newStats);

    let nextScore = score;
    if (isCorrect) {
      nextScore += 1;
      setScore(nextScore);
    }

    if (currentQuoteIdx < 4) {
      setCurrentQuoteIdx(currentQuoteIdx + 1);
      setInput("");
      setTimeLeft(getTimerDuration(difficulty));
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      // Round Concluded (5th quote finished)
      setGameOver(true);
      determineNextDifficulty(nextScore);
    }
  };

  // Determine transition of difficulty
  const determineNextDifficulty = (finalScore) => {
    let nextDiff = difficulty;
    let promoMessage = "";

    if (difficulty === "easy") {
      if (finalScore >= 4) {
        nextDiff = "medium";
        promoMessage = "🎉 PROMOTED! You crushed the Easy level. Next stop: MEDIUM!";
      } else {
        nextDiff = "easy";
        promoMessage = "❌ FAILED! You need at least 4/5 correct. Try again on EASY!";
      }
    } else if (difficulty === "medium") {
      if (finalScore >= 4) {
        nextDiff = "hard";
        promoMessage = "🔥 PROMOTED! Incredible pace! Welcome to the HARD level!";
      } else {
        nextDiff = "easy";
        promoMessage = "📉 DEMOTED! Speed fell short. Returning to EASY level.";
      }
    } else if (difficulty === "hard") {
      if (finalScore >= 4) {
        nextDiff = "hard";
        promoMessage = "👑 VICTORY! You defended your HARD title! Elite typing speed!";
      } else {
        nextDiff = "medium";
        promoMessage = "📉 DEMOTED! Hard mode is tough! Moving to MEDIUM level.";
      }
    }

    setDifficulty(nextDiff);
    localStorage.setItem("typing_difficulty", nextDiff);
    setResultMessage(promoMessage);
  };

  // Colors for styling the difficulty badge
  const getDifficultyColor = (diff) => {
    if (diff === "hard") return "#ff003c";
    if (diff === "medium") return "#ff8800";
    return "#00cc66";
  };

  // Calculate timer color based on time remaining
  const getTimerColor = () => {
    const maxTime = getTimerDuration(difficulty);
    if (timeLeft > maxTime * 0.5) return "var(--color-success)";
    if (timeLeft > maxTime * 0.2) return "var(--gold-primary)";
    return "var(--color-error)";
  };

  // Real-time character highlighting
  const renderHighlightedDialogue = () => {
    const currentQuote = activeQuotes[currentQuoteIdx] || "";
    return currentQuote.split("").map((char, index) => {
      let color = "var(--text-muted)";
      let textDecoration = "none";
      if (index < input.length) {
        if (input[index] === char) {
          color = "var(--color-success)"; // Green for correct
        } else {
          color = "var(--color-error)"; // Red for wrong
          textDecoration = "underline";
        }
      }
      return (
        <span key={index} style={{ color, textDecoration, transition: "color 0.1s" }}>
          {char}
        </span>
      );
    });
  };

  const resetGame = () => {
    startNewRound(difficulty);
  };

  const changeDifficultyManually = (newDiff) => {
    setDifficulty(newDiff);
    localStorage.setItem("typing_difficulty", newDiff);
    startNewRound(newDiff);
  };

  const currentQuoteDuration = getTimerDuration(difficulty);

  if (activeQuotes.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ color: "#ff007f", fontSize: "1.2rem" }}>Preparing Theater 3 typewriter reels...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", padding: "30px 20px" }}>
      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "800px", margin: "0 auto", width: "100%", marginBottom: "30px" }}>
        <button 
          className="btn-secondary" 
          onClick={() => navigate("/dashboard")}
          style={{ padding: "8px 16px", fontSize: "0.9rem" }}
        >
          ⬅️ Leave Game
        </button>
        <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ff007f" }}>
          ⚡ Kollywood Typewriter (Theater 3)
        </div>
        <div style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
          Level: <span style={{ color: getDifficultyColor(difficulty), fontWeight: "800", textTransform: "uppercase" }}>{difficulty}</span>
        </div>
      </div>

      <div className="animate-fade-in" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        {!gameOver ? (
          <div className="glass-container" style={{ width: "100%", maxWidth: "650px", padding: "35px", textAlign: "center" }}>
            
            {/* Visual Round & Time Indicator */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", fontSize: "0.9rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Phrase {currentQuoteIdx + 1} of 5</span>
              <span style={{ fontWeight: "700", color: getTimerColor(), transition: "color 0.5s" }}>{timeLeft}s Remaining</span>
            </div>
            
            {/* Countdown bar */}
            <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden", marginBottom: "25px" }}>
              <div 
                style={{ 
                  width: `${(timeLeft / currentQuoteDuration) * 100}%`, 
                  height: "100%", 
                  backgroundColor: getTimerColor(), 
                  transition: "width 1s linear, background-color 0.5s ease" 
                }} 
              />
            </div>

            {/* Overall Round Progress dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "25px" }}>
              {[0, 1, 2, 3, 4].map((idx) => {
                let dotBg = "rgba(255, 255, 255, 0.1)";
                let dotBorder = "1px solid rgba(255, 255, 255, 0.2)";
                
                if (idx < currentQuoteIdx) {
                  const isCorrect = roundStats[idx]?.correct;
                  dotBg = isCorrect ? "var(--color-success)" : "var(--color-error)";
                  dotBorder = "none";
                } else if (idx === currentQuoteIdx) {
                  dotBg = "#ff007f";
                  dotBorder = "1px solid #ff007f";
                }
                
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      width: "12px", 
                      height: "12px", 
                      borderRadius: "50%", 
                      background: dotBg, 
                      border: dotBorder,
                      transition: "all 0.3s ease" 
                    }} 
                  />
                );
              })}
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "15px" }}>
              Type this Kollywood Quote:
            </p>
            
            {/* Highlight Box */}
            <div className="typewriter-text" style={{ minHeight: "100px", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", fontSize: "1.4rem", fontWeight: "700", marginBottom: "35px", lineHeight: "1.6" }}>
              {renderHighlightedDialogue()}
            </div>

            {/* Input field with validation glows */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={checkTyping}
              autoFocus
              placeholder="Type matching characters exactly..."
              className="input-field"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "1.1rem",
                textAlign: "center",
                borderWidth: "2px",
                borderColor: input.length > 0 && activeQuotes[currentQuoteIdx]?.startsWith(input) ? "var(--color-success)" : input.length > 0 ? "var(--color-error)" : "var(--glass-border)",
                boxShadow: input.length > 0 && activeQuotes[currentQuoteIdx]?.startsWith(input) ? "0 0 15px var(--color-success-glow)" : input.length > 0 ? "0 0 15px var(--color-error-glow)" : "none"
              }}
            />
            
            <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Tip: Case, spelling, punctuation, and spaces must match exactly!
            </p>
          </div>
        ) : (
          /* Custom Game Over Screen with Stats */
          <div className="glass-container animate-slide-up" style={{ width: "100%", maxWidth: "580px", textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "10px" }}>⚡</div>
            <h2 style={{ fontSize: "2.2rem", color: score >= 4 ? "var(--color-success)" : "var(--color-error)", marginBottom: "5px" }}>
              {score >= 4 ? "Round Clear!" : "Round Failed"}
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              You played on <span style={{ color: getDifficultyColor(difficulty), fontWeight: "bold", textTransform: "uppercase" }}>{difficulty}</span> difficulty.
            </p>

            {/* Promotion/Demotion Message Banner */}
            <div 
              style={{ 
                background: score >= 4 ? "rgba(0, 204, 102, 0.08)" : "rgba(255, 0, 60, 0.08)", 
                border: `1.5px solid ${score >= 4 ? "var(--color-success)" : "var(--color-error)"}`, 
                borderRadius: "14px", 
                padding: "15px", 
                marginBottom: "25px",
                fontWeight: "600",
                fontSize: "0.95rem",
                color: score >= 4 ? "var(--color-success)" : "#ff3366"
              }}
            >
              {resultMessage}
            </div>

            {/* Scorecard */}
            <div style={{ background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "18px", border: "1px solid var(--glass-border)", marginBottom: "25px" }}>
              <div style={{ fontSize: "0.9rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1.5px", marginBottom: "5px" }}>Success Rate</div>
              <div style={{ fontSize: "2.8rem", fontWeight: "800", color: "#ffffff", marginBottom: "15px" }}>
                {score} <span style={{ fontSize: "1.3rem", color: "var(--text-muted)", fontWeight: "400" }}>/ 5 Correct</span>
              </div>

              {/* Individual Quote breakdown */}
              <div style={{ textAlign: "left", fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontWeight: "700", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "5px", color: "var(--text-muted)" }}>Quotes Breakdown:</div>
                {roundStats.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#ffffff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>
                      {idx + 1}. "{item.quote}"
                    </span>
                    <span style={{ color: item.correct ? "var(--color-success)" : "var(--color-error)", fontWeight: "bold" }}>
                      {item.correct ? "✓ Typed" : "✗ Missed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={resetGame} className="btn-primary" style={{ flex: 1, background: "linear-gradient(135deg, #ff007f 0%, #ff8800 100%)", boxShadow: "0 4px 15px rgba(255, 0, 127, 0.3)", color: "#ffffff" }}>
                  🎮 Play Next Game
                </button>
                <button onClick={() => navigate("/dashboard")} className="btn-secondary" style={{ flex: 1, borderRadius: "30px" }}>
                  🏠 Dashboard
                </button>
              </div>

              {/* Reset difficulty manually selector */}
              <div style={{ marginTop: "15px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "15px" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginRight: "10px" }}>Force difficulty reset:</span>
                <div style={{ display: "inline-flex", gap: "5px" }}>
                  {["easy", "medium", "hard"].map((diff) => (
                    <button 
                      key={diff}
                      onClick={() => changeDifficultyManually(diff)}
                      style={{
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                        borderRadius: "6px",
                        border: "1px solid var(--glass-border)",
                        background: difficulty === diff ? getDifficultyColor(diff) : "transparent",
                        color: difficulty === diff ? "#000000" : "var(--text-muted)",
                        fontWeight: "600",
                        cursor: "pointer",
                        textTransform: "uppercase"
                      }}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieTyping;
