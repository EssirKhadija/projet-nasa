import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { language } = useQuiz();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = {
    en: [
      { path: "/", label: "Home" },
      { path: "/quiz", label: "Take Quiz" },
      { path: "/about", label: "About Us" },
      { path: "/faq", label: "FAQ" }
    ],
    fr: [
      { path: "/", label: "Accueil" },
      { path: "/quiz", label: "Quiz" },
      { path: "/about", label: "À propos" },
      { path: "/faq", label: "FAQ" }
    ]
  };

  const items = navItems[language];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🚀 Space Careers Matchmaker
        </Link>

        <button className="nav-toggle" onClick={toggleMenu}>
          <span className={isMenuOpen ? "bar open" : "bar"}></span>
          <span className={isMenuOpen ? "bar open" : "bar"}></span>
          <span className={isMenuOpen ? "bar open" : "bar"}></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="nav-lang">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;