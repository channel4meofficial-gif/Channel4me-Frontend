import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDoctorRegistration } from '../../../context/doctorRegistrationContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import StepIndicator from '../../../components/common/stepIndicator';
import DoctorInfoCard from '../../../components/common/doctorInforCard';
import VerificationSteps from '../../../components/common/verificationSteps';
import '../../../styles/register/doctor/Step3.css';

const DoctorRegisterStep3: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { registrationData, updateVerificationStatus } = useDoctorRegistration();
    const [verificationProgress, setVerificationProgress] = useState(0);
    const [isVerificationComplete, setIsVerificationComplete] = useState(false);
    const [notification, setNotification] = useState<{ message: string; show: boolean }>({ message: '', show: false });

    // Check if user has completed step 2
    useEffect(() => {
        if (!registrationData?.professional) {
            navigate('/doctor/register/step2', {
                state: {
                    from: location.pathname,
                    message: 'Please complete professional information first'
                }
            });
        }
    }, [registrationData, navigate, location]);

    // Start verification simulation with cleanup
    useEffect(() => {
        if (registrationData?.professional && verificationProgress === 0 && !isVerificationComplete) {
            updateVerificationStatus('in_progress', 1);

            const steps = [1, 2, 3];
            let currentStep = 0;

            const interval = setInterval(() => {
                if (currentStep < steps.length) {
                    const progress = ((currentStep + 1) / steps.length) * 100;
                    setVerificationProgress(progress);
                    updateVerificationStatus('in_progress', steps[currentStep]);
                    currentStep++;
                } else {
                    clearInterval(interval);
                    setIsVerificationComplete(true);
                    updateVerificationStatus('verified', 3);

                    // Show notification using React state
                    setNotification({ message: '🎉 Verification complete! Your doctor account is now active.', show: true });
                }
            }, 3000); // 3 seconds per step

            // Cleanup interval on unmount or when verification becomes complete
            return () => {
                clearInterval(interval);
            };
        }
    }, [registrationData, verificationProgress, isVerificationComplete, updateVerificationStatus]);

    // Auto-hide notification after 5 seconds
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification({ message: '', show: false });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const handleGoToLogin = () => {
        navigate('/doctor/login');
    };

    const handleReturnHome = () => {
        navigate('/');
    };

    const steps = [
        { number: 1, label: 'Personal Info' },
        { number: 2, label: 'Professional Info' },
        { number: 3, label: 'Verification' }
    ];

    const verificationSteps: Array<{
        id: number;
        title: string;
        description: string;
        status: 'pending' | 'in_progress' | 'completed';
        icon: string;
    }> = [
        {
            id: 1,
            title: 'Document Verification',
            description: 'Our team is reviewing your uploaded documents (24-48 hours)',
            status: verificationProgress >= 33 ? 'completed' : 'in_progress',
            icon: 'fa-clipboard-check'
        },
        {
            id: 2,
            title: 'License Validation',
            description: 'Verifying your medical license with the relevant authorities',
            status: verificationProgress >= 66 ? 'completed' : verificationProgress >= 33 ? 'in_progress' : 'pending',
            icon: 'fa-id-card'
        },
        {
            id: 3,
            title: 'Profile Approval',
            description: 'Final review and activation of your doctor account',
            status: verificationProgress >= 100 ? 'completed' : verificationProgress >= 66 ? 'in_progress' : 'pending',
            icon: 'fa-user-check'
        }
    ];

    return (
        <PublicLayout>
            <main className="main-content verification-page">
                <div className="container">
                    <div className="registration-wrapper">
                        {/* Notification */}
                        {notification.show && (
                            <div className="verification-notification">
                                <div className="notification-content">
                                    <i className="fas fa-check-circle"></i>
                                    <span>{notification.message}</span>
                                </div>
                            </div>
                        )}

                        <StepIndicator currentStep={3} steps={steps} />

                        <div className="verification-card">
                            <div className={`verification-icon ${isVerificationComplete ? 'verified' : 'in-progress'}`}>
                                <i className={`fas ${isVerificationComplete ? 'fa-check' : 'fa-hourglass-half'}`}></i>
                            </div>

                            <h1>{isVerificationComplete ? 'Verification Complete!' : 'Verification in Progress'}</h1>
                            <p className="subtitle">
                                {isVerificationComplete
                                    ? 'Your doctor account is now active and verified'
                                    : 'Your doctor registration is complete and under review'
                                }
                            </p>

                            {/* Doctor Information */}
                            <DoctorInfoCard
                                doctorName={registrationData?.personal?.fullName || ''}
                                specialization={registrationData?.professional?.specialization || ''}
                                licenseNumber={registrationData?.professional?.license || ''}
                                registrationId={registrationData?.registrationId || 'DOC-0000'}
                                status={isVerificationComplete ? 'Verified' : 'Under Review'}
                                statusColor={isVerificationComplete ? '#22c55e' : '#f59e0b'}
                            />

                            {/* Verification Progress */}
                            {!isVerificationComplete && (
                                <div className="verification-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${verificationProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="progress-text">
                                        {verificationProgress.toFixed(0)}% Complete
                                    </p>
                                </div>
                            )}

                            {/* Verification Steps */}
                            <VerificationSteps
                                steps={verificationSteps}
                                currentStep={Math.floor(verificationProgress / 33) + 1}
                            />

                            {/* What Happens Next */}
                            <div className="next-steps">
                                <h3><i className="fas fa-arrow-right"></i> What Happens Next?</h3>
                                <ul>
                                    <li>You will receive an email confirmation</li>
                                    <li>Our verification team will contact you if needed</li>
                                    <li>Once approved, you'll get access to your doctor dashboard</li>
                                    <li>You can start accepting patient appointments</li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="verification-actions">
                                <button onClick={handleReturnHome} className="btn btn-outline">
                                    <i className="fas fa-home"></i> Return to Home
                                </button>
                                <button onClick={handleGoToLogin} className="btn btn-primary">
                                    <i className="fas fa-user-md"></i> Go to Doctor Login
                                </button>
                            </div>

                            {/* Status Information */}
                            <div className="status-info">
                                <p>
                                    <i className="fas fa-info-circle"></i>
                                    Verification typically takes 1-3 business days
                                </p>
                                <p className="contact-info">
                                    Need help? Contact our verification team at <strong>verification@channel4me.com</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default DoctorRegisterStep3;