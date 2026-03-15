import React from 'react';

interface Step {
    number: number;
    label: string;
}

interface StepIndicatorProps {
    currentStep: number;
    steps: Step[];
    className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
    currentStep, 
    steps, 
    className = '' 
}) => {
    return (
        <div className={`steps ${className}`}>
            {steps.map((step) => {
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;
                
                return (
                    <div 
                        key={step.number} 
                        className={`step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                    >
                        <div className="step-number">{step.number}</div>
                        <div className="step-label">{step.label}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default StepIndicator;