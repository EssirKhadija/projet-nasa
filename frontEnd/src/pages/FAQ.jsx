import { useState } from "react";
import { useQuiz } from "../context/QuizContext";

const FAQ = () => {
  const { language } = useQuiz();
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = {
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about Space Careers Matchmaker",
      questions: [
        {
          question: "What is Space Careers Matchmaker?",
          answer: "Space Careers Matchmaker is an interactive quiz tool that helps you discover which NASA career path aligns best with your interests, skills, and aspirations. Through carefully designed questions, we analyze your preferences and match you with exciting space-related professions."
        },
        {
          question: "How accurate is the career matching?",
          answer: "Our algorithm is designed to provide meaningful insights based on your responses. While it's a fun and educational tool, we recommend using the results as a starting point for further research into NASA careers that interest you."
        },
        {
          question: "How long does the quiz take?",
          answer: "The quiz typically takes 5-10 minutes to complete. Take your time with each question to ensure the most accurate results!"
        },
        {
          question: "Can I retake the quiz?",
          answer: "Absolutely! You can retake the quiz as many times as you'd like. Your interests may change over time, and it's great to explore different career paths."
        },
        {
          question: "What careers are included?",
          answer: "We cover a wide range of NASA careers including Astrophysicist, Aerospace Engineer, Mission Specialist, Planetary Scientist, Robotics Engineer, Data Scientist, and many more exciting positions in space exploration."
        },
        {
          question: "Is this an official NASA tool?",
          answer: "This tool was created for the NASA Space Apps Challenge 2025. While inspired by real NASA careers, it is an educational project and not an official NASA recruitment tool."
        },
        {
          question: "How can I learn more about NASA careers?",
          answer: "Visit nasa.gov/careers for official information about working at NASA, including job requirements, application processes, and current openings."
        },
        {
          question: "Do I need a science background?",
          answer: "NASA employs people from diverse backgrounds! While many positions require technical expertise, there are also opportunities in communications, administration, education, and many other fields."
        }
      ]
    },
    fr: {
      title: "Questions Fréquemment Posées",
      subtitle: "Trouvez des réponses aux questions courantes sur Space Careers Matchmaker",
      questions: [
        {
          question: "Qu'est-ce que Space Careers Matchmaker ?",
          answer: "Space Careers Matchmaker est un outil de quiz interactif qui vous aide à découvrir quelle carrière à la NASA correspond le mieux à vos intérêts, compétences et aspirations. Grâce à des questions soigneusement conçues, nous analysons vos préférences et vous associons à des professions spatiales passionnantes."
        },
        {
          question: "Quelle est la précision de la correspondance de carrière ?",
          answer: "Notre algorithme est conçu pour fournir des informations significatives basées sur vos réponses. Bien qu'il s'agisse d'un outil amusant et éducatif, nous vous recommandons d'utiliser les résultats comme point de départ pour des recherches plus approfondies sur les carrières de la NASA qui vous intéressent."
        },
        {
          question: "Combien de temps dure le quiz ?",
          answer: "Le quiz prend généralement 5 à 10 minutes. Prenez votre temps pour chaque question afin d'obtenir les résultats les plus précis !"
        },
        {
          question: "Puis-je refaire le quiz ?",
          answer: "Absolument ! Vous pouvez refaire le quiz autant de fois que vous le souhaitez. Vos intérêts peuvent changer avec le temps, et c'est formidable d'explorer différentes carrières."
        },
        {
          question: "Quelles carrières sont incluses ?",
          answer: "Nous couvrons un large éventail de carrières à la NASA, notamment astrophysicien, ingénieur aérospatial, spécialiste de mission, scientifique planétaire, ingénieur en robotique, data scientist et bien d'autres postes passionnants dans l'exploration spatiale."
        },
        {
          question: "Est-ce un outil officiel de la NASA ?",
          answer: "Cet outil a été créé pour le NASA Space Apps Challenge 2025. Bien qu'inspiré par de vraies carrières à la NASA, il s'agit d'un projet éducatif et non d'un outil officiel de recrutement de la NASA."
        },
        {
          question: "Comment puis-je en savoir plus sur les carrières à la NASA ?",
          answer: "Visitez nasa.gov/careers pour des informations officielles sur le travail à la NASA, y compris les exigences du poste, les processus de candidature et les postes actuellement ouverts."
        },
        {
          question: "Ai-je besoin d'une formation scientifique ?",
          answer: "La NASA emploie des personnes de divers horizons ! Bien que de nombreux postes nécessitent une expertise technique, il existe également des opportunités dans les communications, l'administration, l'éducation et bien d'autres domaines."
        }
      ]
    }
  };

  const content = faqData[language];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>
      </div>

      <div className="faq-content">
        {content.questions.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
          >
            <button 
              className="faq-question"
              onClick={() => toggleQuestion(index)}
            >
              <span>{item.question}</span>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;