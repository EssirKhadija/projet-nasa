import React from "react";
import { useQuiz } from "../context/QuizContext";
import { Link } from "react-router-dom";

const Result = () => {
  const { result, resetQuiz, language } = useQuiz();

  return (
    <div className="result">
      <h2>
        {language === "en"
          ? "Your ideal NASA career is:"
          : "Votre carrière idéale à la NASA est :"}
      </h2>
      <p className="career">{result}</p>
      <Link to="/" className="btn" onClick={resetQuiz}>
        {language === "en" ? "Retake Quiz" : "Recommencer le quiz"}
      </Link>
    </div>
  );
};

export default Result;
