import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { language, user, logout } = useQuiz();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = {
    en: [
      { path: "/home", label: "Home" },
      { path: "/quiz", label: "Take Quiz" },
      { path: "/about", label: "About Us" },
      { path: "/faq", label: "FAQ" }
    ],
    fr: [
      { path: "/home", label: "Accueil" },
      { path: "/quiz", label: "Quiz" },
      { path: "/about", label: "À propos" },
      { path: "/faq", label: "FAQ" }
    ]
  };

  const items = navItems[language];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/home" className="nav-logo">  {/* Changé de "/" à "/home" */}
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

          {user ? (
            <div className="nav-user">
              <span className="user-name">👤 {user.username}</span>
              <button onClick={handleLogout} className="btn-logout">
                {language === "en" ? "Logout" : "Déconnexion"}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-login"
              onClick={() => setIsMenuOpen(false)}
            >
              {language === "en" ? "Login" : "Connexion"}
            </Link>
          )}

          <div className="nav-lang">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;