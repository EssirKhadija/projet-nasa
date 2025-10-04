import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const Login = () => {
  const { language, setUser } = useQuiz();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const content = {
    en: {
      title: "Login to Your Account",
      email: "Email Address",
      password: "Password",
      loginBtn: "Login",
      noAccount: "Don't have an account?",
      register: "Register here",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password"
    },
    fr: {
      title: "Connexion à votre compte",
      email: "Adresse e-mail",
      password: "Mot de passe",
      loginBtn: "Se connecter",
      noAccount: "Vous n'avez pas de compte ?",
      register: "Inscrivez-vous ici",
      emailPlaceholder: "Entrez votre e-mail",
      passwordPlaceholder: "Entrez votre mot de passe"
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

    try {
      const response = await fetch("http://localhost/nasa_quiz/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Sauvegarder l'utilisateur dans le contexte
        setUser(data.user);
        // Sauvegarder dans localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{t.title}</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
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

          <div className="form-group">
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

          <button type="submit" className="btn btn-auth" disabled={loading}>
            {loading ? "..." : t.loginBtn}
          </button>
        </form>

        <p className="auth-link">
          {t.noAccount} <Link to="/register">{t.register}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;