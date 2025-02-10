// api/calorieNinja.js
const CALORIE_NINJA_API_KEY = 'PBwO9Jg0GvxfWJzIqcLF8g==Ij2rU1NT0rOfpeXw';
const API_URL = 'https://api.calorieninjas.com/v1/nutrition';

export const searchFood = async (query) => {
  try {
    const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': CALORIE_NINJA_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch food data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching food data:', error);
    throw error;
  }
};