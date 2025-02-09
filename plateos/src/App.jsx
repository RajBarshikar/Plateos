import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import OnBoardingForm from './components/OnBoardingForm';
import HomePage from './components/HomePage';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<OnBoardingForm />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;