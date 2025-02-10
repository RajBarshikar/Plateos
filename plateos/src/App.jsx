import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import OnBoardingForm from './components/OnBoardingForm';
import HomePage from './components/HomePage';
import { AuthProvider } from './context/AuthContext';
import FoodSearchPage from './components/FoodSearchPage';

function App() {
  return (
    <AuthProvider>  
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<OnBoardingForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/manual-entry" element={<FoodSearchPage />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
    </AuthProvider>
  );
}

export default App;