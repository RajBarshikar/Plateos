// components/MealModal.jsx
import { useNavigate } from 'react-router-dom';
import './MealModal.css';

const MEAL_TYPES = {
  breakfast: { name: 'Breakfast', goal: 538 },
  morningSnack: { name: 'Morning Snack', goal: 269 },
  lunch: { name: 'Lunch', goal: 538 },
  eveningSnack: { name: 'Evening Snack', goal: 269 },
  dinner: { name: 'Dinner', goal: 538 }
};

function MealModal({ onClose, userData }) {
  const navigate = useNavigate();

  const handleMealSelect = (mealType) => {
    // Convert the meal type to the correct format and navigate
    const normalizedMealType = mealType.toLowerCase().replace(/\s+/g, '');
    navigate('/manual-entry');
    onClose(); // Close the modal after selection
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Which meal would you like to track?</h2>
        {Object.entries(MEAL_TYPES).map(([key, { name, goal }]) => {
          const consumed = userData?.dailyMeals?.[key]?.consumed || 0;
          const mealGoal = userData?.mealGoals?.[key] || goal;
          
          return (
            <div 
              key={key} 
              className="meal-option" 
              onClick={() => handleMealSelect(key)}
            >
              <div className="meal-info">
                <span className="meal-name">{name}</span>
                <span className="meal-calories">
                  {consumed} of {mealGoal} Cal
                </span>
              </div>
              <button 
                className="add-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMealSelect(key);
                }}
              >
                +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MealModal;