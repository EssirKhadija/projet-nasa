import { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { quizData, language, addAnswer, calculateResult } = useQuiz();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    addAnswer(answer);
    if (current < quizData.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateResult();
      navigate("/result");
    }
  };

  const q = quizData.questions[current][language];

  return (
    <div className="quiz">
      <h2>{q.question}</h2>
      <div className="answers">
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
