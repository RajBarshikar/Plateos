import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "../context/FormContext";
import OnboardingForm from "../components/OnBoardingForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <FormProvider> {/* Wrap everything */}
        <Routes>
          <Route path="/" element={<OnboardingForm />} />
          <Route path="/form" element={<OnboardingForm />} />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
