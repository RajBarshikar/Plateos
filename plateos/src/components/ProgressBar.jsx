// components/ProgressBar.jsx
function ProgressBar({ label, progress }) {
  const isOverLimit = progress > 100;
  const displayProgress = Math.min(progress, 100);
  
  return (
    <div className="macro-progress">
      <div className="macro-label">
        <span>{label}:</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className={`progress-bar ${isOverLimit ? 'over-limit' : ''}`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;