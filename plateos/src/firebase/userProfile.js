// firebase/userProfile.js
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { calculateGoalCalories } from '../utils/calorieCalculator';

export const initializeUserProfile = async (email, userData) => {
  try {
    const goalCalories = calculateGoalCalories(userData);
    const userRef = doc(db, 'users', email);
    
    await setDoc(userRef, {
      ...userData,
      goalCalories: goalCalories.totalCalories,
      mealGoals: goalCalories.mealCalories,
      dailyMeals: {
        breakfast: { consumed: 0, foods: [] },
        morningSnack: { consumed: 0, foods: [] },
        lunch: { consumed: 0, foods: [] },
        eveningSnack: { consumed: 0, foods: [] },
        dinner: { consumed: 0, foods: [] }
      },
      macros: {
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0
      },
      totalConsumed: 0,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('Error initializing user profile:', error);
    throw error;
  }
};

export const resetDailyProgress = async (email) => {
  try {
    const userRef = doc(db, 'users', email);
    
    await updateDoc(userRef, {
      dailyMeals: {
        breakfast: { consumed: 0, foods: [] },
        morningSnack: { consumed: 0, foods: [] },
        lunch: { consumed: 0, foods: [] },
        eveningSnack: { consumed: 0, foods: [] },
        dinner: { consumed: 0, foods: [] }
      },
      macros: {
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0
      },
      totalConsumed: 0,
      lastUpdated: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('Error resetting daily progress:', error);
    throw error;
  }
};