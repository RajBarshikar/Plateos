// utils/calorieCalculator.js
export const calculateGoalCalories = (userData) => {
    const { weight, height, age, gender, activityLevel, goal } = userData;
    
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
  
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[activityLevel];
  
    // Adjust based on goal
    let goalCalories;
    switch (goal) {
      case 'lose':
        goalCalories = tdee - 500; // 500 calorie deficit for weight loss
        break;
      case 'gain':
        goalCalories = tdee + 500; // 500 calorie surplus for weight gain
        break;
      default:
        goalCalories = tdee; // Maintain weight
    }
  
    // Calculate meal-specific calories
    const mealDistribution = {
      breakfast: 0.25,
      morningSnack: 0.125,
      lunch: 0.25,
      eveningSnack: 0.125,
      dinner: 0.25
    };
  
    return {
      totalCalories: Math.round(goalCalories),
      mealCalories: {
        breakfast: Math.round(goalCalories * mealDistribution.breakfast),
        morningSnack: Math.round(goalCalories * mealDistribution.morningSnack),
        lunch: Math.round(goalCalories * mealDistribution.lunch),
        eveningSnack: Math.round(goalCalories * mealDistribution.eveningSnack),
        dinner: Math.round(goalCalories * mealDistribution.dinner)
      }
    };
  };