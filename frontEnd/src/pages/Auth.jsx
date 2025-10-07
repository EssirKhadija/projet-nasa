import { useState } from 'react';

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? 'login.php' : 'register.php';
    const data = isLogin 
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      const response = await fetch(`http://localhost/projet-nasa/backEnd/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const result = await response.json();

      if (result.success && isLogin) {
        setUser(result.user);
      } else if (result.success && !isLogin) {
        setIsLogin(true);
        setFormData({ username: '', email: '', password: '' });
      } else {
        setError(result.message || 'Operation failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost/projet-nasa/backEnd/logout.php', {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setUser(null);
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (error) {
      setError('Logout error: ' + error.message);
    }
  };

  if (user) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h1>Welcome, {user.username}!</h1>
          <div className="form-group">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-auth">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{isLogin ? 'Login to Your Account' : 'Create New Account'}</h1>
        
        {error && <div className="error-message">{error}</div>}

        <div className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            onClick={handleSubmit} 
            className="btn btn-auth" 
            disabled={loading}
          >
            {loading ? '...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </div>

        <p className="auth-link">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ username: '', email: '', password: '' });
            }}
            style={{ cursor: 'pointer', color: '#0066cc', textDecoration: 'underline' }}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
}