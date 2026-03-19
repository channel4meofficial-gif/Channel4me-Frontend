import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import { usePatientRegistration } from '../../../context/patientRegistrationContext';
import { useAuth } from '../../../context/AuthContext';
import { User } from '../../../types/auth';
import '../../../styles/register/RegistrationType.css';
import '../../../styles/patient/sign-up/PatientRegistration.css'; // patient-specific styles
import StepIndicator from '../../../components/ui/common/StepIndicator';

const PatientStep3: React.FC = () => {
    const navigate = useNavigate();
    const { data } = usePatientRegistration();
    const { login, isAuthenticated } = useAuth();
    const [memberId, setMemberId] = useState('');
    const [createdDate, setCreatedDate] = useState('');

    useEffect(() => {
        setMemberId('CH4M-' + Math.floor(1000 + Math.random() * 9000));
        const now = new Date();
        setCreatedDate(now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
        
        // Auto-login on mount for Patient Step 3 if not already authenticated
        if (!isAuthenticated) {
            const mockUser: User = {
                id: 'PAT-' + Math.random().toString(36).substr(2, 9),
                name: data.personal?.fullName || 'Patient User',
                email: data.personal?.email || '',
                role: 'patient',
                age: data.personal?.dob?.year ? (new Date().getFullYear() - parseInt(data.personal.dob.year)) : 25,
                location: 'Colombo, Sri Lanka',
                guardianName: data.health?.emergencyName || 'Emergency Contact Person',
                contactNumber: data.health?.emergencyPhone || data.personal?.mobile || '0771234567',
                memberId: 'CH4M-' + Math.floor(1000 + Math.random() * 9000), // temp fallback
                createdDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
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
            login(mockUser, 'mock-jwt-token-patient');
        }
    }, [data.personal, login, isAuthenticated]);

    const handleGoToDashboard = () => {
        console.log('Navigating to dashboard, authenticated:', isAuthenticated);
        navigate('/patient/dashboard');
    };
    const handleFindDoctors = () => navigate('/doctors');
    const handleReturnHome = () => {
        console.log('Returning to homepage');
        navigate('/');
    };

    return (
        <PublicLayout>
            <main className="main-content-register">
                <div className="container">
                    <div className="registration-wrapper-steps">
                        
                        {/* Steps Indicator */}
                        <StepIndicator 
                            currentStep={3} 
                            steps={[
                                { number: 1, label: 'Personal Info' },
                                { number: 2, label: 'Health Profile' },
                                { number: 3, label: 'Complete' }
                            ]} 
                        />
                        
                        {/* Success Container */}
                        <div className="registration-form-container" style={{ textAlign: 'center' }}>
                            <div className="success-icon" style={{ 
                                width: '80px', 
                                height: '80px', 
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                                borderRadius: '50%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                color: 'white', 
                                fontSize: '40px', 
                                margin: '0 auto 24px',
                                boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)'
                            }}>
                                <i className="fas fa-check"></i>
                            </div>
                            
                            <div className="form-header">
                                <h1>Registration Complete!</h1>
                                <p>Welcome to Channel4Me. You are now signed in to your patient account.</p>
                            </div>
                            
                            <div className="account-info" style={{ 
                                background: '#f8fafc', 
                                borderRadius: '16px', 
                                padding: '24px', 
                                margin: '30px 0',
                                textAlign: 'left'
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
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(2, 1fr)', 
                                gap: '16px',
                                marginBottom: '30px'
                            }}>
                                <div 
                                    className="step-card" 
                                    onClick={handleGoToDashboard}
                                    style={{ 
                                        padding: '20px', 
                                        border: '2px solid #edf2f7', 
                                        borderRadius: '16px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        textAlign: 'left'
                                    }}
                                >
                                    <i className="fas fa-tachometer-alt" style={{ fontSize: '24px', color: '#667eea', marginBottom: '12px' }}></i>
                                    <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>Go to Dashboard</h3>
                                    <p style={{ fontSize: '12px', color: '#64748b' }}>Access your health records and appointments</p>
                                </div>
                                <div 
                                    className="step-card" 
                                    onClick={handleFindDoctors}
                                    style={{ 
                                        padding: '20px', 
                                        border: '2px solid #edf2f7', 
                                        borderRadius: '16px', 
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        textAlign: 'left'
                                    }}
                                >
                                    <i className="fas fa-user-md" style={{ fontSize: '24px', color: '#667eea', marginBottom: '12px' }}></i>
                                    <h3 style={{ fontSize: '15px', marginBottom: '6px' }}>Find Doctors</h3>
                                    <p style={{ fontSize: '12px', color: '#64748b' }}>Browse and book with specialists</p>
                                </div>
                            </div>
                            
                            <div className="actions">
                                <button className="btn btn-primary btn-full" onClick={handleGoToDashboard} style={{ width: '100%', marginBottom: '12px' }}>
                                    <i className="fas fa-rocket"></i> Go to Your Dashboard
                                </button>
                                <button className="btn btn-outline" onClick={handleReturnHome} style={{ width: '100%' }}>
                                    <i className="fas fa-home"></i> Return to Homepage
                                </button>
                            </div>
                            
                            <div className="security-note" style={{ 
                                marginTop: '30px', 
                                padding: '16px', 
                                background: '#eff6ff', 
                                borderRadius: '12px',
                                color: '#1d4ed8',
                                fontSize: '13px'
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