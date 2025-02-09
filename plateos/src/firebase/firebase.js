import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzWTiCGhwUyKtag-a6-JCfWNBQA_StvKk",
  authDomain: "plateos-3e5a7.firebaseapp.com",
  projectId: "plateos-3e5a7",
  storageBucket: "plateos-3e5a7.firebasestorage.app",
  messagingSenderId: "900894860536",
  appId: "1:900894860536:web:08533479f9e9958ede870d",
  measurementId: "G-CD0J5XMX77",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const createUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...userData,
      email,
      createdAt: new Date().toISOString(),
    })

    return user
  } catch (error) {
    throw error
  }
}

