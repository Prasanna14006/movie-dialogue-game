import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MovieQuiz() {
  const navigate = useNavigate();

  const questions = [
    // Hollywood (30 questions)
    { q: "Which movie holds the record for the most Oscar nominations alongside Titanic?", options: ["La La Land", "Avatar", "The Matrix", "Inception"], answer: "La La Land" },
    { q: "Who directed the sci-fi movie 'Interstellar'?", options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"], answer: "Christopher Nolan" },
    { q: "Which actor played Iron Man in the Marvel Cinematic Universe?", options: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"], answer: "Robert Downey Jr." },
    { q: "What is the name of the fictional planet in Avatar?", options: ["Pandora", "Tatooine", "Krypton", "Arrakis"], answer: "Pandora" },
    { q: "Which animated movie features a friendly toy dinosaur named Rex?", options: ["Toy Story", "Jurassic Park", "Ice Age", "Finding Nemo"], answer: "Toy Story" },
    { q: "Who played the character Jack Dawson in the 1997 film Titanic?", options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Tom Cruise"], answer: "Leonardo DiCaprio" },
    { q: "Which movie is about heist operations occurring inside a dream within a dream?", options: ["Inception", "Interstellar", "Memento", "The Prestige"], answer: "Inception" },
    { q: "Who is the main antagonist in the Harry Potter series?", options: ["Lord Voldemort", "Severus Snape", "Draco Malfoy", "Sirius Black"], answer: "Lord Voldemort" },
    { q: "Which movie has the iconic line 'I am your father'?", options: ["Star Wars: The Empire Strikes Back", "Star Trek", "The Matrix", "Lord of the Rings"], answer: "Star Wars: The Empire Strikes Back" },
    { q: "Who directed the thriller movie 'Jaws'?", options: ["Steven Spielberg", "Alfred Hitchcock", "James Cameron", "Martin Scorsese"], answer: "Steven Spielberg" },
    { q: "Which actor played Neo in The Matrix?", options: ["Keanu Reeves", "Laurence Fishburne", "Hugo Weaving", "Brad Pitt"], answer: "Keanu Reeves" },
    { q: "Which movie series features the character Captain Jack Sparrow?", options: ["Pirates of the Caribbean", "Peter Pan", "Treasure Island", "Master and Commander"], answer: "Pirates of the Caribbean" },
    { q: "What is the highest-grossing film of all time (unadjusted for inflation)?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], answer: "Avatar" },
    { q: "Which movie is based on the theme 'Life is like a box of chocolates'?", options: ["Forrest Gump", "The Green Mile", "Cast Away", "Saving Private Ryan"], answer: "Forrest Gump" },
    { q: "Who played the Joker in the 2008 film The Dark Knight?", options: ["Heath Ledger", "Joaquin Phoenix", "Jared Leto", "Jack Nicholson"], answer: "Heath Ledger" },
    { q: "Which movie features a theme park with cloned dinosaurs?", options: ["Jurassic Park", "The Lost World", "King Kong", "Avatar"], answer: "Jurassic Park" },
    { q: "Which horror movie features a character who says 'I see dead people'?", options: ["The Sixth Sense", "The Shining", "Psycho", "The Conjuring"], answer: "The Sixth Sense" },
    { q: "Who directed the award-winning epic movie 'Titanic' (1997)?", options: ["James Cameron", "Steven Spielberg", "Ridley Scott", "Peter Jackson"], answer: "James Cameron" },
    { q: "Which movie features the iconic theme song 'My Heart Will Go On'?", options: ["Titanic", "The Bodyguard", "Gladiator", "Armageddon"], answer: "Titanic" },
    { q: "Which classic sports drama is about a boxer named Rocky Balboa?", options: ["Rocky", "Raging Bull", "Creed", "Million Dollar Baby"], answer: "Rocky" },
    { q: "Which movie won the Oscar for Best Picture in 2020, becoming the first non-English language film to do so?", options: ["Parasite", "Roma", "Minari", "1917"], answer: "Parasite" },
    { q: "Which actor played Wolverine in the X-Men film series?", options: ["Hugh Jackman", "Robert Downey Jr.", "Christian Bale", "Chris Hemsworth"], answer: "Hugh Jackman" },
    { q: "What is the name of the main antagonist in the animated movie 'The Lion King' (1994)?", options: ["Scar", "Mufasa", "Simba", "Jafar"], answer: "Scar" },
    { q: "Who directed the cult classic crime film 'Pulp Fiction'?", options: ["Quentin Tarantino", "Martin Scorsese", "Francis Ford Coppola", "David Fincher"], answer: "Quentin Tarantino" },
    { q: "Which movie features a giant gorilla captured and brought to New York?", options: ["King Kong", "Godzilla", "Jurassic Park", "Planet of the Apes"], answer: "King Kong" },
    { q: "Which superhero is also widely known as the 'Caped Crusader'?", options: ["Batman", "Superman", "Spider-Man", "Iron Man"], answer: "Batman" },
    { q: "Which Marvel superhero is a Norse god wielding a mystical hammer?", options: ["Thor", "Loki", "Odin", "Hulk"], answer: "Thor" },
    { q: "Which movie is about a young wizard attending Hogwarts School of Witchcraft and Wizardry?", options: ["Harry Potter and the Sorcerer's Stone", "The Lord of the Rings", "The Chronicles of Narnia", "Percy Jackson"], answer: "Harry Potter and the Sorcerer's Stone" },
    { q: "Which fantasy movie features a ring that makes its wearer invisible?", options: ["The Lord of the Rings: The Fellowship of the Ring", "Harry Potter", "The Hobbit", "Chronicles of Narnia"], answer: "The Lord of the Rings: The Fellowship of the Ring" },
    { q: "Which actor played the character Ethan Hunt in the Mission: Impossible series?", options: ["Tom Cruise", "Brad Pitt", "Matt Damon", "Keanu Reeves"], answer: "Tom Cruise" },

    // Kollywood (30 questions)
    { q: "Who directed the Tamil movie 'Enthiran'?", options: ["S. Shankar", "Mani Ratnam", "AR Murugadoss", "Atlee"], answer: "S. Shankar" },
    { q: "Which movie has the iconic song 'Why This Kolaveri Di'?", options: ["3", "VIP", "Maari", "Kodi"], answer: "3" },
    { q: "Who composed the music for the action movie 'Vikram' (2022)?", options: ["Anirudh Ravichander", "A. R. Rahman", "Yuvan Shankar Raja", "G. V. Prakash"], answer: "Anirudh Ravichander" },
    { q: "Which actor played the role of 'Chitti' in Enthiran?", options: ["Rajinikanth", "Kamal Haasan", "Vijay", "Ajith Kumar"], answer: "Rajinikanth" },
    { q: "Who directed the cult classic movie 'Nayagan'?", options: ["Mani Ratnam", "K. Balachander", "Bharathiraja", "Shalini"], answer: "Mani Ratnam" },
    { q: "Which actor is commonly referred to as 'Thalapathy' in Tamil Cinema?", options: ["Vijay", "Ajith", "Suriya", "Vikram"], answer: "Vijay" },
    { q: "Which movie features Kamal Haasan in ten different roles?", options: ["Dasavathaaram", "Michael Madana Kama Rajan", "Apoorva Sagodharargal", "Indian"], answer: "Dasavathaaram" },
    { q: "Which was the debut film of actor Rajinikanth?", options: ["Apoorva Raagangal", "Mullum Malarum", "Moondru Mudichu", "16 Vayathinile"], answer: "Apoorva Raagangal" },
    { q: "Who is the director of the action movie 'Leo' (2023)?", options: ["Lokesh Kanagaraj", "Nelson Dilipkumar", "Atlee", "Karthik Subbaraj"], answer: "Lokesh Kanagaraj" },
    { q: "Which movie stars Suriya as an IPS Officer named Anbuselvan?", options: ["Kaakha Kaakha", "Ghajini", "Singam", "Ayan"], answer: "Kaakha Kaakha" },
    { q: "Who composed the soundtrack for the film 'Roja' (1992)?", options: ["A. R. Rahman", "Ilaiyaraaja", "M. S. Viswanathan", "Deva"], answer: "A. R. Rahman" },
    { q: "Which movie features Ajith Kumar as Vinayak Mahadev?", options: ["Mankatha", "Billa", "Vedalam", "Viswasam"], answer: "Mankatha" },
    { q: "Which actor played the lead role in 'Anniyan'?", options: ["Vikram", "Suriya", "Karthi", "Dhanush"], answer: "Vikram" },
    { q: "Who directed the movie 'Jailer' (2023)?", options: ["Nelson Dilipkumar", "Lokesh Kanagaraj", "Karthik Subbaraj", "H. Vinoth"], answer: "Nelson Dilipkumar" },
    { q: "Which movie is centered around a short-term memory loss patient seeking revenge?", options: ["Ghajini", "Anniyan", "Ayan", "7aum Arivu"], answer: "Ghajini" },
    { q: "Which actor is commonly referred to as the 'Superstar' of Tamil Cinema?", options: ["Rajinikanth", "Kamal Haasan", "Vijay", "Ajith Kumar"], answer: "Rajinikanth" },
    { q: "Which movie features Kamal Haasan as a dwarf named Appu?", options: ["Apoorva Sagodharargal", "Dasavathaaram", "Indian", "Avvai Shanmughi"], answer: "Apoorva Sagodharargal" },
    { q: "Who composed the music for the film 'Kadhalan'?", options: ["A. R. Rahman", "Ilaiyaraaja", "Harris Jayaraj", "Yuvan Shankar Raja"], answer: "A. R. Rahman" },
    { q: "Which movie directed by Mani Ratnam is based on the famous Chola dynasty novel?", options: ["Ponniyin Selvan: Part 1", "Iruvar", "Kadal", "Raavan"], answer: "Ponniyin Selvan: Part 1" },
    { q: "Which movie stars Vijay as a police officer named Vijay Kumar?", options: ["Theri", "Mersal", "Sarkar", "Master"], answer: "Theri" },
    { q: "Who directed the blockbuster Tamil sci-fi thriller film '24'?", options: ["Vikram Kumar", "AR Murugadoss", "S. Shankar", "Karthik Subbaraj"], answer: "Vikram Kumar" },
    { q: "Which film stars Kamal Haasan as an honest DCP named Raghavan?", options: ["Vettaiyaadu Vilaiyaadu", "Kaakha Kaakha", "Vikram", "Papanasam"], answer: "Vettaiyaadu Vilaiyaadu" },
    { q: "Who directed the political action drama 'Sarkar' (2018)?", options: ["AR Murugadoss", "Atlee", "Lokesh Kanagaraj", "Nelson Dilipkumar"], answer: "AR Murugadoss" },
    { q: "Which movie stars Ajith Kumar as a dual character (father and son) who is a classical dancer?", options: ["Varalaru", "Citizen", "Billa", "Attahasam"], answer: "Varalaru" },
    { q: "Which movie features Ajith Kumar as a former police officer named Billa?", options: ["Billa", "Mankatha", "Vedalam", "Dheena"], answer: "Billa" },
    { q: "Which movie features Dhanush as a local carrom player named Anbu in North Chennai?", options: ["Vada Chennai", "Asuran", "Maaran", "Polladhavan"], answer: "Vada Chennai" },
    { q: "Who played the role of 'Senaapathy' in the movie 'Indian' (1996)?", options: ["Kamal Haasan", "Rajinikanth", "Sathyaraj", "Nassar"], answer: "Kamal Haasan" },
    { q: "Which thriller movie directed by Lokesh Kanagaraj stars Karthi in the lead role?", options: ["Kaithi", "Vikram", "Leo", "Master"], answer: "Kaithi" },
    { q: "Which Vijay-starrer movie features the song 'Aalaporaan Thamizhan'?", options: ["Mersal", "Sarkar", "Bigil", "Theri"], answer: "Mersal" },
    { q: "Which director is known for the movie 'Vada Chennai'?", options: ["Vetrimaaran", "Lokesh Kanagaraj", "Selvaraghavan", "Mani Ratnam"], answer: "Vetrimaaran" },

    // Tamil-Dubbed Telugu (15 questions)
    { q: "Who directed the epic movie 'Baahubali'?", options: ["S. S. Rajamouli", "Sukumar", "Trivikram Srinivas", "Prashanth Neel"], answer: "S. S. Rajamouli" },
    { q: "Which actor played the character 'Pushpa Raj'?", options: ["Allu Arjun", "Ram Charan", "NTR Jr", "Prabhas"], answer: "Allu Arjun" },
    { q: "Which song from 'RRR' won the Academy Award for Best Original Song?", options: ["Naatu Naatu", "Dosti", "Komuram Bheemudo", "Raamam Raaghavam"], answer: "Naatu Naatu" },
    { q: "Who composed the music for the film 'Pushpa: The Rise'?", options: ["Devi Sri Prasad", "Thaman S", "Anirudh", "M. M. Keeravani"], answer: "Devi Sri Prasad" },
    { q: "Who played the character of 'Bhallaladeva' in Baahubali?", options: ["Rana Daggubati", "Prabhas", "Ram Charan", "Nagarjuna"], answer: "Rana Daggubati" },
    { q: "Which movie stars Nani as a housefly seeking revenge?", options: ["Eega (Naan Ee)", "Jersey", "Shyam Singha Roy", "Dasara"], answer: "Eega (Naan Ee)" },
    { q: "Which historical Telugu film features Ram Charan and Jr NTR together?", options: ["RRR", "Magadheera", "Baahubali", "Eega"], answer: "RRR" },
    { q: "Which movie stars Anushka Shetty in a horror role as a haunted queen?", options: ["Arundhati", "Bhaagamathie", "Rudramadevi", "Devasena"], answer: "Arundhati" },
    { q: "Who directed the Telugu movie 'Pushpa: The Rise'?", options: ["Sukumar", "S. S. Rajamouli", "Trivikram Srinivas", "Koratala Siva"], answer: "Sukumar" },
    { q: "Which Telugu actor played the lead role in the romantic drama 'Arjun Reddy'?", options: ["Vijay Deverakonda", "Nani", "Ram Charan", "Allu Arjun"], answer: "Vijay Deverakonda" },
    { q: "Which movie stars Prabhas as a king named Amarendra Baahubali?", options: ["Baahubali 2: The Conclusion", "Baahubali: The Beginning", "Magadheera", "Arundhati"], answer: "Baahubali 2: The Conclusion" },
    { q: "Who played the female lead character 'Devesena' in Baahubali?", options: ["Anushka Shetty", "Tamannaah Bhatia", "Kajal Aggarwal", "Samantha Ruth Prabhu"], answer: "Anushka Shetty" },
    { q: "Which actor played the role of Alluri Sitarama Raju in RRR?", options: ["Ram Charan", "Jr NTR", "Prabhas", "Allu Arjun"], answer: "Ram Charan" },
    { q: "Which movie features Nani as a cricketer who makes a comeback in his late 30s?", options: ["Jersey", "Eega", "Shyam Singha Roy", "Gang Leader"], answer: "Jersey" },
    { q: "Who composed the background score and music for 'Kalki 2898 AD'?", options: ["Santhosh Narayanan", "M. M. Keeravani", "Anirudh Ravichander", "Devi Sri Prasad"], answer: "Santhosh Narayanan" },

    // Tamil-Dubbed Malayalam (15 questions)
    { q: "Which Malayalam actor played the lead role in 'Lucifer'?", options: ["Mohanlal", "Mammootty", "Dulquer Salmaan", "Fahadh Faasil"], answer: "Mohanlal" },
    { q: "Who directed the romantic drama 'Premam' (2015)?", options: ["Alphonse Puthren", "Anjali Menon", "Amal Neerad", "Vineeth Sreenivasan"], answer: "Alphonse Puthren" },
    { q: "Which Malayalam movie is about a group of friends rescuing their friend from Guna Caves?", options: ["Manjummel Boys", "Romancham", "2018", "Kurup"], answer: "Manjummel Boys" },
    { q: "Which Malayalam actor played the lead in the thriller 'Drishyam'?", options: ["Mohanlal", "Mammootty", "Jayaram", "Suresh Gopi"], answer: "Mohanlal" },
    { q: "Which Malayalam film stars Dulquer Salmaan, Nivin Pauly, and Nazriya Nazim as cousins?", options: ["Bangalore Days", "Premam", "Charlie", "Ustad Hotel"], answer: "Bangalore Days" },
    { q: "Who played the lead role in the Malayalam comedy-drama movie 'Premalu'?", options: ["Naslen K. Gafoor", "Mamitha Baiju", "Mathew Thomas", "Basil Joseph"], answer: "Naslen K. Gafoor" },
    { q: "Which Malayalam survival thriller movie is based on the 2018 Kerala floods?", options: ["2018", "Manjummel Boys", "Malayankunju", "Take Off"], answer: "2018" },
    { q: "Which Malayalam movie stars Prithviraj Sukumaran as a police officer investigating a series of murders?", options: ["Memories", "Cold Case", "Mumbai Police", "Ezra"], answer: "Memories" },
    { q: "Who directed the thriller movie 'Drishyam'?", options: ["Jeethu Joseph", "Alphonse Puthren", "Amal Neerad", "Lijo Jose Pellissery"], answer: "Jeethu Joseph" },
    { q: "Which Malayalam actor played the lead role in the crime thriller 'Kurup'?", options: ["Dulquer Salmaan", "Fahadh Faasil", "Tovino Thomas", "Prithviraj Sukumaran"], answer: "Dulquer Salmaan" },
    { q: "Which Malayalam movie features Fahadh Faasil as a thief named Prasad?", options: ["Thondimuthalum Driksakshiyum", "Maheshinte Prathikaaram", "Joji", "Kumbalangi Nights"], answer: "Thondimuthalum Driksakshiyum" },
    { q: "Who directed the action thriller film 'Pulimurugan'?", options: ["Vysakh", "Amal Neerad", "Priyanandanan", "Rosshan Andrrews"], answer: "Vysakh" },
    { q: "Which Malayalam movie features a protagonist named Kanjirappally Madhavan?", options: ["Lelam", "The King", "Commissioner", "Pathram"], answer: "Lelam" },
    { q: "Which survival drama movie stars Prithviraj Sukumaran stranded in the Saudi desert?", options: ["The Goat Life", "Aadujeevitham", "Kuruthi", "Cold Case"], answer: "The Goat Life" },
    { q: "Which comedy-horror Malayalam film stars Fahadh Faasil in the lead role?", options: ["Romancham", "Bramayugam", "Aavesham", "Trance"], answer: "Romancham" },

    // Tamil-Dubbed Kannada (10 questions)
    { q: "Who directed the Kannada movie 'KGF Chapter 1'?", options: ["Prashanth Neel", "Rishab Shetty", "Pawan Kumar", "Karthik Gowda"], answer: "Prashanth Neel" },
    { q: "Which actor played the character 'Rocky Bhai' in the KGF series?", options: ["Yash", "Rishab Shetty", "Puneeth Rajkumar", "Sudeep"], answer: "Yash" },
    { q: "Who directed and played the lead role in the Kannada film 'Kantara'?", options: ["Rishab Shetty", "Rakshit Shetty", "Raj B. Shetty", "Prashanth Neel"], answer: "Rishab Shetty" },
    { q: "Which Kannada movie stars Sudeep as investigator Vikrant Rona?", options: ["Vikrant Rona", "Kotigobba 3", "Pailwaan", "Kabal"], answer: "Vikrant Rona" },
    { q: "Which emotional Kannada movie features a labrador dog named Charlie?", options: ["777 Charlie", "Kantara", "KGF", "James"], answer: "777 Charlie" },
    { q: "Which movie was the posthumous release of actor Puneeth Rajkumar?", options: ["James", "Yuvarathnaa", "Raajakumara", "Anjani Putra"], answer: "James" },
    { q: "Which actress played the lead role of Leela in the movie Kantara?", options: ["Saptami Gowda", "Rashmika Mandanna", "Srinidhi Shetty", "Rachita Ram"], answer: "Saptami Gowda" },
    { q: "Who composed the music for the blockbuster KGF movies?", options: ["Ravi Basrur", "Ajaneesh Loknath", "Arjun Janya", "Charan Raj"], answer: "Ravi Basrur" },
    { q: "Which movie is the blockbuster sequel to KGF Chapter 1?", options: ["KGF Chapter 2", "Kantara", "Vikrant Rona", "James"], answer: "KGF Chapter 2" },
    { q: "Who played the terrifying antagonist 'Garuda' in KGF Chapter 1?", options: ["Ramachandra Raju", "Sanjay Dutt", "Raveena Tandon", "Sudeep"], answer: "Ramachandra Raju" }
  ];

  const [activeQuestions, setActiveQuestions] = useState([]);
  const [usherTip, setUsherTip] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const funnyQuotes = [
    "🍿 Theater 2 Guide: Please keep your hands off the screen, unless you want to clean it yourself!",
    "🤐 Usher Tip: If you score 0/7, you will be cast as the extra who gets eaten in a monster movie!",
    "👀 Cinema Tip: Our projectionist is using a cheap bulb, so read these questions quickly before it burns out!",
    "🥤 Floor Guide: The stickiness of this floor is directly proportional to how many times someone guessed 'Titanic' incorrectly.",
    "🎟️ Popcorn Warning: Chew quietly! The trivia gods demand complete silence during calculation.",
    "🎭 Ticket Checker says: 'No cheating! We have infrared cameras and we will display your search history on the big screen!'"
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

  // Rank calculation
  const getRank = (score, total) => {
    const ratio = score / total;
    if (ratio >= 0.8) return { title: "🎓 Cinema Professor", desc: "Superb! Your knowledge of Indian cinema is top-notch!" };
    if (ratio >= 0.5) return { title: "🍿 Screen Critic", desc: "Great work! You know your trivia well." };
    return { title: "🎟️ Casual Viewer", desc: "Keep watching! There's so much more to discover about movies." };
  };

  const rank = activeQuestions.length > 0 ? getRank(score, activeQuestions.length) : { title: "", desc: "" };
  const progressPercentage = activeQuestions.length > 0 ? ((currentQ) / activeQuestions.length) * 100 : 0;

  if (activeQuestions.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ color: "#00f2fe", fontSize: "1.2rem" }}>Preparing Theater 2 reels...</p>
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
          ⬅️ Leave Quiz
        </button>
        <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "#00f2fe" }}>
          🧠 Movie Trivia Quiz (Theater 2)
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
              background: "rgba(0, 242, 254, 0.08)", 
              border: "1px dashed #00f2fe", 
              borderRadius: "12px", 
              padding: "12px 20px", 
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#00f2fe",
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
              <span>Question {currentQ + 1} of {activeQuestions.length}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden", marginBottom: "30px" }}>
              <div 
                style={{ 
                  width: `${progressPercentage}%`, 
                  height: "100%", 
                  background: "linear-gradient(90deg, #00f2fe, #4facfe)", 
                  transition: "width 0.4s ease-out" 
                }} 
              />
            </div>

            {/* Question display */}
            <div 
              style={{ 
                background: "rgba(0,0,0,0.25)", 
                borderRadius: "12px", 
                padding: "25px 30px", 
                marginBottom: "35px",
                border: "1px solid var(--glass-border)",
                boxShadow: "inset 0 4px 10px rgba(0,0,0,0.3)"
              }}
            >
              <h2 style={{ fontSize: "1.45rem", fontWeight: "700", color: "#ffffff", textAlign: "center", lineHeight: "1.4" }}>
                {activeQuestions[currentQ].q}
              </h2>
            </div>

            {/* Options selection */}
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
                        e.target.style.background = "rgba(0, 242, 254, 0.08)";
                        e.target.style.borderColor = "#00f2fe";
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

            {/* Answer feedback and progression button */}
            {showAnswer && (
              <div className="animate-slide-up" style={{ textAlign: "center", marginTop: "20px" }}>
                {selected === activeQuestions[currentQ].answer ? (
                  <p style={{ color: "var(--color-success)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "15px" }}>
                    🎉 Correct! You're a natural.
                  </p>
                ) : (
                  <p style={{ color: "var(--color-error)", fontSize: "1.1rem", fontWeight: "bold", marginBottom: "15px" }}>
                    😔 Not quite! The correct answer is: {activeQuestions[currentQ].answer}
                  </p>
                )}
                <button
                  onClick={nextQuestion}
                  className="btn-primary"
                  style={{ minWidth: "200px", background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", boxShadow: "0 4px 15px rgba(0, 242, 254, 0.3)" }}
                >
                  {currentQ < activeQuestions.length - 1 ? "Next Question ➡️" : "View Final Score 🏆"}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Custom Game Over Rank Screen */
          <div className="glass-container animate-slide-up" style={{ width: "100%", maxWidth: "550px", textAlign: "center", padding: "45px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "15px" }}>🧠</div>
            <h2 style={{ fontSize: "2.4rem", color: "#00f2fe", marginBottom: "10px" }}>
              Quiz Finished!
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>You've finished the Movie Trivia Quiz.</p>

            <div style={{ background: "rgba(0,0,0,0.2)", padding: "25px", borderRadius: "18px", border: "1px solid var(--glass-border)", marginBottom: "35px" }}>
              <div style={{ fontSize: "1rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "1.5px", marginBottom: "5px" }}>Final Score</div>
              <div style={{ fontSize: "3.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "15px" }}>
                {score} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontWeight: "400" }}>/ {activeQuestions.length}</span>
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: "700", color: "#00f2fe", marginBottom: "5px" }}>
                {rank.title}
              </div>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                {rank.desc}
              </p>
            </div>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <button onClick={resetGame} className="btn-primary" style={{ flex: 1, background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", boxShadow: "0 4px 15px rgba(0, 242, 254, 0.3)" }}>
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

export default MovieQuiz;
