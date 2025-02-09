import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRouter from './routes/AppRouter'
import { auth } from './firebase/firebase'

export default function App() {
  return (
    <AppRouter />
  )
}
