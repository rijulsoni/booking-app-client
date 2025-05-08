import React from "react";
import { Check, CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";


interface Step {
  id: number;
  name: string;
}

interface CheckoutStepperProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
  steps,
  currentStep,
  setCurrentStep,
}) => {

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;
  
  return (
    <div className="mb-8 px-4 py-4">
      {/* Progress bar */}
      <div className="relative mb-4">
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-gray-100"
        />
      </div>
      
      {/* Steps */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          // Determine step status
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <motion.div 
              key={step.id}
              className="flex flex-col items-center space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative">
                {/* Step indicator */}
                <button
                  type="button"
                  onClick={() => index < currentStep && index !== 3 && setCurrentStep(index)}
                  disabled={!isCompleted || index === 3} // Don't allow skipping to confirmation
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200",
                    isActive && "border-[#1A365D] text-[#1A365D]",
                    isCompleted && "bg-[#1A365D] border-[#1A365D] text-white",
                    !isActive && !isCompleted && "border-gray-300 text-gray-400",
                    isCompleted && "cursor-pointer hover:bg-[#1A365D]"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </button>
                
                {/* Active step animation */}
                {isActive && (
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-hotel-primary opacity-50"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 0.5, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                )}
              </div>
              
              {/* Step name */}
              <span 
                className={cn(
                  "text-xs font-medium",
                  isActive && "text-hotel-primary font-semibold",
                  isCompleted && "text-hotel-primary",
                  !isActive && !isCompleted && "text-gray-500"
                )}
              >
                {step.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
