import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { QuizProvider, useQuiz } from "./context/QuizContext";
import "./styles/style.css";

const PublicRoute = ({ children }) => {
  const { user } = useQuiz();
  return user ? <Navigate to="/home" replace /> : children;
};

function AppRoutes() {
  const { user } = useQuiz();

  return (
    <div className="app dark-theme">
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={
          <PublicRoute>
            <>
              <main className="main-full"><Landing /></main>
              <footer className="footer">© 2025 NASA Hackathon</footer>
            </>
          </PublicRoute>
        } />
        
        <Route path="/login" element={
          <PublicRoute>
            <>
              <main className="main"><Auth /></main>
              <footer className="footer">© 2025 NASA Hackathon</footer>
            </>
          </PublicRoute>
        } />

        {/* Routes protégées */}
        <Route path="/home" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <main className="main"><Home /></main>
              <footer className="footer">© 2025 NASA Hackathon</footer>
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/quiz" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <main className="main"><Quiz /></main>
              <footer className="footer">© 2025 NASA Hackathon</footer>
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/result" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <main className="main"><Result /></main>
              <footer className="footer">© 2025 NASA Hackathon</footer>
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/about" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <main className="main"><About /></main>
              <footer className="footer">© 2025 NASA Hackathon</footer>
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/faq" element={
          <ProtectedRoute>
            <>
              <Navbar />
              <main className="main"><FAQ /></main>
              <footer className="footer">© 2025 NASA Hackathon</footer>
            </>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to={user ? "/home" : "/"} replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <QuizProvider>
      <AppRoutes />
    </QuizProvider>
  );
}

export default App;