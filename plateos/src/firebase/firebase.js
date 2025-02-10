import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {   signInWithEmailAndPassword } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzWTiCGhwUyKtag-a6-JCfWNBQA_StvKk",
  authDomain: "plateos-3e5a7.firebaseapp.com",
  projectId: "plateos-3e5a7",
  storageBucket: "plateos-3e5a7.firebasestorage.app",
  messagingSenderId: "900894860536",
  appId: "1:900894860536:web:08533479f9e9958ede870d",
  measurementId: "G-CD0J5XMX77",
}

export const updateUserProfile = async (email, userData) => {
  try {
    await setDoc(doc(db, "users", email), {
      ...userData,
      email: email,
      updatedAt: serverTimestamp(),
    }, { merge: true }); // Added merge option to update existing document
    return true;
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
};



  
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
auth.useDeviceLanguage(); // Add this line

export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};


// ... other imports and config ...

export const updateUserCalories = async (email, mealType, foodData) => {
  try {
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Initialize user document if it doesn't exist
      const initialData = {
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
        lastUpdated: serverTimestamp()
      };
      await setDoc(userRef, initialData);
    }

    const currentData = (await getDoc(userRef)).data();
    
    // Prepare the food entry with ISO string timestamp instead of serverTimestamp
    const foodEntry = {
      ...foodData,
      addedAt: new Date().toISOString() // Use ISO string instead of serverTimestamp
    };

    // Normalize meal type to match the structure
    const normalizedMealType = mealType.toLowerCase();

    // Update the meals data
    const updatedMeals = {
      ...currentData.dailyMeals,
      [normalizedMealType]: {
        consumed: (currentData.dailyMeals?.[normalizedMealType]?.consumed || 0) + foodData.calories,
        foods: [...(currentData.dailyMeals?.[normalizedMealType]?.foods || []), foodEntry]
      }
    };

    // Update the document
    await updateDoc(userRef, {
      dailyMeals: updatedMeals,
      totalConsumed: (currentData.totalConsumed || 0) + foodData.calories,
      macros: {
        protein: (currentData.macros?.protein || 0) + (foodData.protein || 0),
        carbs: (currentData.macros?.carbs || 0) + (foodData.carbs || 0),
        fats: (currentData.macros?.fats || 0) + (foodData.fats || 0),
        fiber: (currentData.macros?.fiber || 0) + (foodData.fiber || 0)
      },
      lastUpdated: serverTimestamp() // This is fine as it's not in an array
    });

    return true;
  } catch (error) {
    console.error("Error updating calories:", error);
    throw error;
  }
};

