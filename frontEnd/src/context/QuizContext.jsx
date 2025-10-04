import { createContext, useContext, useState } from "react";
import quizData from "../data/quizData";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const changeLanguage = (lang) => setLanguage(lang);

  const addAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
  };

  const resetQuiz = () => {
    setAnswers([]);
    setResult(null);
  };

  // خوارزمية مبسطة لتحليل الأجوبة
  const calculateResult = () => {
    if (answers.length === 0) {
      setResult(null);
      return;
    }

    // عدّ الأجوبة الإيجابية
    let positiveCount = 0;
    let negativeCount = 0;

    answers.forEach((a) => {
      if (
        ["Yes", "Absolutely", "Oui", "Absolument", "I enjoy coding", "I love creating", "Yes, very much", "Oui, j'adore créer", "Oui, énormément"].some(opt => a.includes(opt))
      ) {
        positiveCount++;
      } else {
        negativeCount++;
      }
    });

    // منطق بسيط: 
    if (positiveCount > negativeCount) {
      setResult("Scientific/Engineering Track 🚀");
    } else {
      setResult("Management/Support Track 🛰️");
    }
  };

  return (
    <QuizContext.Provider
      value={{
        language,
        changeLanguage,
        quizData,
        answers,
        addAnswer,
        result,
        calculateResult,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
