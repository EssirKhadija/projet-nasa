import { createContext, useContext, useState } from "react";
import quizData from "../data/quizData";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const changeLanguage = (lang) => setLanguage(lang);
  const addAnswer = (answer) => setAnswers([...answers, answer]);
  const resetQuiz = () => { setAnswers([]); setResult(null); };
  const calculateResult = () => {
    setResult("Astrophysicist");
  };

  return (
    <QuizContext.Provider value={{
      language, changeLanguage, quizData, answers,
      addAnswer, result, calculateResult, resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
