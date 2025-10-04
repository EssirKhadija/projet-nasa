import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const Home = () => {
  const { language } = useQuiz();

  return (
    <div className="home">
      <h1>
        {language === "en"
          ? "Welcome to Space Careers Matchmaker!"
          : "Bienvenue sur Space Careers Matchmaker !"}
      </h1>
      <p>
        {language === "en"
          ? "Discover which NASA space career suits you best based on your interests."
          : "Découvrez quelle carrière spatiale de la NASA vous correspond le mieux selon vos intérêts."}
      </p>
      <Link to="/quiz" className="btn">
        {language === "en" ? "Start the Quiz" : "Commencer le quiz"}
      </Link>
    </div>
  );
};

export default Home;

