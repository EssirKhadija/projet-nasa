import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const Landing = () => {
  const { language } = useQuiz();

  const content = {
    en: {
      badge: "NASA Space Apps Challenge 2025",
      title: "Discover Your",
      titleAccent: "Space Career",
      subtitle: "Match your skills with NASA's most exciting opportunities",
      description: "Join thousands of space enthusiasts in finding their perfect career path through our AI-powered matching system.",
      ctaLogin: "Start Your Journey",
      ctaLearn: "Learn More",
      stats: [
        { number: "50+", label: "Career Paths" },
        { number: "10K+", label: "Users" },
        { number: "95%", label: "Satisfaction" }
      ],
      
    },
    fr: {
      badge: "NASA Space Apps Challenge 2025",
      title: "Découvrez Votre",
      titleAccent: "Carrière Spatiale",
      subtitle: "Associez vos compétences aux opportunités les plus excitantes de la NASA",
      description: "Rejoignez des milliers de passionnés de l'espace pour trouver leur parcours professionnel idéal grâce à notre système de correspondance basé sur l'IA.",
      ctaLogin: "Commencez Votre Voyage",
      ctaLearn: "En Savoir Plus",
      stats: [
        { number: "50+", label: "Parcours" },
        { number: "10K+", label: "Utilisateurs" },
        { number: "95%", label: "Satisfaction" }
      ],
      
    }
  };

  const t = content[language];

  return (
    <div className="landing-modern">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>

        <div className="hero-content">
          <div className="badge-container">
            <span className="badge">{t.badge}</span>
          </div>

          <h1 className="hero-title">
            {t.title}
            <br />
            <span className="title-accent">{t.titleAccent}</span>
          </h1>

          <p className="hero-subtitle">{t.subtitle}</p>
          <p className="hero-description">{t.description}</p>

          <div className="cta-buttons">
            <Link to="/login" className="btn-cta-primary">
              <span>{t.ctaLogin}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="stats-container">
            {t.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-card card-1">
            <div className="card-icon">🚀</div>
            <div className="card-text">Aerospace Engineer</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">🔭</div>
            <div className="card-text">Astrophysicist</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">🤖</div>
            <div className="card-text">Robotics Specialist</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Landing;