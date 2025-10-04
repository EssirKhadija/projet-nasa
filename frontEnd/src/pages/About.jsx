import { useQuiz } from "../context/QuizContext";

const About = () => {
  const { language } = useQuiz();

  const content = {
    en: {
      title: "About Space Careers Matchmaker",
      mission: "Our Mission",
      missionText: "Space Careers Matchmaker is an innovative tool designed to help aspiring space professionals discover their ideal career path at NASA. Through an engaging quiz, we analyze your interests, skills, and passions to match you with the perfect space career.",
      how: "How It Works",
      howText: "Our intelligent algorithm evaluates your responses to carefully crafted questions about your preferences, technical skills, and career aspirations. We then match you with one of NASA's exciting career paths, from Astrophysicist to Mission Specialist.",
      team: "Our Team",
      teamText: "Created during the NASA Space Apps Challenge 2025, this project represents our commitment to inspiring the next generation of space explorers and scientists.",
      careers: "Career Paths We Cover",
      careerList: [
        "Astrophysicist - Study the universe and celestial phenomena",
        "Aerospace Engineer - Design spacecraft and propulsion systems",
        "Mission Specialist - Lead space missions and operations",
        "Planetary Scientist - Explore planets and their environments",
        "Robotics Engineer - Develop autonomous space systems",
        "Data Scientist - Analyze space data and mission telemetry"
      ]
    },
    fr: {
      title: "À propos de Space Careers Matchmaker",
      mission: "Notre Mission",
      missionText: "Space Careers Matchmaker est un outil innovant conçu pour aider les futurs professionnels de l'espace à découvrir leur parcours professionnel idéal à la NASA. Grâce à un quiz engageant, nous analysons vos intérêts, compétences et passions pour vous orienter vers la carrière spatiale parfaite.",
      how: "Comment ça marche",
      howText: "Notre algorithme intelligent évalue vos réponses à des questions soigneusement élaborées sur vos préférences, compétences techniques et aspirations professionnelles. Nous vous associons ensuite à l'un des parcours professionnels passionnants de la NASA, d'astrophysicien à spécialiste de mission.",
      team: "Notre Équipe",
      teamText: "Créé lors du NASA Space Apps Challenge 2025, ce projet représente notre engagement à inspirer la prochaine génération d'explorateurs et de scientifiques de l'espace.",
      careers: "Carrières Couvertes",
      careerList: [
        "Astrophysicien - Étudier l'univers et les phénomènes célestes",
        "Ingénieur Aérospatial - Concevoir des vaisseaux spatiaux",
        "Spécialiste de Mission - Diriger les missions spatiales",
        "Scientifique Planétaire - Explorer les planètes",
        "Ingénieur Robotique - Développer des systèmes autonomes",
        "Data Scientist - Analyser les données spatiales"
      ]
    }
  };

  const t = content[language];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>{t.title}</h1>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>{t.mission}</h2>
          <p>{t.missionText}</p>
        </section>

        <section className="about-section">
          <h2>{t.how}</h2>
          <p>{t.howText}</p>
        </section>

        <section className="about-section">
          <h2>{t.careers}</h2>
          <ul className="careers-list">
            {t.careerList.map((career, index) => (
              <li key={index}>{career}</li>
            ))}
          </ul>
        </section>

        <section className="about-section">
          <h2>{t.team}</h2>
          <p>{t.teamText}</p>
        </section>
      </div>
    </div>
  );
};

export default About;