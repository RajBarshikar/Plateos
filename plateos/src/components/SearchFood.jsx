// components/SearchFood.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchFood } from '../api/calorieNinja';
import './SearchFood.css';

function SearchFood() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const mealType = searchParams.get('meal');

  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length < 2) return;

    setLoading(true);
    try {
      const data = await searchFood(value);
      setResults(data.items || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodSelect = (food) => {
    navigate(`/food-details/${food.id}?meal=${mealType}`);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search food..."
          className="search-input"
        />
        <button className="close-button" onClick={() => navigate('/home')}>×</button>
      </div>

      <div className="search-results">
        {loading ? (
          <div className="loading">Searching...</div>
        ) : (
          results.map((food) => (
            <div
              key={food.id}
              className="food-item"
              onClick={() => handleFoodSelect(food)}
            >
              <span className="food-name">{food.name}</span>
              <button className="add-button">+</button>
            </div>
          ))
        )}
        {!loading && results.length === 0 && query.length > 1 && (
          <div className="no-results">
            <p>Can't find your food?</p>
            <button className="manual-entry">Add manually</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFood;