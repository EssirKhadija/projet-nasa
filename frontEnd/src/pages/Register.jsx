import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const Register = () => {
  const { language } = useQuiz();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const content = {
    en: {
      title: "Join Space Careers",
      subtitle: "Start your journey to discover your ideal NASA career",
      username: "Username",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      registerBtn: "Create Account",
      hasAccount: "Already have an account?",
      login: "Sign In",
      usernamePlaceholder: "Choose a username",
      emailPlaceholder: "your.email@example.com",
      passwordPlaceholder: "Min. 6 characters",
      confirmPasswordPlaceholder: "Re-enter password",
      features: [
        "🚀 Discover your dream space career",
        "📊 Personalized career matching",
        "🌌 Access exclusive NASA insights",
        "💡 Track your quiz history"
      ]
    },
    fr: {
      title: "Rejoignez Space Careers",
      subtitle: "Commencez votre voyage pour découvrir votre carrière NASA idéale",
      username: "Nom d'utilisateur",
      email: "Adresse e-mail",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      registerBtn: "Créer un compte",
      hasAccount: "Vous avez déjà un compte ?",
      login: "Se connecter",
      usernamePlaceholder: "Choisissez un nom d'utilisateur",
      emailPlaceholder: "votre.email@exemple.com",
      passwordPlaceholder: "Min. 6 caractères",
      confirmPasswordPlaceholder: "Confirmez le mot de passe",
      features: [
        "🚀 Découvrez votre carrière spatiale de rêve",
        "📊 Correspondance de carrière personnalisée",
        "🌌 Accédez à des informations exclusives de la NASA",
        "💡 Suivez votre historique de quiz"
      ]
    }
  };

  const t = content[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(language === "en" ? "Passwords do not match" : "Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(language === "en" ? "Password must be at least 6 characters" : "Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/nasa_quiz/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        navigate("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError(language === "en" ? "Connection error. Please try again." : "Erreur de connexion. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Side - Info */}
        <div className="register-info">
          <div className="register-info-content">
            <h1>{t.title}</h1>
            <p className="register-subtitle">{t.subtitle}</p>
            <ul className="features-list">
              {t.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="register-form-section">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form-modern">
            <div className="form-row">
              <div className="form-group-modern">
                <label>{t.username}</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={t.usernamePlaceholder}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group-modern">
                <label>{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group-modern">
                <label>{t.password}</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t.passwordPlaceholder}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group-modern">
                <label>{t.confirmPassword}</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t.confirmPasswordPlaceholder}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-register-modern" disabled={loading}>
              {loading ? "⏳" : t.registerBtn}
            </button>
          </form>

          <p className="auth-link-modern">
            {t.hasAccount} <Link to="/login">{t.login}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;