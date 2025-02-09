import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/home');
      } catch (error) {
        console.error("Login error:", error.code);
        switch (error.code) {
          case 'auth/user-not-found':
            setError('No account exists with this email');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password');
            break;
          case 'auth/invalid-email':
            setError('Invalid email format');
            break;
          default:
            setError('Failed to login. Please try again.');
        }
      }
    };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Please sign in to continue</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-submit">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{''}
          <button 
            className="login-link"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;