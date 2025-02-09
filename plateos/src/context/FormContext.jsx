"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
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
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}