"use client";
import { CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StepNewPassword from "./_components/step-new-password";
import StepSecretQuestion from "./_components/step-secret-question";
import StepUserName from "./_components/step-username";

const steps = [
  {
    title: "Username",
    description: "Enter your username to reset your password.",
  },
  {
    title: "Secret Question",
    description: "Answer your secret question to reset your password.",
  },
  {
    title: "New Password",
    description: "Choose a new password for your account.",
  },
];

export default function RestPassword() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0);
  const [secretQuestion, setSecretQuestion] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-md w-full flex flex-col space-y-6">
        <h2 className="text-4xl font-bold border-b pb-2">
          Reset Password
        </h2>
        <div className="flex space-x-16 mt-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= activeStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <CheckCircleIcon />
            </div>
          ))}
        </div>

        <div className="w-full">
          <h3 className="text-2xl font-semibold">
            {steps[activeStep].title}
          </h3>
          <p className="text-lg">{steps[activeStep].description}</p>
        </div>

        <div className="w-full">
          {activeStep === 0 && (
            <StepUserName
              onNext={(secretQuestion, username) => {
                setSecretQuestion(secretQuestion);
                setUsername(username);
                setActiveStep(activeStep+1);
              }}
            />
          )}
          {activeStep === 1 && (
            <StepSecretQuestion
              username={username}
              secretQuestion={secretQuestion}
              onNext={() => setActiveStep(activeStep+1)}
              onPrev={() => setActiveStep(activeStep-1)}
            />
          )}
          {activeStep === 2 && (
            <StepNewPassword
              username={username}
              onNext={() => router.push("/auth")}
              onPrev={() => setActiveStep(activeStep-1)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
