// src/components/FoodSearchPage.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analyzeFood } from '../utils/geminiService.js';
import { updateUserCalories } from '../firebase/firebase';
import './FoodSearchPage.css';

function FoodSearchPage() {
  

  

  


  const [foodInput, setFoodInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get meal type from URL and convert to lowercase
  const mealType = new URLSearchParams(location.search).get('meal')?.toLowerCase() || 'breakfast';

  const handleAnalyzeFood = async (e) => {
    e.preventDefault();
    if (!foodInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeFood(foodInput);
      setNutritionData({
        ...data,
        name: foodInput, // Add food name to the nutrition data
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Food analysis error:', err);
      setError('Failed to analyze food. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = async () => {
    if (!nutritionData || saving) return;

    setSaving(true);
    setError(null);

    try {
      await updateUserCalories(user.email, mealType, {
        ...nutritionData,
        addedAt: new Date().toISOString()
      });
      navigate('/');
    } catch (err) {
      //console.error('Save food error:', err);
      setError('Failed to save food data. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="food-search-container">
      <div className="header">
        <h2>Add Food to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
      </div>

      <form onSubmit={handleAnalyzeFood} className="search-form">
        <input
          type="text"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
          placeholder="Enter food and quantity (e.g., 2 slices of wheat bread)"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !foodInput.trim()}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {nutritionData && (
        <div className="nutrition-card">
          <h3>Nutrition Information</h3>
          <div className="nutrition-info">
            <div className="info-item">
              <span>Calories:</span>
              <span>{nutritionData.calories} kcal</span>
            </div>
            <div className="info-item">
              <span>Protein:</span>
              <span>{nutritionData.protein}g</span>
            </div>
            <div className="info-item">
              <span>Carbs:</span>
              <span>{nutritionData.carbs}g</span>
            </div>
            <div className="info-item">
              <span>Fat:</span>
              <span>{nutritionData.fats}g</span>
            </div>
            <div className="info-item">
              <span>Fiber:</span>
              <span>{nutritionData.fiber}g</span>
            </div>
          </div>
          <button 
            className="add-food-button"
            onClick={handleAddFood}
          >
            Add to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
          </button>
        </div>
      )}
    </div>
  );
}

export default FoodSearchPage;