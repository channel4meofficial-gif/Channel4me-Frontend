import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDoctorRegistration } from '../../../context/doctorRegistrationContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/register/RegistrationType.css';
import '../../../styles/doctor/sign-up/Step3.css';
import StepIndicator from '../../../components/ui/common/StepIndicator';
import VerificationSteps from '../../../components/ui/common/VerificationSteps';
import DoctorInfoCard from '../../../components/ui/common/DoctorInfoCard';
import config from '../../../config/config';

// ── Helper: parse the lower bound of an experience range string ──────────────
// e.g. "4-7" → 4  |  "20+" → 20  |  "1-3" → 1
const parseExperienceYears = (experience: string): number => {
    if (!experience) return 0;
    if (experience.includes('+')) return parseInt(experience.replace('+', ''), 10);
    const parts = experience.split('-');
    return parseInt(parts[0], 10) || 0;
};

// ── Helper: map frontend medical history checkbox ids → backend enum values ──
const MEDICAL_HISTORY_MAP: Record<string, string> = {
    diabetes: 'Diabetes',
    heart: 'Heart',
    bp: 'High BP',
    allergy: 'Allergies',
    asthma: 'Asthma',
    none: 'None',
};

const DoctorRegisterStep3: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { registrationData, updateVerificationStatus } = useDoctorRegistration();
    const [verificationProgress, setVerificationProgress] = useState(0);
    const [isVerificationComplete, setIsVerificationComplete] = useState(false);
    const [notification, setNotification] = useState<{ message: string; show: boolean; isError?: boolean }>({ message: '', show: false });
    const [apiRegistrationId, setApiRegistrationId] = useState('');
    const hasStartedRef = useRef(false);

    // Redirect to step 2 if professional data is missing
    useEffect(() => {
        if (!registrationData?.professional && registrationData?.verificationStatus !== 'verified') {
            navigate('/doctor/register/step2', {
                state: {
                    from: location.pathname,
                    message: 'Please complete professional information first'
                }
            });
        }
    }, [registrationData?.professional, registrationData?.verificationStatus, navigate, location.pathname]);

    // ── Real API submission ───────────────────────────────────────────────────
    useEffect(() => {
        if (registrationData?.professional && !hasStartedRef.current) {
            hasStartedRef.current = true;

            const submitRegistration = async () => {
                try {
                    // Animate progress to 33%
                    setVerificationProgress(33);

                    const personal = registrationData.personal!;
                    const professional = registrationData.professional!;

                    // Build multipart/form-data payload
                    const formData = new FormData();

                    // ── Personal fields ──────────────────────────────────────
                    formData.append('fullName', personal.fullName);
                    formData.append('email', personal.email);
                    formData.append('mobile', personal.mobile);
                    // Step1 uses <input type="date"> so dob is already "YYYY-MM-DD"
                    formData.append('dateOfBirth', personal.dob);
                    formData.append('gender', personal.gender);
                    formData.append('password', personal.password || '');
                    formData.append('confirmPassword', personal.confirmPassword || '');

                    // ── Professional fields ──────────────────────────────────
                    formData.append('licenseNumber', professional.license);
                    formData.append('specialization', professional.specialization);
                    // yearsOfExperience must be an integer
                    formData.append('yearsOfExperience', String(parseExperienceYears(professional.experience)));
                    // qualifications: may be array or comma-string; append each item separately
                    // qualifications is always string[] from the context type
                    professional.qualifications.forEach(q => formData.append('qualifications', q));
                    formData.append('hospital', professional.hospital);
                    // consultationFee must be whole-number digits only (no decimals)
                    formData.append('consultationFee', Math.floor(professional.fee).toString());
                    if (professional.bio) {
                        formData.append('biography', professional.bio);
                    }

                    // ── Document files ───────────────────────────────────────
                    if (Array.isArray(professional.documents)) {
                        (professional.documents as File[]).forEach(file => {
                            formData.append('documents', file);
                        });
                    }

                    setVerificationProgress(66);

                    // ── POST to backend ──────────────────────────────────────
                    const response = await fetch(`${config.apiBaseUrl}/api/doctor/register`, {
                        method: 'POST',
                        body: formData,
                        // Do NOT set Content-Type — browser sets it automatically
                        // with the correct multipart boundary.
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        // Show validation / server errors
                        const errorMsg = result.errors
                            ? result.errors.join(' | ')
                            : result.message || 'Registration failed. Please try again.';
                        setNotification({ message: `❌ ${errorMsg}`, show: true, isError: true });
                        hasStartedRef.current = false; // allow retry
                        return;
                    }

                    // ── Success ──────────────────────────────────────────────
                    setVerificationProgress(100);
                    setIsVerificationComplete(true);
                    setApiRegistrationId(result.data?.registrationId || '');

                    updateVerificationStatus('verified', 3);

                    // Clear cached form data from localStorage to prevent pre-filling for the next user
                    localStorage.removeItem('doctorPersonalData');
                    localStorage.removeItem('doctorProfessionalData');

                    setNotification({ message: '🎉 Registration submitted! Redirecting to status page...', show: true });

                    setTimeout(() => {
                        navigate('/doctor/pending');
                    }, 2500);

                } catch (err) {
                    console.error('[DoctorStep3] API error:', err);
                    setNotification({
                        message: '❌ Network error. Please check your connection and try again.',
                        show: true,
                        isError: true,
                    });
                    hasStartedRef.current = false;
                }
            };

            submitRegistration();
        }
    }, [registrationData?.professional, updateVerificationStatus, navigate]);

    // Auto-hide notification after 6 seconds
    useEffect(() => {
        if (notification.show && !notification.isError) {
            const timer = setTimeout(() => setNotification({ message: '', show: false }), 6000);
            return () => clearTimeout(timer);
        }
    }, [notification.show, notification.isError]);

    const handleGoToLogin = () => navigate('/login');
    const handleReturnHome = () => navigate('/');

    const verificationSteps = useMemo(() => [
        {
            id: 1,
            title: 'Document Verification',
            description: 'Uploading and validating your documents',
            status: (verificationProgress >= 33 ? 'completed' : 'in_progress') as 'completed' | 'in_progress' | 'pending',
            icon: 'fa-clipboard-check'
        },
        {
            id: 2,
            title: 'License Validation',
            description: 'Verifying your medical license number',
            status: (verificationProgress >= 66 ? 'completed' : verificationProgress >= 33 ? 'in_progress' : 'pending') as 'completed' | 'in_progress' | 'pending',
            icon: 'fa-id-card'
        },
        {
            id: 3,
            title: 'Profile Approval',
            description: 'Saving your profile and sending confirmation email',
            status: (verificationProgress >= 100 ? 'completed' : verificationProgress >= 66 ? 'in_progress' : 'pending') as 'completed' | 'in_progress' | 'pending',
            icon: 'fa-user-check'
        }
    ], [verificationProgress]);

    return (
        <PublicLayout>
            <main className="main-content-register">
                <div className="container">
                    <div className="registration-wrapper-steps">

                        {/* Notification Banner */}
                        {notification.show && (
                            <div className="verification-notification" style={{
                                background: notification.isError ? '#ef4444' : '#10b981',
                                color: 'white',
                                padding: '16px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: notification.isError
                                    ? '0 4px 12px rgba(239,68,68,0.2)'
                                    : '0 4px 12px rgba(16, 185, 129, 0.2)',
                                animation: 'slideDown 0.3s ease-out'
                            }}>
                                <i className={`fas ${notification.isError ? 'fa-exclamation-circle' : 'fa-check-circle'}`} style={{ fontSize: '20px' }}></i>
                                <span style={{ fontWeight: '500' }}>{notification.message}</span>
                            </div>
                        )}

                        {/* Steps Indicator */}
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
                                <h1>{isVerificationComplete ? 'Verification Complete!' : 'Submitting Registration…'}</h1>
                                <p>
                                    {isVerificationComplete
                                        ? 'Your professional doctor account is now active and verified'
                                        : 'Sending your details to the server — please wait'
                                    }
                                </p>
                            </div>

                            {/* Progress Bar */}
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
                                            transition: 'width 0.6s ease'
                                        }}></div>
                                    </div>
                                    <p style={{ color: '#64748b', fontSize: '14px' }}>{verificationProgress.toFixed(0)}% Complete</p>
                                </div>
                            )}

                            {/* Verification Steps List */}
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

                            {/* Doctor summary card after success */}
                            {isVerificationComplete && (
                                <DoctorInfoCard
                                    doctorName={registrationData?.personal?.fullName || ''}
                                    specialization={registrationData?.professional?.specialization || ''}
                                    licenseNumber={registrationData?.professional?.license || ''}
                                    registrationId={apiRegistrationId}
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
                                            <i className="fas fa-info-circle"></i> Please do not close this page while your registration is being submitted.
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