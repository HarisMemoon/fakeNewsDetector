import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiUser, FiMail, FiLock, FiLoader } from 'react-icons/fi';



export default function Register() {
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

 
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    validateForm();
    
    // Registration request
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Registration failed');
    }

    // Auto-login after registration
    const loginResponse = await fetch('http://localhost:8000/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: formData.email,
        password: formData.password
      })
    });

    if (!loginResponse.ok) {
      throw new Error('Auto-login after registration failed');
    }

    const { access_token } = await loginResponse.json();
    
    // Store user data
    login({
      username: formData.username,
      email: formData.email,
      token: access_token
    });
    
    navigate('/');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      throw new Error('Invalid email address');
    }
    if (formData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  };
  

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-dark-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${darkMode ? 'bg-dark-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Create Account</h2>
        
        {error && (
          <div className={`mb-4 p-3 rounded ${darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Username</label>
            <div className={`flex items-center border rounded-lg ${darkMode ? 'border-dark-600 bg-dark-700' : 'border-gray-300 bg-white'}`}>
              <FiUser className={`ml-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <input
                type="text"
                className={`w-full p-2 outline-none ${darkMode ? 'bg-dark-700 text-white' : 'bg-white text-gray-800'}`}
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={`block mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Email</label>
            <div className={`flex items-center border rounded-lg ${darkMode ? 'border-dark-600 bg-dark-700' : 'border-gray-300 bg-white'}`}>
              <FiMail className={`ml-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <input
                type="email"
                className={`w-full p-2 outline-none ${darkMode ? 'bg-dark-700 text-white' : 'bg-white text-gray-800'}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={`block mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Password</label>
            <div className={`flex items-center border rounded-lg ${darkMode ? 'border-dark-600 bg-dark-700' : 'border-gray-300 bg-white'}`}>
              <FiLock className={`ml-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <input
                type="password"
                className={`w-full p-2 outline-none ${darkMode ? 'bg-dark-700 text-white' : 'bg-white text-gray-800'}`}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className={`block mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Confirm Password</label>
            <div className={`flex items-center border rounded-lg ${darkMode ? 'border-dark-600 bg-dark-700' : 'border-gray-300 bg-white'}`}>
              <FiLock className={`ml-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <input
                type="password"
                className={`w-full p-2 outline-none ${darkMode ? 'bg-dark-700 text-white' : 'bg-white text-gray-800'}`}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        <div className={`mt-4 text-center ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
          Already have an account?{' '}
          <Link to="/login" className={`font-medium hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}