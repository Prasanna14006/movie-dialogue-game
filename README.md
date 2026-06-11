# 🎬 Movie Game Hub

Welcome to **Movie Game Hub**, a premium, interactive web application designed for cinema enthusiasts and cinephiles of all ages. Test your film knowledge across three distinct interactive movie theaters.

---

## 🌟 Theaters (Games)

### 🎬 Theater 1: Dialogue Challenge (Guessing Game)
* **Goal**: Guess the movie from the iconic dialogue.
* **Database**: Exactly **100 unique dialogue questions** from:
  - **Hollywood** (English classics and blockbusters)
  - **Kollywood** (Tamil hits)
  - **Tamil-Dubbed Hits** (Telugu, Malayalam, Kannada blockbusters)
* **Features**:
  - Plays in rounds of **7 random questions** per session.
  - Options are programmatically shuffled so the correct answer is randomized across the buttons.
  - Screen usher tips at the top offering funny warnings.
  - Final results scorecard showing custom cinephile ranks (e.g., *🏆 Grandmaster Cinephile*, *🍿 Film Buff*).

### 🧠 Theater 2: Movie Trivia Quiz
* **Goal**: Test your trivia knowledge on directors, actors, music composers, and Oscar achievements.
* **Database**: Exactly **100 unique trivia questions** across Hollywood, Kollywood, and Tamil-dubbed South Indian hits.
* **Features**:
  - Plays in rounds of **7 random questions**.
  - Programmatic option shuffling.
  - Dynamic score keeping with cinematic ranking rewards (e.g., *🎓 Cinema Professor*, *🎟️ Casual Viewer*).

### ⚡ Theater 3: Kollywood Typewriter (Speed Typing Test)
* **Goal**: Test your typing speed and accuracy under time pressure.
* **Database**: **45 unique Kollywood dialogues and song lyrics** transliterated in English script.
* **Features**:
  - Plays in sessions of exactly **5 rounds (phrases)**.
  - **Progressive Difficulty State Machine**:
    - **Easy**: 25s limit per quote. Win $\ge$ 4/5 $\rightarrow$ upgrade to **Medium**.
    - **Medium**: 20s limit per quote. Win $\ge$ 4/5 $\rightarrow$ upgrade to **Hard** | Lose $\rightarrow$ demote to **Easy**.
    - **Hard**: 15s limit per quote. Win $\ge$ 4/5 $\rightarrow$ stay on **Hard** | Lose $\rightarrow$ demote to **Medium**.
  - **Real-Time Highlighting**: Correct characters light up in green; incorrect characters turn red and underlined.
  - **Stats & Persistence**: Saves the current level progress in `localStorage` and renders a detailed breakdown of typed vs missed quotes.
  - **Override Panel**: Allows manual difficulty changes for practice.

---

## 🛠️ Technology Stack

* **Frontend**: React.js (v18), React Router (v6), custom Vanilla CSS (Outfit Font, Glassmorphism panels, CSS grid, keyframe micro-animations).
* **Backend**: Node.js, Express, PostgreSQL, Docker Compose.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org) (v16+)

### Run Frontend Locally
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.
