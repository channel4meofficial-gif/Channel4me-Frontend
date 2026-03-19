import React from 'react';

interface VerificationStep {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    icon: string;
}

interface VerificationStepsProps {
    steps: VerificationStep[];
    currentStep: number;
}

const VerificationSteps: React.FC<VerificationStepsProps> = ({ steps, currentStep }) => {
    return (
        <div className="verification-steps-container">
            <h3><i className="fas fa-tasks"></i> Verification Steps</h3>
            {steps.map((step) => (
                <div key={step.id} className="step-item">
                    <div className={`step-icon ${step.status}`}>
                        {step.status === 'completed' ? (
                            <i className="fas fa-check"></i>
                        ) : step.status === 'in_progress' ? (
                            <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                            step.id
                        )}
                    </div>
                    <div>
                        <strong>{step.title}</strong>
                        <div className="step-desc">{step.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VerificationSteps;
