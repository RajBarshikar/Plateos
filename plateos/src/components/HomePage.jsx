// components/HomePage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import MealModal from './MealModal';
import ProgressBar from './ProgressBar';
import './HomePage.css';

function HomePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showMealModal, setShowMealModal] = useState(false);

  // Define macro goals
  const DEFAULT_MACRO_GOALS = {
    protein: 50, // grams
    carbs: 275,  // grams
    fats: 55,    // grams
    fiber: 25    // grams
  };
  
  useEffect(() => {
    if (!user?.email) return;

    const unsubscribe = onSnapshot(
      doc(db, "users", user.email),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserData({
            ...data,
            macros: {
              protein: data.macros?.protein || 0,
              carbs: data.macros?.carbs || 0,
              fats: data.macros?.fats || 0,
              fiber: data.macros?.fiber || 0
            }
          });
        }
      },
      (error) => {
        console.error("Error fetching user data:", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const calculateProgress = (consumed, goal) => {
    if (!consumed || !goal) return 0;
    return (consumed / goal) * 100;
  };

  // Map to convert display names to database keys
  const MACRO_MAPPING = {
    'Protein': 'protein',
    'Carbs': 'carbs',
    'Fat': 'fats',
    'Fiber': 'fiber'
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Today's Goals</h1>
      </div>

      <div className="tracking-card">
        <div className="track-food">
          <div className="track-icon">🍽️</div>
          <div className="track-info">
            <h2>Track Food</h2>
            <p>{userData?.totalConsumed || 0} of {userData?.goalCalories || 2000} Cal</p>
          </div>
          <button className="add-btn" onClick={() => setShowMealModal(true)}>+</button>
        </div>

        <div className="macros-section">
          {[
            { label: 'Protein', key: 'protein' },
            { label: 'Carbs', key: 'carbs' },
            { label: 'Fat', key: 'fats' },
            { label: 'Fiber', key: 'fiber' }
          ].map(({ label, key }) => (
            <ProgressBar
              key={key}
              label={label}
              progress={calculateProgress(
                userData?.macros?.[key] || 0,
                userData?.macroGoals?.[key] || 100
              )}
            />
          ))}
        </div>
      </div>

      {showMealModal && (
        <MealModal
          onClose={() => setShowMealModal(false)}
          userData={userData}
        />
      )}
    </div>
  );
}

export default HomePage;