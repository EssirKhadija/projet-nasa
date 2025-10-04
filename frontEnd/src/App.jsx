import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { QuizProvider } from "./context/QuizContext";
import "./styles/style.css";

function App() {
  return (
    <QuizProvider>
      <div className="app dark-theme">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="footer">© 2025 NASA Hackathon - by Khadija</footer>
      </div>
    </QuizProvider>
  );
}

export default App;