import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import { usePatientRegistration } from '../../../context/patientRegistrationContext';
import { useAuth } from '../../../context/AuthContext';
import { User } from '../../../types/auth';
import '../../../styles/register/RegistrationType.css';
import '../../../styles/patient/sign-up/PatientRegistration.css';
import StepIndicator from '../../../components/ui/common/StepIndicator';
import config from '../../../config/config';

// ── Medical history: frontend checkbox id → backend enum value ───────────────
const MEDICAL_HISTORY_MAP: Record<string, string> = {
    diabetes: 'Diabetes',
    heart: 'Heart',
    bp: 'High BP',
    allergy: 'Allergies',
    asthma: 'Asthma',
};

const PatientStep3: React.FC = () => {
    const navigate = useNavigate();
    const { data } = usePatientRegistration();
    const { login } = useAuth();

    const [memberId, setMemberId] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    // Prevent the API from being called twice in React 18 Strict Mode
    // (which intentionally mounts → unmounts → re-mounts components in dev).
    const hasStartedRef = useRef(false);

    useEffect(() => {
        if (hasStartedRef.current) return; // already running or done — skip
        hasStartedRef.current = true;

        const registerPatient = async () => {
            try {
                const personal = data.personal;
                const health = data.health;

                if (!personal || !health) {
                    setErrorMessage('Registration data is incomplete. Please go back and fill in all steps.');
                    setIsLoading(false);
                    return;
                }

                // ── Build ISO date string from separate day/month/year fields ────
                // Month from context is 1-indexed (January = 1), zero-pad for ISO
                const month = String(personal.dob?.month ?? '').padStart(2, '0');
                const day = String(personal.dob?.day ?? '').padStart(2, '0');
                const year = String(personal.dob?.year ?? '');
                const dateOfBirth = `${year}-${month}-${day}`; // "YYYY-MM-DD"

                // ── Map medical history checkbox ids → backend enum values ────────
                // If no checkboxes selected (user chose "none" or nothing), send ["None"]
                const mappedHistory: string[] = health.medicalHistory && health.medicalHistory.length > 0
                    ? health.medicalHistory.map((id: string) => MEDICAL_HISTORY_MAP[id] ?? id)
                    : ['None'];

                // ── Build JSON body with exact backend field names ────────────────
                const body = {
                    // Personal
                    fullName: personal.fullName,
                    email: personal.email,
                    dateOfBirth,
                    mobile: personal.mobile,
                    password: personal.password,
                    confirmPassword: personal.confirmPassword,
                    agreeTerms: personal.terms,     // frontend "terms" → backend "agreeTerms"

                    // Health profile
                    gender: health.gender,
                    bloodType: health.bloodType,
                    height: parseFloat(health.height),
                    weight: parseFloat(health.weight),
                    medicalHistory: mappedHistory,
                    currentMedications: health.medications || '',  // "medications" → "currentMedications"
                    emergencyContactName: health.emergencyName || '',  // "emergencyName" → "emergencyContactName"
                    emergencyPhone: health.emergencyPhone || '',
                    additionalHealthNotes: health.healthNotes || '',  // "healthNotes" → "additionalHealthNotes"
                };

                // ── POST to backend ──────────────────────────────────────────────
                const response = await fetch(`${config.apiBaseUrl}/api/patient/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                const result = await response.json();

                if (!response.ok) {
                    const errorMsg = result.errors
                        ? result.errors.join(' | ')
                        : result.message || 'Registration failed. Please try again.';
                    setErrorMessage(errorMsg);
                    setIsLoading(false);
                    return;
                }

                // ── Success: use real data from API response ──────────────────
                const apiMemberId = result.data?.['Member ID'] || '';
                const apiCreatedAt = result.data?.['Account Created'] || '';
                const apiPatientName = result.data?.['Patient Name'] || personal.fullName;
                const apiEmail = result.data?.['Email'] || personal.email;

                setMemberId(apiMemberId);

                if (apiCreatedAt) {
                    const dateObj = new Date(apiCreatedAt);
                    setCreatedDate(dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
                } else {
                    setCreatedDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
                }

                setIsSuccess(true);
                setIsLoading(false);

                // Auto-login using the verified data returned from the API
                const dobYear = personal.dob?.year ? parseInt(personal.dob.year, 10) : 0;
                const age = dobYear ? new Date().getFullYear() - dobYear : 25;

                const authedUser: User = {
                    id: apiMemberId || 'PAT-' + Math.random().toString(36).substr(2, 9),
                    name: apiPatientName,
                    email: apiEmail,
                    role: 'patient',
                    age,
                    location: 'Colombo, Sri Lanka',
                    guardianName: health.emergencyName || 'Emergency Contact',
                    contactNumber: health.emergencyPhone || personal.mobile || '0771234567',
                    appointments: [
                        {
                            id: 'new-apt-1',
                            doctorName: 'Dr. Kamal',
                            specialization: 'General Physician',
                            date: '2026-04-05',
                            time: '11:00 AM',
                            status: 'upcoming'
                        }
                    ]
                };
                login(authedUser, 'jwt-token-patient');

            } catch (err) {
                console.error('[PatientStep3] API error:', err);
                setErrorMessage('Network error. Please check your connection and try again.');
                setIsLoading(false);
            }
        };

        registerPatient();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGoToDashboard = () => navigate('/patient/dashboard');
    const handleFindDoctors = () => navigate('/doctors');
    const handleGoBack = () => navigate('/patient/register/step2');

    // ── Loading State ─────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <PublicLayout>
                <main className="main-content-register">
                    <div className="container">
                        <div className="registration-wrapper-steps">
                            <StepIndicator
                                currentStep={3}
                                steps={[
                                    { number: 1, label: 'Personal Info' },
                                    { number: 2, label: 'Health Profile' },
                                    { number: 3, label: 'Complete' }
                                ]}
                            />
                            <div className="registration-form-container" style={{ textAlign: 'center', padding: '60px 24px' }}>
                                <i className="fas fa-spinner fa-spin" style={{ fontSize: '48px', color: '#667eea', marginBottom: '24px' }}></i>
                                <h2 style={{ color: '#1e293b', marginBottom: '12px' }}>Creating Your Account…</h2>
                                <p style={{ color: '#64748b' }}>Please wait while we save your information securely.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </PublicLayout>
        );
    }

    // ── Error State ───────────────────────────────────────────────────────────
    if (errorMessage) {
        return (
            <PublicLayout>
                <main className="main-content-register">
                    <div className="container">
                        <div className="registration-wrapper-steps">
                            <StepIndicator
                                currentStep={3}
                                steps={[
                                    { number: 1, label: 'Personal Info' },
                                    { number: 2, label: 'Health Profile' },
                                    { number: 3, label: 'Complete' }
                                ]}
                            />
                            <div className="registration-form-container" style={{ textAlign: 'center', padding: '40px 24px' }}>
                                <div style={{
                                    width: '80px', height: '80px',
                                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', color: 'white', fontSize: '36px',
                                    margin: '0 auto 24px'
                                }}>
                                    <i className="fas fa-exclamation-triangle"></i>
                                </div>
                                <h2 style={{ color: '#1e293b', marginBottom: '12px' }}>Registration Failed</h2>
                                <div style={{
                                    background: '#fef2f2', border: '1px solid #fecaca',
                                    borderRadius: '12px', padding: '16px', margin: '20px 0', textAlign: 'left'
                                }}>
                                    <p style={{ color: '#dc2626', fontSize: '14px' }}>{errorMessage}</p>
                                </div>
                                <button className="btn btn-primary" onClick={handleGoBack} style={{ width: '100%' }}>
                                    <i className="fas fa-arrow-left"></i> Go Back &amp; Fix Errors
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </PublicLayout>
        );
    }

    // ── Success State ─────────────────────────────────────────────────────────
    return (
        <PublicLayout>
            <main className="main-content-register">
                <div className="container">
                    <div className="registration-wrapper-steps">

                        <StepIndicator
                            currentStep={3}
                            steps={[
                                { number: 1, label: 'Personal Info' },
                                { number: 2, label: 'Health Profile' },
                                { number: 3, label: 'Complete' }
                            ]}
                        />

                        <div className="registration-form-container" style={{ textAlign: 'center' }}>
                            <div className="success-icon" style={{
                                width: '80px', height: '80px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                borderRadius: '50%', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', color: 'white', fontSize: '40px',
                                margin: '0 auto 24px',
                                boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)'
                            }}>
                                <i className="fas fa-check"></i>
                            </div>

                            <div className="form-header">
                                <h1>Registration Complete!</h1>
                                <p>Welcome to Channel4Me. You are now signed in to your patient account.</p>
                            </div>

                            {/* Account summary — real data from API */}
                            <div className="account-info" style={{
                                background: '#f8fafc', borderRadius: '16px',
                                padding: '24px', margin: '30px 0', textAlign: 'left'
                            }}>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Status:</span>
                                    <span className="info-value" style={{ color: '#10b981', fontWeight: '700' }}>✓ Signed In</span>
                                </div>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Patient Name:</span>
                                    <span className="info-value" style={{ color: '#1e293b', fontWeight: '600' }}>{data.personal?.fullName || 'Loading...'}</span>
                                </div>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Email:</span>
                                    <span className="info-value" style={{ color: '#1e293b', fontWeight: '600' }}>{data.personal?.email || 'Loading...'}</span>
                                </div>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Account Created:</span>
                                    <span className="info-value" style={{ color: '#1e293b', fontWeight: '600' }}>{createdDate || 'Today'}</span>
                                </div>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="info-label" style={{ color: '#64748b', fontWeight: '500' }}>Member ID:</span>
                                    <span className="info-value" style={{ color: '#667eea', fontWeight: '700' }}>{memberId || 'CH4M-0000'}</span>
                                </div>
                            </div>

                            <h3 style={{ textAlign: 'left', fontSize: '18px', marginBottom: '20px', color: '#1e293b' }}>Get Started</h3>

                            <div className="next-steps" style={{
                                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '16px', marginBottom: '30px'
                            }}>
                                <div className="step-card" onClick={handleGoToDashboard} style={{
                                    padding: '20px', border: '2px solid #edf2f7',
                                    borderRadius: '16px', cursor: 'pointer',
                                    transition: 'all 0.3s', textAlign: 'left'
                                }}>
                                    <i className="fas fa-tachometer-alt" style={{ fontSize: '24px', color: '#667eea', marginBottom: '12px' }}></i>
                                    <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>Go to Dashboard</h3>
                                    <p style={{ fontSize: '12px', color: '#64748b' }}>Access your health records and appointments</p>
                                </div>
                                <div className="step-card" onClick={handleFindDoctors} style={{
                                    padding: '20px', border: '2px solid #edf2f7',
                                    borderRadius: '16px', cursor: 'pointer',
                                    transition: 'all 0.3s', textAlign: 'left'
                                }}>
                                    <i className="fas fa-user-md" style={{ fontSize: '24px', color: '#667eea', marginBottom: '12px' }}></i>
                                    <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>Find Doctors</h3>
                                    <p style={{ fontSize: '12px', color: '#64748b' }}>Browse and book with specialists</p>
                                </div>
                            </div>

                            <div className="actions">
                                <button className="btn btn-primary btn-full" onClick={handleGoToDashboard} style={{ width: '100%', marginBottom: '12px' }}>
                                    <i className="fas fa-rocket"></i> Go to Your Dashboard
                                </button>
                                <button className="btn btn-outline" onClick={() => navigate('/')} style={{ width: '100%' }}>
                                    <i className="fas fa-home"></i> Return to Homepage
                                </button>
                            </div>

                            <div className="security-note" style={{
                                marginTop: '30px', padding: '16px',
                                background: '#eff6ff', borderRadius: '12px',
                                color: '#1d4ed8', fontSize: '13px'
                            }}>
                                <p><i className="fas fa-shield-alt"></i> You are automatically signed in. Your session is secured.</p>
                                <p style={{ marginTop: '8px', opacity: 0.8 }}>A confirmation email has been sent to your registered email address.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default PatientStep3;