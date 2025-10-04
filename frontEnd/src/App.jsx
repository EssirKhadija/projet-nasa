import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { QuizProvider } from "./context/QuizContext";
import "./styles/style.css";

function App() {
  return (
    <QuizProvider>
      <div className="app dark-theme">
        <header className="header">
          <Link to="/" className="logo">🚀 Space Careers Matchmaker</Link>
          <LanguageSwitcher />
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
        <footer className="footer">© 2025 NASA Hackathon - by Khadija</footer>
      </div>
    </QuizProvider>
  );
}

export default App;
