import { ArrowLeft, ArrowRight } from "lucide-react"
import './FormStep.css'

function FormStep({ title, subtitle, currentStep, totalSteps, onNext, onBack, children }) {
  return (
    <div className="form-step-container">
      <div className="form-step-inner">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        <div className="step-content">
          <h1 className="step-title">{title}</h1>
          {subtitle && <p className="step-subtitle">{subtitle}</p>}
          {children}
        </div>

        <div className="step-navigation">
          {currentStep > 1 ? (
            <button onClick={onBack} className="back-button">
              <ArrowLeft className="button-icon button-icon-left" />
              Back
            </button>
          ) : (
            <div />
          )}

          <button onClick={onNext} className="next-button">
            {currentStep === totalSteps ? "Get Started" : "Continue"}
            <ArrowRight className="button-icon button-icon-right" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormStep