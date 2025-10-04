import React from "react";
import { useQuiz } from "../context/QuizContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useQuiz();
  return (
    <div className="lang-switch">
      <button
        className={language === "en" ? "active" : ""}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
      <button
        className={language === "fr" ? "active" : ""}
        onClick={() => changeLanguage("fr")}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;