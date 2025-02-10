// // components/ProgressBar.jsx
// function ProgressBar({ label, progress }) {
//   const isOverLimit = progress > 100;
//   const displayProgress = Math.min(progress, 100);
  
//   return (
//     <div className="macro-progress">
//       <div className="macro-label">
//         <span>{label}:</span>
//         <span>{Math.round(progress)}%</span>
//       </div>
//       <div className="progress-bar-container">
//         <div 
//           className={`progress-bar ${isOverLimit ? 'over-limit' : ''}`}
//           style={{ width: `${displayProgress}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// export default ProgressBar;


import React from "react";

function ProgressBar({ label, progress }) {
  const isOverLimit = progress > 100;
  const displayProgress = Math.min(progress, 100);
  const radius = 40; // Circle radius
  const stroke = 8; // Stroke thickness
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className="macro-progress">
      <div className="macro-label">
        <span>{label}:</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="circular-progress-container">
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#e0e0e0"
            strokeWidth={stroke}
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={isOverLimit ? "#FF5252" : "#4CAF50"}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)" // Rotate to start from the top
          />
        </svg>
        {/* <div className="progress-text">{Math.round(progress)}%</div> */}
      </div>
    </div>
  );
}

export default ProgressBar;
