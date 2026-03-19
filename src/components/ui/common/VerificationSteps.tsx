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
        <div className="verification-steps-container" style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
        }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
                <i className="fas fa-tasks" style={{ marginRight: '10px' }}></i> Verification Steps
            </h3>
            <div className="verification-steps-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {steps.map((step) => (
                    <div key={step.id} className="step-item" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div className={`step-icon ${step.status}`} style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: '700',
                            flexShrink: 0,
                            background: step.status === 'completed' ? '#10b981' : step.status === 'in_progress' ? '#667eea' : '#f1f5f9',
                            color: step.status === 'pending' ? '#94a3b8' : 'white'
                        }}>
                            {step.status === 'completed' ? (
                                <i className="fas fa-check"></i>
                            ) : step.status === 'in_progress' ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                step.id
                            )}
                        </div>
                        <div className="step-content">
                            <strong style={{ display: 'block', fontSize: '15px', color: '#1e293b', marginBottom: '4px' }}>{step.title}</strong>
                            <div className="step-desc" style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>{step.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerificationSteps;
