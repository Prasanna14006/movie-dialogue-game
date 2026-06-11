import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();

  // Movie dialogues (Hollywood, Kollywood, Tollywood, Bollywood, Mollywood)
  const questions = [
    // Hollywood (30 dialogues)
    { dialogue: "I'm going to make him an offer he can't refuse.", options: ["The Godfather", "Scarface", "Goodfellas", "Casino"], answer: "The Godfather" },
    { dialogue: "May the Force be with you.", options: ["Star Wars", "Star Trek", "Avatar", "The Matrix"], answer: "Star Wars" },
    { dialogue: "Why so serious?", options: ["The Dark Knight", "Joker", "Spider-Man", "Iron Man"], answer: "The Dark Knight" },
    { dialogue: "I'm the king of the world!", options: ["Titanic", "Avatar", "Gladiator", "Inception"], answer: "Titanic" },
    { dialogue: "There's no place like home.", options: ["The Wizard of Oz", "Casablanca", "Gone with the Wind", "Citizen Kane"], answer: "The Wizard of Oz" },
    { dialogue: "Keep your friends close, but your enemies closer.", options: ["The Godfather Part II", "Goodfellas", "The Departed", "Heat"], answer: "The Godfather Part II" },
    { dialogue: "I'll be back.", options: ["The Terminator", "Gladiator", "Titanic", "Avatar"], answer: "The Terminator" },
    { dialogue: "You talking to me?", options: ["Taxi Driver", "Goodfellas", "Raging Bull", "The Godfather"], answer: "Taxi Driver" },
    { dialogue: "My precious.", options: ["The Lord of the Rings: The Two Towers", "Harry Potter", "The Hobbit", "Narnia"], answer: "The Lord of the Rings: The Two Towers" },
    { dialogue: "Show me the money!", options: ["Jerry Maguire", "Wall Street", "The Wolf of Wall Street", "Goodfellas"], answer: "Jerry Maguire" },
    { dialogue: "Here's looking at you, kid.", options: ["Casablanca", "Citizen Kane", "Gone with the Wind", "Psycho"], answer: "Casablanca" },
    { dialogue: "Houston, we have a problem.", options: ["Apollo 13", "Interstellar", "Gravity", "The Martian"], answer: "Apollo 13" },
    { dialogue: "E.T. phone home.", options: ["E.T. the Extra-Terrestrial", "Close Encounters", "Star Wars", "Alien"], answer: "E.T. the Extra-Terrestrial" },
    { dialogue: "You can't handle the truth!", options: ["A Few Good Men", "The Departed", "Primal Fear", "Glengarry Glen Ross"], answer: "A Few Good Men" },
    { dialogue: "With great power comes great responsibility.", options: ["Spider-Man", "Iron Man", "The Dark Knight", "Man of Steel"], answer: "Spider-Man" },
    { dialogue: "Bond. James Bond.", options: ["Dr. No", "Goldfinger", "Skyfall", "Casino Royale"], answer: "Dr. No" },
    { dialogue: "I feel the need - the need for speed!", options: ["Top Gun", "Days of Thunder", "Speed", "Fast & Furious"], answer: "Top Gun" },
    { dialogue: "Here's Johnny!", options: ["The Shining", "Psycho", "A Nightmare on Elm Street", "Halloween"], answer: "The Shining" },
    { dialogue: "Hasta la vista, baby.", options: ["Terminator 2: Judgment Day", "The Terminator", "Predator", "Total Recall"], answer: "Terminator 2: Judgment Day" },
    { dialogue: "There is no spoon.", options: ["The Matrix", "Inception", "Dark City", "The Thirteenth Floor"], answer: "The Matrix" },
    { dialogue: "Keep your eyes open, soft ground ahead.", options: ["Inception", "Interstellar", "Shutter Island", "The Prestige"], answer: "Inception" },
    { dialogue: "Keep running!", options: ["Forrest Gump", "Cast Away", "Saving Private Ryan", "Philadelphia"], answer: "Forrest Gump" },
    { dialogue: "Life finds a way.", options: ["Jurassic Park", "The Lost World", "Avatar", "King Kong"], answer: "Jurassic Park" },
    { dialogue: "You shall not pass!", options: ["The Lord of the Rings: The Fellowship of the Ring", "The Hobbit", "Narnia", "Harry Potter"], answer: "The Lord of the Rings: The Fellowship of the Ring" },
    { dialogue: "Why do we fall? So that we can learn to pick ourselves up.", options: ["Batman Begins", "The Dark Knight", "The Dark Knight Rises", "Man of Steel"], answer: "Batman Begins" },
    { dialogue: "I am Iron Man.", options: ["Avengers: Endgame", "Iron Man", "Iron Man 3", "Avengers: Infinity War"], answer: "Avengers: Endgame" },
    { dialogue: "To infinity and beyond!", options: ["Toy Story", "Buzz Lightyear", "Wall-E", "Monsters, Inc."], answer: "Toy Story" },
    { dialogue: "You either die a hero or you live long enough to see yourself become the villain.", options: ["The Dark Knight", "Batman Begins", "Spider-Man 2", "Watchmen"], answer: "The Dark Knight" },
    { dialogue: "If you build it, he will come.", options: ["Field of Dreams", "Bull Durham", "The Natural", "For Love of the Game"], answer: "Field of Dreams" },
    { dialogue: "May the odds be ever in your favor.", options: ["The Hunger Games", "Divergent", "The Maze Runner", "Battle Royale"], answer: "The Hunger Games" },

    // Kollywood (30 dialogues)
    { dialogue: "Naan oru thadava sonna, nooru thadava sonna madhiri!", options: ["Baashha", "Annamalai", "Sivaji", "Padayappa"], answer: "Baashha" },
    { dialogue: "Singam single-ah dhaan varum!", options: ["Sivaji", "Muthu", "Padayappa", "Baba"], answer: "Sivaji" },
    { dialogue: "Kabali da!", options: ["Kabali", "Kaala", "Petta", "Darbar"], answer: "Kabali" },
    { dialogue: "Who is the black sheep? Two points!", options: ["Enthiran", "2.0", "Sivaji", "Anniyan"], answer: "Enthiran" },
    { dialogue: "Thillu Mullu pannadha da!", options: ["Thillu Mullu", "Billa", "Apoorva Raagangal", "Soodhu Kavvum"], answer: "Thillu Mullu" },
    { dialogue: "Vera level... Vera level!", options: ["Master", "Theri", "Mersal", "Bigil"], answer: "Master" },
    { dialogue: "En vazhi, thani vazhi!", options: ["Padayappa", "Annamalai", "Sivaji", "Baba"], answer: "Padayappa" },
    { dialogue: "Naan veezhven endru ninaithayo?", options: ["Bharathi", "Mahanadhi", "Kala", "Sivaji"], answer: "Bharathi" },
    { dialogue: "Idhu eppadi irukku?", options: ["16 Vayathinile", "Baashha", "Muthu", "Sivaji"], answer: "16 Vayathinile" },
    { dialogue: "Amma, naan unga pulla illa da, naan oru rowdy da!", options: ["Naanum Rowdy Dhaan", "Maari", "Soodhu Kavvum", "VIP"], answer: "Naanum Rowdy Dhaan" },
    { dialogue: "Ithu enna piraviyo... ennodu ponal theriya pogudhu!", options: ["Vikram", "Kaithi", "Leo", "Master"], answer: "Vikram" },
    { dialogue: "Oru dharavi rowdy ah kootitu vaa nu sonna, nee oru periya rowdy ah kootitu vandhruka!", options: ["Soodhu Kavvum", "Mankatha", "Panchatanthiram", "Chennai 28"], answer: "Soodhu Kavvum" },
    { dialogue: "Unaku adhu venum nu thonichu na, adha nee dhaan thedi ponom!", options: ["Kaakha Kaakha", "Vettaiyaadu Vilaiyaadu", "Ghajini", "Thuppakki"], answer: "Kaakha Kaakha" },
    { dialogue: "Aalavandhan... ulagathileye bayangaramana aal dhaan!", options: ["Aalavandhan", "Anniyan", "Indian", "Vikram"], answer: "Aalavandhan" },
    { dialogue: "Enga thalaivan eppodhume king dhaan!", options: ["Jailer", "Petta", "Kabali", "Darbar"], answer: "Jailer" },
    { dialogue: "Vada Chennai-la indha madhiri rowdy-ah paathadhe illa da!", options: ["Vada Chennai", "Asuran", "Polladhavan", "Pudhupettai"], answer: "Vada Chennai" },
    { dialogue: "Naan dhaan da Ghajini!", options: ["Ghajini", "7aum Arivu", "Ayan", "Singam"], answer: "Ghajini" },
    { dialogue: "Anniyan vandha, unnala onnum panna mudiyadhu da!", options: ["Anniyan", "Indian", "Enthiran", "Sivaji"], answer: "Anniyan" },
    { dialogue: "Neenga nallavara kettavara?", options: ["Nayakan", "Thalapathi", "Gunaa", "Indian"], answer: "Nayakan" },
    { dialogue: "En vazhi eppodhume sandhoshamaana vazhi dhaan!", options: ["Leo", "Master", "Theri", "Mersal"], answer: "Leo" },
    { dialogue: "Idhu thaan da real fight!", options: ["Thuppakki", "Kaththi", "Sarkar", "Ghajini"], answer: "Thuppakki" },
    { dialogue: "Ennoda bullet unna absolute-ah thookum!", options: ["Mankatha", "Billa", "Aaranya Kaandam", "Soodhu Kavvum"], answer: "Mankatha" },
    { dialogue: "Kanna, laddu thinna aasaiya?", options: ["Kanna Laddu Thinna Aasaiya", "Boss Engira Bhaskaran", "Oru Kal Oru Kannadi", "Siva Manasula Sakthi"], answer: "Kanna Laddu Thinna Aasaiya" },
    { dialogue: "Poda poda, nee enna rowdy ah!", options: ["Maari", "Velaiilla Pattadhari", "Naanum Rowdy Dhaan", "Vada Chennai"], answer: "Maari" },
    { dialogue: "Neenga appadye shock aayitingala!", options: ["Sivaji", "Muthu", "Padayappa", "Baba"], answer: "Sivaji" },
    { dialogue: "Indha thookkam dhaan unakku kadaisi thookkam!", options: ["Jailer", "Petta", "Jawan", "Master"], answer: "Jailer" },
    { dialogue: "Idhu thaan en Vazhi, Thani Vazhi!", options: ["Padayappa", "Sivaji", "Baba", "Annamalai"], answer: "Padayappa" },
    { dialogue: "Naan thottaa current pass aagum da!", options: ["Pokkiri", "Thuppakki", "Gilli", "Theri"], answer: "Pokkiri" },
    { dialogue: "Un mugathil oru bayam iruku paathiya?", options: ["Vettaiyaadu Vilaiyaadu", "Kaakha Kaakha", "Vikram Vedha", "Anniyan"], answer: "Vettaiyaadu Vilaiyaadu" },
    { dialogue: "Mangaatha da, otta bottle-la mudipen!", options: ["Mankatha", "Billa", "Soodhu Kavvum", "Aaranya Kaandam"], answer: "Mankatha" },

    // Tamil-Dubbed Telugu (15 dialogues)
    { dialogue: "Nenu okka saari commit aithe na maata nene vinanu!", options: ["Pokiri", "Businessman", "Athadu", "Dookudu"], answer: "Pokiri" },
    { dialogue: "Ekkada neggalo kaadu, ekkada thaggalo telisinodu goppodu!", options: ["Attarintiki Daredi", "Julayi", "S/O Satyamurthy", "Ala Vaikunthapurramuloo"], answer: "Attarintiki Daredi" },
    { dialogue: "Devudu chesina manushulu ra meeru!", options: ["Manmadhudu", "Jalsa", "Gabbar Singh", "Atharintiki Daaredi"], answer: "Manmadhudu" },
    { dialogue: "Okkadu kooda chavakoodadhu!", options: ["Baahubali: The Beginning", "RRR", "Magadheera", "Eega"], answer: "Baahubali: The Beginning" },
    { dialogue: "Dhookudu ante ela untadho chupistha!", options: ["Dookudu", "Srimanthudu", "Bharat Ane Nenu", "Sarileru Neekevvaru"], answer: "Dookudu" },
    { dialogue: "Gurtunda ledha? Nenu Pushpa!", options: ["Pushpa: The Rise", "Pushpa 2: The Rule", "Rangasthalam", "Arya"], answer: "Pushpa: The Rise" },
    { dialogue: "Mahishmathi samrajyathil yavarum en solai ketka vendum!", options: ["Baahubali 2: The Conclusion", "Baahubali: The Beginning", "Magadheera", "Arundhati"], answer: "Baahubali 2: The Conclusion" },
    { dialogue: "Indha janmathil nee ennode thunai dhaan!", options: ["Magadheera", "Baahubali", "Arundhati", "Eega"], answer: "Magadheera" },
    { dialogue: "Raju bhai eppodhum single ah dhaan varuvan!", options: ["Businessman", "Pokiri", "Athadu", "Julayi"], answer: "Businessman" },
    { dialogue: "Oru murai mudivu panna en pechane ketka maaten!", options: ["Pokiri", "Dookudu", "Businessman", "Athadu"], answer: "Pokiri" },
    { dialogue: "Nee yaar nu theriyaadhu, aana un thiramai enaku pudichiruku!", options: ["Athadu", "Manmadhudu", "Pokiri", "Businessman"], answer: "Athadu" },
    { dialogue: "Indha samrajyathil yavarum en soldhro thaan ketkanum!", options: ["Baahubali 2: The Conclusion", "Baahubali: The Beginning", "Magadheera", "Arundhati"], answer: "Baahubali 2: The Conclusion" },
    { dialogue: "Pushparaj... naadhe dhaan da ellam!", options: ["Pushpa: The Rise", "Pushpa 2: The Rule", "Rangasthalam", "Ala Vaikunthapurramuloo"], answer: "Pushpa: The Rise" },
    { dialogue: "RRR mass dhaan da!", options: ["RRR", "Baahubali", "Magadheera", "Pushpa"], answer: "RRR" },
    { dialogue: "Arundhati... indha kottai ennodhu!", options: ["Arundhati", "Magadheera", "Bhaagamathie", "Rudramadevi"], answer: "Arundhati" },

    // Tamil-Dubbed Malayalam (15 dialogues)
    { dialogue: "Ormayundo ee mukham?", options: ["The Commissioner", "The King", "Lelam", "Pathram"], answer: "The Commissioner" },
    { dialogue: "Po mone dinesha!", options: ["Narasimham", "Ravanaprabhu", "Aaraam Thampuran", "Devasuram"], answer: "Narasimham" },
    { dialogue: "Sense venam, sensitivity venam, sensibility venam!", options: ["The King", "The Commissioner", "Commissioner 2", "Ekalavyan"], answer: "The King" },
    { dialogue: "Chathiyan Chandu, Alleda?", options: ["Oru Vadakkan Veeragatha", "Pazhassi Raja", "Vadakkan", "Mamangam"], answer: "Oru Vadakkan Veeragatha" },
    { dialogue: "Nee po mone shaji!", options: ["Kalyanaraman", "Pulimurugan", "Lucifer", "Drishyam"], answer: "Kalyanaraman" },
    { dialogue: "Dasanum Vijayanum koode undel pinne kuzhapamilla!", options: ["Nadodikkattu", "Pattanapravesham", "Akkare Akkare Akkare", "Ramji Rao Speaking"], answer: "Nadodikkattu" },
    { dialogue: "Ennodu ponal theriya pogudhu, naane George!", options: ["Premam", "Bangalore Days", "Charlie", "Ustad Hotel"], answer: "Premam" },
    { dialogue: "Lucifer en peyar kettal bayam varum!", options: ["Lucifer", "Pulimurugan", "Drishyam", "Narasimham"], answer: "Lucifer" },
    { dialogue: "Indha Drishyam unna absolute-ah thookum!", options: ["Drishyam", "Drishyam 2", "Lucifer", "Oppam"], answer: "Drishyam" },
    { dialogue: "Dasanum Vijayanum enna panni vechrukanunga paathiya?", options: ["Nadodikkattu", "Pattanapravesham", "Akkare Akkare Akkare", "In Harihar Nagar"], answer: "Nadodikkattu" },
    { dialogue: "Manjummel Boys eppodhume mass dhaan!", options: ["Manjummel Boys", "Romancham", "2018", "Bramayugam"], answer: "Manjummel Boys" },
    { dialogue: "Premalu unna kollum da!", options: ["Premalu", "Hridayam", "Premam", "Super Sharanya"], answer: "Premalu" },
    { dialogue: "Bangalore Days en vazhkaiyai maathirichi!", options: ["Bangalore Days", "Premam", "Ustad Hotel", "Charlie"], answer: "Bangalore Days" },
    { dialogue: "Po mone shaji, unna pinni edupeen!", options: ["Kalyanaraman", "Narasimham", "Pulimurugan", "Lucifer"], answer: "Kalyanaraman" },
    { dialogue: "Ormayundo ee mukham? Naan dhaan da Commissioner!", options: ["The Commissioner", "The King", "Lelam", "Ekalavyan"], answer: "The Commissioner" },

    // Tamil-Dubbed Kannada (10 dialogues)
    { dialogue: "Adichi adichi dhaan enna rowdy aakinanga. Ippo naan enna panuven nu enake theriyaadhu!", options: ["KGF Chapter 1", "KGF Chapter 2", "Kantara", "Vikrant Rona"], answer: "KGF Chapter 1" },
    { dialogue: "Ulagame bayappadum oru peyar: Rocky!", options: ["KGF Chapter 2", "KGF Chapter 1", "Kantara", "James"], answer: "KGF Chapter 2" },
    { dialogue: "Inge ellaam en peyarai kettal nadungum!", options: ["Kantara", "KGF", "Vikrant Rona", "Charlie 777"], answer: "Kantara" },
    { dialogue: "Naan yaar nu kaatta vendiya neram vandhutu!", options: ["Vikrant Rona", "KGF Chapter 2", "Kantara", "James"], answer: "Vikrant Rona" },
    { dialogue: "Nee oru nalla thozhan da Charlie!", options: ["777 Charlie", "Kantara", "KGF", "Vikrant Rona"], answer: "777 Charlie" },
    { dialogue: "Unnoda vazhiyil nee dhaan mass!", options: ["James", "KGF Chapter 2", "Kantara", "Vikrant Rona"], answer: "James" },
    { dialogue: "Rocky Bhai peyar kettale ulagam nadungum!", options: ["KGF Chapter 2", "KGF Chapter 1", "Kantara", "James"], answer: "KGF Chapter 2" },
    { dialogue: "Indha kaatil en peyar Kantara!", options: ["Kantara", "KGF Chapter 2", "Vikrant Rona", "Charlie 777"], answer: "Kantara" },
    { dialogue: "Naan yaar nu kaatta vendiya neram vandhutu!", options: ["Vikrant Rona", "KGF Chapter 1", "James", "Kantara"], answer: "Vikrant Rona" },
    { dialogue: "Charlie, nee en thozhan da!", options: ["777 Charlie", "Kantara", "KGF Chapter 2", "Vikrant Rona"], answer: "777 Charlie" }
  ];

  const [activeQuestions, setActiveQuestions] = useState([]);
  const [usherTip, setUsherTip] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const funnyQuotes = [
    "🍿 Usher Tip: If you guess wrong, we replace your butter popcorn with salted cardboard!",
    "🤐 Silence is Gold: Please silence your phones. Anyone caught talking will be forced to watch 24 hours of bad sequels.",
    "🏆 Projectionist Warning: The guy in the booth is taking a nap. You only have 7 questions to wake him up!",
    "🥤 Sticky Floors: Watch your step! Our floors are 40% soda, 30% popcorn, and 30% pure regret.",
    "👀 Cinema Legend: If you get 7/7, you win the legendary golden popcorn bowl. If you get 0/7, you clean the screen!",
    "🎭 Actor Gossip: Rumor has it the actors in these movies are judging your answers in real-time."
  ];

  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const prepareActiveQuestions = () => {
    const shuffled = shuffleArray(questions);
    const selectedQs = shuffled.slice(0, 7);
    const preparedQs = selectedQs.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setActiveQuestions(preparedQs);
    setUsherTip(funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)]);
  };

  useEffect(() => {
    prepareActiveQuestions();
  }, []);

  const checkAnswer = (option) => {
    setSelected(option);
    setShowAnswer(true);
    if (option === activeQuestions[currentQ].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected("");
    setShowAnswer(false);
    if (currentQ < activeQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected("");
    setShowAnswer(false);
    setGameOver(false);
    prepareActiveQuestions();
  };

  // Rank calculation based on score
  const getRank = (score, total) => {
    const ratio = score / total;
    if (ratio >= 0.9) return { title: "🏆 Grandmaster Cinephile", desc: "Wow! You eat, sleep, and breathe movies! Absolutely legendary." };
    if (ratio >= 0.6) return { title: "🍿 Film Buff", desc: "Impressive movie recall! You know your dialogues." };
    if (ratio >= 0.35) return { title: "🎟️ Ticket Collector", desc: "A good effort! You watch movies but need to pay more attention to dialogues." };
    return { title: "📹 Couch Potato", desc: "Looks like you were asleep during the movie! Time to binge-watch some films." };
  };

  const rank = activeQuestions.length > 0 ? getRank(score, activeQuestions.length) : { title: "", desc: "" };
  const progressPercentage = activeQuestions.length > 0 ? ((currentQ) / activeQuestions.length) * 100 : 0;

  if (activeQuestions.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ color: "var(--gold-primary)", fontSize: "1.2rem" }}>Preparing Theater 1 reels...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", padding: "30px 20px" }}>
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "800px", margin: "0 auto", width: "100%", marginBottom: "30px" }}>
        <button 
          className="btn-secondary" 
          onClick={() => navigate("/dashboard")}
          style={{ padding: "8px 16px", fontSize: "0.9rem" }}
        >
          ⬅️ Leave Game
        </button>
        <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--gold-primary)" }}>
          🎬 Dialogue Challenge (Theater 1)
        </div>
        <div style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
          Score: <span style={{ color: "#ffffff", fontWeight: "700" }}>{score}</span>
        </div>
      </div>

      <div className="animate-fade-in" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
        
        {/* Funny Usher Tip */}
        {!gameOver && (
          <div 
            style={{ 
              background: "rgba(255, 184, 0, 0.08)", 
              border: "1px dashed var(--gold-primary)", 
              borderRadius: "12px", 
              padding: "12px 20px", 
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "var(--gold-primary)",
              width: "100%",
              maxWidth: "650px"
            }}
          >
            {usherTip}
          </div>
        )}

        {!gameOver ? (
          <div className="glass-container" style={{ width: "100%", maxWidth: "650px", position: "relative", padding: "35px" }}>
            
            {/* Visual Progress Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <span>Dialogue {currentQ + 1} of {activeQuestions.length}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden", marginBottom: "30px" }}>
              <div 
                style={{ 
                  width: `${progressPercentage}%`, 
                  height: "100%", 
                  background: "linear-gradient(90deg, var(--gold-primary), #ff8800)", 
                  transition: "width 0.4s ease-out" 
                }} 
              />
            </div>

            {/* Quote display */}
            <div 
              style={{ 
                position: "relative",
                background: "rgba(0,0,0,0.25)", 
                borderLeft: "5px solid var(--gold-primary)", 
                borderRadius: "12px", 
                padding: "25px 30px", 
                marginBottom: "35px",
                boxShadow: "inset 0 4px 10px rgba(0,0,0,0.3)"
              }}
            >
              <span style={{ position: "absolute", top: "-10px", left: "15px", fontSize: "4rem", color: "rgba(255,184,0,0.1)", fontStyle: "italic", userSelect: "none" }}>“</span>
              <p style={{ fontSize: "1.6rem", fontWeight: "700", color: "#ffffff", textAlign: "center", textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}>
                {activeQuestions[currentQ].dialogue}
              </p>
            </div>

            {/* Answer option buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "30px" }}>
              {activeQuestions[currentQ].options.map((option, index) => {
                let btnStyle = {
                  padding: "16px 20px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: "14px",
                  border: "1.5px solid var(--glass-border)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  textAlign: "center",
                  outline: "none"
                };

                if (!showAnswer) {
                  // Default/idle state
                  return (
                    <button
                      key={index}
                      onClick={() => checkAnswer(option)}
                      style={{
                        ...btnStyle,
                        background: "rgba(255,255,255,0.04)",
                        color: "#ffffff",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(255, 184, 0, 0.08)";
                        e.target.style.borderColor = "var(--gold-primary)";
                        e.target.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "rgba(255,255,255,0.04)";
                        e.target.style.borderColor = "var(--glass-border)";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      {option}
                    </button>
                  );
                } else {
                  // Post-answer states
                  const isCorrect = option === activeQuestions[currentQ].answer;
                  const isSelected = option === selected;

                  let background = "rgba(255,255,255,0.02)";
                  let borderColor = "var(--glass-border)";
                  let color = "rgba(255, 255, 255, 0.3)";
                  let shadow = "none";

                  if (isCorrect) {
                    background = "var(--color-success)";
                    borderColor = "var(--color-success)";
                    color = "#000000";
                    shadow = "0 0 15px var(--color-success-glow)";
                  } else if (isSelected) {
                    background = "var(--color-error)";
                    borderColor = "var(--color-error)";
                    color = "#ffffff";
                    shadow = "0 0 15px var(--color-error-glow)";
                  }

                  return (
                    <button
                      key={index}
                      disabled
                      style={{
                        ...btnStyle,
                        background,
                        borderColor,
                        color,
                        boxShadow: shadow,
                        cursor: "default"
                      }}
                    >
                      {option} {isCorrect && "✅"} {isSelected && !isCorrect && "❌"}
                    </button>
                  );
                }
              })}
            </div>

            {/* Next dialogue trigger panel */}
            {showAnswer && (
              <div className="animate-slide-up" style={{ textAlign: "center", marginTop: "20px" }}>
                {selected === activeQuestions[currentQ].answer ? (
                  <p style={{ color: "var(--color-success)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "15px" }}>
                    🎉 Spot On! That is correct.
                  </p>
                ) : (
                  <p style={{ color: "var(--color-error)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "15px" }}>
                    😔 Whoops! The correct answer is: {activeQuestions[currentQ].answer}
                  </p>
                )}
                <button
                  onClick={nextQuestion}
                  className="btn-primary"
                  style={{ minWidth: "200px" }}
                >
                  {currentQ < activeQuestions.length - 1 ? "Next Dialogue ➡️" : "View Final Score 🏆"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Custom Game Over Rank Screen */
          <div className="glass-container animate-slide-up" style={{ width: "100%", maxWidth: "550px", textAlign: "center", padding: "45px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "15px" }}>🎬</div>
            <h2 style={{ fontSize: "2.4rem", color: "var(--gold-primary)", marginBottom: "10px" }}>
              Show Concluded!
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>You've finished the Movie Dialogue challenge.</p>

            <div style={{ background: "rgba(0,0,0,0.2)", padding: "25px", borderRadius: "18px", border: "1px solid var(--glass-border)", marginBottom: "35px" }}>
              <div style={{ fontSize: "1rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1.5px", marginBottom: "5px" }}>Final Score</div>
              <div style={{ fontSize: "3.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "15px" }}>
                {score} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontWeight: "400" }}>/ {activeQuestions.length}</span>
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--gold-primary)", marginBottom: "5px" }}>
                {rank.title}
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                {rank.desc}
              </p>
            </div>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <button onClick={resetGame} className="btn-primary" style={{ flex: 1 }}>
                🔄 Play Again
              </button>
              <button onClick={() => navigate("/dashboard")} className="btn-secondary" style={{ flex: 1, borderRadius: "30px" }}>
                🏠 Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
