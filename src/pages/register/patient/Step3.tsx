import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientRegistration } from '../../../context/patientRegistrationContext';
import '../../../styles/register/patient/PatientRegistration.css';

const PatientStep3: React.FC = () => {
    const navigate = useNavigate();
    const { data } = usePatientRegistration();
    const [memberId, setMemberId] = useState('');
    const [createdDate, setCreatedDate] = useState('');

    useEffect(() => {
        setMemberId('CH4M-' + Math.floor(1000 + Math.random() * 9000));
        const now = new Date();
        setCreatedDate(now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    }, []);

    const handleGoToDashboard = () => navigate('/patient/dashboard');
    const handleFindDoctors = () => navigate('/doctors');
    const handleHealthProfile = () => navigate('/patient/health-profile');
    const handleBookAppointment = () => navigate('/patient/book-appointment');

    return (
        <div className="container">
            <div className="registration-wrapper">
                <div className="steps">
                    <div className="step completed">
                        <div className="step-number">1</div>
                        <div className="step-label">Personal Info</div>
                    </div>
                    <div className="step completed">
                        <div className="step-number">2</div>
                        <div className="step-label">Health Profile</div>
                    </div>
                    <div className="step active">
                        <div className="step-number">3</div>
                        <div className="step-label">Complete</div>
                    </div>
                </div>

                <div className="success-card">
                    <div className="success-icon">
                        <i className="fas fa-check"></i>
                    </div>
                    <h1>Registration Complete!</h1>
                    <p className="subtitle">Welcome to Channel4Me. You are now signed in to your patient account.</p>

                    <div className="account-info">
                        <div className="info-item">
                            <span className="info-label">Status:</span>
                            <span className="info-value" style={{ color: '#22c55e' }}>✓ Signed In</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Patient Name:</span>
                            <span className="info-value">{data.personal?.fullName || 'Loading...'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{data.personal?.email || 'Loading...'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Account Created:</span>
                            <span className="info-value">{createdDate || 'Today'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Member ID:</span>
                            <span className="info-value">{memberId || 'CH4M-0000'}</span>
                        </div>
                    </div>

                    <h3 style={{ textAlign: 'left', fontSize: '16px', margin: '25px 0 15px', color: '#1e293b' }}>Get Started</h3>
                    <div className="next-steps">
                        <div className="step-card" onClick={handleGoToDashboard}>
                            <i className="fas fa-tachometer-alt"></i>
                            <h3>Go to Dashboard</h3>
                            <p>Access your health dashboard and medical records</p>
                        </div>
                        <div className="step-card" onClick={handleFindDoctors}>
                            <i className="fas fa-user-md"></i>
                            <h3>Find Doctors</h3>
                            <p>Browse and book appointments with specialists</p>
                        </div>
                        <div className="step-card" onClick={handleHealthProfile}>
                            <i className="fas fa-heartbeat"></i>
                            <h3>Health Profile</h3>
                            <p>Complete your health information for better care</p>
                        </div>
                        <div className="step-card" onClick={handleBookAppointment}>
                            <i className="fas fa-calendar-check"></i>
                            <h3>Book Appointment</h3>
                            <p>Schedule your first consultation with a doctor</p>
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn btn-primary btn-full" onClick={handleGoToDashboard}>
                            <i className="fas fa-rocket"></i> Go to Your Dashboard
                        </button>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/')}>
                            <i className="fas fa-home"></i> Return to Homepage
                        </button>
                    </div>

                    <div className="security-note">
                        <p><i className="fas fa-shield-alt"></i> You are automatically signed in. Your session is secured.</p>
                        <p style={{ marginTop: '8px', fontSize: '12px' }}>A confirmation email has been sent to your registered email address.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientStep3;