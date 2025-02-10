"use client"

import { useState } from "react"
import { useForm } from "../context/FormContext"
import { createUser } from "../firebase/firebase"
import { useNavigate } from "react-router-dom";
import FormStep from "./FormStep"
import './OnBoardingForm.css'

function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const { formData, updateFormData } = useForm()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Added error state
  //const router = useRouter(); 

  const handleNext = () => setCurrentStep((prev) => prev + 1)
  const handleBack = () => setCurrentStep((prev) => prev - 1)

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters");
      }
      await createUser(email, password, formData);
      navigate('/login'); // Add navigation after successful signup
    } catch (error) {
      console.error("Error creating user:", error);
      // Add error state and display to user
      setError(error.message);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep
            title="Hey There!"
            subtitle="We're happy that you have taken first steps towards a healthier you. We need few details to kickstart your journey"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
          >
            <input
              type="text"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </FormStep>
        )

      case 2:
        return (
          <FormStep
            title="Where are you from?"
            subtitle="This will help us personalize app for you"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <input
              type="text"
              placeholder="Enter your city"
              value={formData.location}
              onChange={(e) => updateFormData("location", e.target.value)}
              className="form-input"
            />
            <select
              value={formData.language}
              onChange={(e) => updateFormData("language", e.target.value)}
              className="form-select"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </FormStep>
        )

      case 3:
        return (
          <FormStep
            title="What is your Age?"
            subtitle="Your age determines how much you should consume"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="age-container">
              <div className="age-display">{formData.age}</div>
              <input
                type="range"
                min="13"
                max="100"
                value={formData.age}
                onChange={(e) => updateFormData("age", Number.parseInt(e.target.value))}
                className="age-slider"
              />
            </div>
          </FormStep>
        )

      case 4:
        return (
          <FormStep
            title="What is your gender?"
            subtitle="This will help us calculate your target weight"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="gender-grid">
              <button
                onClick={() => updateFormData("gender", "male")}
                className={`gender-button ${formData.gender === "male" ? "selected" : ""}`}
              >
                <div className="gender-emoji">👨</div>
                <div className="gender-label">Male</div>
              </button>
              <button
                onClick={() => updateFormData("gender", "female")}
                className={`gender-button ${formData.gender === "female" ? "selected" : ""}`}
              >
                <div className="gender-emoji">👩</div>
                <div className="gender-label">Female</div>
              </button>
            </div>
          </FormStep>
        )

      case 5:
        return (
          <FormStep
            title="How Tall are you?"
            subtitle="Your height will help us calculate important body stats to help you reach your goals faster"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="height-container">
              <div className="height-display">
                {formData.height.unit === "cm"
                  ? `${formData.height.value} cm`
                  : `${Math.floor(formData.height.value / 30.48)}'${Math.round((formData.height.value / 2.54) % 12)}"`}
              </div>
              <input
                type="range"
                min="120"
                max="220"
                value={formData.height.value}
                onChange={(e) =>
                  updateFormData("height", {
                    ...formData.height,
                    value: Number.parseInt(e.target.value),
                  })
                }
                className="height-slider"
              />
              <div className="unit-toggle">
                <button
                  onClick={() => updateFormData("height", { ...formData.height, unit: "ft" })}
                  className={`unit-button ${formData.height.unit === "ft" ? "selected" : ""}`}
                >
                  Ft/In
                </button>
                <button
                  onClick={() => updateFormData("height", { ...formData.height, unit: "cm" })}
                  className={`unit-button ${formData.height.unit === "cm" ? "selected" : ""}`}
                >
                  Cm
                </button>
              </div>
            </div>
          </FormStep>
        )

      case 6:
        return (
          <FormStep
            title="What's your current weight?"
            subtitle="This will help us determine your goal and monitor your progress over time"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="weight-container">
              <div className="weight-display">{`${formData.weight.value} ${formData.weight.unit}`}</div>
              <input
                type="range"
                min="30"
                max="200"
                value={formData.weight.value}
                onChange={(e) =>
                  updateFormData("weight", {
                    ...formData.weight,
                    value: Number.parseInt(e.target.value),
                  })
                }
                className="weight-slider"
              />
              <div className="unit-toggle">
                <button
                  onClick={() => updateFormData("weight", { ...formData.weight, unit: "lb" })}
                  className={`unit-button ${formData.weight.unit === "lb" ? "selected" : ""}`}
                >
                  Lb
                </button>
                <button
                  onClick={() => updateFormData("weight", { ...formData.weight, unit: "kg" })}
                  className={`unit-button ${formData.weight.unit === "kg" ? "selected" : ""}`}
                >
                  Kg
                </button>
              </div>
            </div>
          </FormStep>
        )

      case 7:
        return (
          <FormStep
            title="How active are you?"
            subtitle="Based on your lifestyle, we can assess your daily calorie requirements"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="activity-list">
              {[
                {
                  id: "sedentary",
                  title: "Little or no Activity",
                  description: "Mostly sitting through the day (eg. Desk job, Bank Teller)",
                },
                {
                  id: "light",
                  title: "Lightly Active",
                  description: "Mostly standing through the day (Sales floor/teaching)",
                },
                {
                  id: "moderate",
                  title: "Moderately Active",
                  description: "Mostly walking or doing physical activities through the day (ex: retail, waiter)",
                },
                {
                  id: "very",
                  title: "Very Active",
                  description:
                    "Mostly doing heavy physical activities through the day (gym instructor/construction worker)",
                },
              ].map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => updateFormData("activityLevel", activity.id)}
                  className={`activity-button ${formData.activityLevel === activity.id ? "selected" : ""}`}
                >
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-description">{activity.description}</div>
                </button>
              ))}
            </div>
          </FormStep>
        )

      case 8:
        return (
          <FormStep
            title="Any Medical Condition we should be aware of?"
            subtitle="This info will help us guide you to your fitness goals safely and quickly"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="medical-list">
              {[
                "None",
                "Diabetes",
                "Cholesterol",
                "Hypertension",
                "PCOS",
                "Thyroid",
                "Physical injury",
                "Excessive Stress/anxiety",
                "Sleep Issues",
                "Depression",
                "Anger Issues",
                "Loneliness",
                "Relationship Stress",
              ].map((condition) => (
                <label key={condition} className="medical-item">
                  <input
                    type="checkbox"
                    checked={formData.medicalConditions.includes(condition)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData("medicalConditions", [...formData.medicalConditions, condition])
                      } else {
                        updateFormData(
                          "medicalConditions",
                          formData.medicalConditions.filter((c) => c !== condition),
                        )
                      }
                    }}
                    className="medical-checkbox"
                  />
                  <span className="medical-label">{condition}</span>
                </label>
              ))}
            </div>
          </FormStep>
        )

      case 9:
        return (
          <FormStep
            title="How fast do you want to reach your goal?"
            subtitle="This pace will require extreme commitment"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="goal-container">
              <div className="goal-display">
                {`${formData.goalWeight.value} ${formData.goalWeight.unit}/week`}
              </div>
              <input
                type="range"
                min="0.25"
                max="2"
                step="0.25"
                value={formData.goalWeight.value}
                onChange={(e) =>
                  updateFormData("goalWeight", {
                    ...formData.goalWeight,
                    value: Number.parseFloat(e.target.value),
                  })
                }
                className="goal-slider"
              />
              <p className="goal-message">You will reach your goal in about two months</p>
            </div>
          </FormStep>
        )

      case 10:
        return (
          <FormStep
            title="What's your diet preference?"
            subtitle="This will help us customize your meal plans"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleNext}
            onBack={handleBack}
          >
            <div className="diet-grid">
              {[
                { id: "veg", label: "Vegetarian", emoji: "🥗" },
                { id: "non-veg", label: "Non-Vegetarian", emoji: "🍗" },
                { id: "vegan", label: "Vegan", emoji: "🥬" },
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => updateFormData("dietPreference", diet.id)}
                  className={`diet-button ${formData.dietPreference === diet.id ? "selected" : ""}`}
                >
                  <div className="diet-emoji">{diet.emoji}</div>
                  <div className="diet-label">{diet.label}</div>
                </button>
              ))}
            </div>
          </FormStep>
        )

      case 11:
        return (
          <FormStep
            title="How many meals do you prefer per day?"
            subtitle="We'll customize your meal plan accordingly"
            currentStep={currentStep}
            totalSteps={11}
            onNext={handleSubmit}
            onBack={handleBack}
          >
            <div className="meals-container">
              <div className="meals-display">{formData.mealFrequency} meals</div>
              <input
                type="range"
                min="2"
                max="6"
                value={formData.mealFrequency}
                onChange={(e) => updateFormData("mealFrequency", Number.parseInt(e.target.value))}
                className="meals-slider"
              />
              <div className="meals-description">
                {formData.mealFrequency === 3
                  ? "Traditional 3 meals a day"
                  : formData.mealFrequency < 3
                  ? "Intermittent fasting style"
                  : "Multiple small meals throughout the day"}
              </div>
            </div>
          </FormStep>
        )

      default:
        return null
    }
  }

  return <div className="form-wrapper">{renderStep()}</div>
}

export default OnboardingForm