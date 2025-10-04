import { useState } from 'react';

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setMessage(result.message);

      if (result.success && isLogin) {
        setUser(result.user);
      } else if (result.success && !isLogin) {
        setIsLogin(true);
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (error) {
      setMessage('Connection error: ' + error.message);
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
        setMessage('Logged out successfully');
      }
    } catch (error) {
      setMessage('Logout error: ' + error.message);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {user.username}!</h2>
          <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
            <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {message && (
          <div className={`p-3 rounded mb-4 ${
            message.includes('successful') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
              setFormData({ username: '', email: '', password: '' });
            }}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}