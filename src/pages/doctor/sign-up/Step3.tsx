import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDoctorRegistration } from '../../../context/doctorRegistrationContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/register/RegistrationType.css';      // global registration styles
import '../../../styles/doctor/sign-up/Step3.css';
import StepIndicator from '../../../components/ui/common/StepIndicator';
import VerificationSteps from '../../../components/ui/common/VerificationSteps';
import DoctorInfoCard from '../../../components/ui/common/DoctorInfoCard';

const DoctorRegisterStep3: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { registrationData, updateVerificationStatus } = useDoctorRegistration();
    const [verificationProgress, setVerificationProgress] = useState(0);
    const [isVerificationComplete, setIsVerificationComplete] = useState(false);
    const [notification, setNotification] = useState<{ message: string; show: boolean }>({ message: '', show: false });
    const hasStartedRef = useRef(false);

    // Check if user has completed step 2
    useEffect(() => {
        // Only redirect if we ARE NOT already verified and have NO professional data
        if (!registrationData?.professional && registrationData?.verificationStatus !== 'verified') {
            console.log('Redirecting to step 2 - data missing');
            navigate('/doctor/register/step2', {
                state: {
                    from: location.pathname,
                    message: 'Please complete professional information first'
                }
            });
        }
    }, [registrationData?.professional, registrationData?.verificationStatus, navigate, location.pathname]);

    // Start verification simulation
    useEffect(() => {
        // Only start if we have professional data and haven't started yet
        if (registrationData?.professional && !hasStartedRef.current) {
            hasStartedRef.current = true;
            console.log('Starting verification simulation with real context...');
            
            let currentIdx = 0;
            const steps = [1, 2, 3];

            const interval = setInterval(() => {
                currentIdx++;
                console.log(`Simulation tick: ${currentIdx}`);
                
                if (currentIdx < steps.length) {
                    const progress = ((currentIdx + 1) / steps.length) * 100;
                    setVerificationProgress(progress);
                } else {
                    console.log('Simulation complete!');
                    clearInterval(interval);
                    setIsVerificationComplete(true);
                    setNotification({ message: '🎉 Registration submitted! Redirecting to status page...', show: true });
                    
                    // Update context
                    updateVerificationStatus('verified', 3);

                    // Redirect to pending approval page after a short delay
                    setTimeout(() => {
                        navigate('/doctor/pending');
                    }, 2000);
                }
            }, 2500);

            return () => {
                console.log('Cleaning up simulation interval');
                clearInterval(interval);
            };
        }
    }, [registrationData?.professional, updateVerificationStatus]);

    // Auto-hide notification
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification({ message: '', show: false });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const handleGoToLogin = () => navigate('/login');
    const handleReturnHome = () => navigate('/');

    const verificationSteps = useMemo(() => [
        {
            id: 1,
            title: 'Document Verification',
            description: 'Our team is reviewing your uploaded documents',
            status: (verificationProgress >= 33 ? 'completed' : 'in_progress') as 'completed' | 'in_progress' | 'pending',
            icon: 'fa-clipboard-check'
        },
        {
            id: 2,
            title: 'License Validation',
            description: 'Verifying your medical license with authorities',
            status: (verificationProgress >= 66 ? 'completed' : verificationProgress >= 33 ? 'in_progress' : 'pending') as 'completed' | 'in_progress' | 'pending',
            icon: 'fa-id-card'
        },
        {
            id: 3,
            title: 'Profile Approval',
            description: 'Final review and activation of your account',
            status: (verificationProgress >= 100 ? 'completed' : verificationProgress >= 66 ? 'in_progress' : 'pending') as 'completed' | 'in_progress' | 'pending',
            icon: 'fa-user-check'
        }
    ], [verificationProgress]);

    return (
        <PublicLayout>
            <main className="main-content-register">
                <div className="container">
                    <div className="registration-wrapper-steps">
                        
                        {/* Notification */}
                        {notification.show && (
                            <div className="verification-notification" style={{ 
                                background: '#10b981', 
                                color: 'white', 
                                padding: '16px', 
                                borderRadius: '12px', 
                                marginBottom: '20px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                                animation: 'slideDown 0.3s ease-out'
                            }}>
                                <i className="fas fa-check-circle" style={{ fontSize: '20px' }}></i>
                                <span style={{ fontWeight: '500' }}>{notification.message}</span>
                            </div>
                        )}

                        {/* Steps indicator */}
                        <StepIndicator 
                            currentStep={3} 
                            steps={[
                                { number: 1, label: 'Personal Info' },
                                { number: 2, label: 'Professional Info' },
                                { number: 3, label: 'Verification' }
                            ]} 
                        />

                        {/* Verification Container */}
                        <div className="registration-form-container" style={{ textAlign: 'center' }}>
                            <div className={`verification-icon ${isVerificationComplete ? 'verified' : 'in-progress'}`} style={{
                                width: '80px',
                                height: '80px',
                                background: isVerificationComplete 
                                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '40px',
                                margin: '0 auto 24px',
                                boxShadow: isVerificationComplete 
                                    ? '0 10px 20px rgba(16, 185, 129, 0.2)' 
                                    : '0 10px 20px rgba(102, 126, 234, 0.2)'
                            }}>
                                <i className={`fas ${isVerificationComplete ? 'fa-check' : 'fa-hourglass-half'}`}></i>
                            </div>

                            <div className="form-header">
                                <h1>{isVerificationComplete ? 'Verification Complete!' : 'Verification in Progress'}</h1>
                                <p>
                                    {isVerificationComplete
                                        ? 'Your professional doctor account is now active and verified'
                                        : 'Your registration is complete and currently under review'
                                    }
                                </p>
                            </div>

                            {/* Verification Progress Bar */}
                            {!isVerificationComplete && (
                                <div style={{ margin: '30px 0' }}>
                                    <div style={{ 
                                        height: '8px', 
                                        background: '#edf2f7', 
                                        borderRadius: '4px', 
                                        overflow: 'hidden', 
                                        marginBottom: '10px' 
                                    }}>
                                        <div style={{ 
                                            width: `${verificationProgress}%`, 
                                            height: '100%', 
                                            background: '#667eea', 
                                            transition: 'width 0.5s ease' 
                                        }}></div>
                                    </div>
                                    <p style={{ color: '#64748b', fontSize: '14px' }}>{verificationProgress.toFixed(0)}% Complete</p>
                                </div>
                            )}

                            {/* Verification List */}
                            <div style={{ margin: '30px 0', textAlign: 'left' }}>
                                <VerificationSteps 
                                    steps={verificationSteps.map(s => ({
                                        id: s.id,
                                        title: s.title,
                                        description: s.description,
                                        status: s.status as 'pending' | 'in_progress' | 'completed',
                                        icon: s.icon
                                    }))} 
                                    currentStep={3} 
                                />
                            </div>

                            {/* Doctor summary if verified */}
                            {isVerificationComplete && (
                                <DoctorInfoCard 
                                    doctorName={registrationData?.personal?.fullName || ''}
                                    specialization={registrationData?.professional?.specialization || ''}
                                    licenseNumber={registrationData?.professional?.license || ''}
                                    registrationId={`REG-${Math.floor(100000 + Math.random() * 900000)}`}
                                    status="VERIFIED"
                                    statusColor="#10b981"
                                />
                            )}

                            {/* Action Buttons */}
                            <div className="actions" style={{ marginTop: '30px' }}>
                                {isVerificationComplete ? (
                                    <button onClick={handleGoToLogin} className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
                                        <i className="fas fa-user-md"></i> Go to Your Login
                                    </button>
                                ) : (
                                    <div style={{ padding: '20px', background: '#fffbeb', borderRadius: '12px', marginBottom: '20px', border: '1px solid #fef3c7' }}>
                                        <p style={{ color: '#92400e', fontSize: '13px' }}>
                                            <i className="fas fa-info-circle"></i> Verification typically takes 1-3 business days. We will notify you via email.
                                        </p>
                                    </div>
                                )}
                                <button onClick={handleReturnHome} className="btn btn-outline" style={{ width: '100%' }}>
                                    <i className="fas fa-home"></i> Return to Homepage
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default DoctorRegisterStep3;