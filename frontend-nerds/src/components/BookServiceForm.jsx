import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const BookServiceForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({}); // stores all collected data

  const handleNext = (data) => {
    setForm((prev) => ({ ...prev, ...data })); // merge new data
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  return (
    <>
      {step === 1 && <StepOne onNext={handleNext} step={step} />}
      {step === 2 && (
        <StepTwo
          onNext={handleNext}
          form={form}
          step={step}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <StepThree
          step={step}
          form={form} // ✅ Pass collected form data
          onBack={handleBack}
        />
      )}
    </>
  );
};

export default BookServiceForm;
