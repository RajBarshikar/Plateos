"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {  // Add export here
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    language: "English",
    age: 19,
    gender: "",
    height: { value: 165, unit: "cm" },
    weight: { value: 43, unit: "kg" },
    activityLevel: "",
    medicalConditions: [],
    goalWeight: { value: 1, unit: "kg", timeframe: "week" },
    dietPreference: "",
    mealFrequency: 3,
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);

export default FormContext;
