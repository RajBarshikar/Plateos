import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to HealthTracker</h1>
        <p className="landing-subtitle">Your journey to a healthier lifestyle begins here</p>
        
        <div className="landing-buttons">
          <button 
            className="landing-button login-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="landing-button signup-button"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;