// src/pages/register/RegistrationType.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout/publiclayout'; 
import '../styles/register/RegistrationType.css'; 

const RegistrationType: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient'>('doctor');

    const handleRoleSelect = (role: 'doctor' | 'patient') => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        if (selectedRole === 'doctor') {
            navigate('/doctor/register/step1');   // absolute path
        } else {
            navigate('/patient/register/step1');  // absolute path
        }
        };

    const handleLogin = () => {
        navigate('/login');
    };

    const features = [
        {
            icon: 'fas fa-brain',
            title: 'AI-Powered Doctor Matching',
            description: 'Our AI analyzes symptoms and matches you with the perfect specialist in seconds.'
        },
        {
            icon: 'fas fa-calendar-check',
            title: 'Instant Appointment Booking',
            description: 'Book appointments with verified doctors instantly. No waiting, no hassle.'
        },
        {
            icon: 'fas fa-file-medical-alt',
            title: 'Secure Health Reports',
            description: 'Upload and analyze health reports with complete privacy and security.'
        },
        {
            icon: 'fas fa-user-md',
            title: '500+ Verified Doctors',
            description: 'Connect with top-rated specialists across various medical fields.'
        }
    ];

    const roles = [
        {
            id: 'doctor',
            icon: 'fas fa-user-md',
            title: 'Healthcare Provider',
            description: 'Join our network of medical professionals',
            cardClass: 'doctor-card'
        },
        {
            id: 'patient',
            icon: 'fas fa-user',
            title: 'Patient',
            description: 'Find and book healthcare providers easily',
            cardClass: 'patient-card'
        }
    ];

    return (
        <PublicLayout>
            <section className="registration-section">
                <div className="container">
                    <div className="registration-wrapper">
                        {/* Left Content */}
                        <div className="registration-content">
                            <h1 className="registration-title">
                                <span className="gradient-text">Join Channel4Me</span>
                                Your Health, Simplified
                            </h1>
                            
                            <p className="registration-subtitle">
                                Join thousands of patients and doctors who trust our platform for seamless healthcare connections. 
                                Select your role below to get started with AI-powered healthcare management.
                            </p>
                            
                            <div className="features-grid">
                                {features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <div className="feature-icon">
                                            <i className={feature.icon}></i>
                                        </div>
                                        <div className="feature-content">
                                            <h3>{feature.title}</h3>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Right Side - Role Selection */}
                        <div className="role-selection">
                            <h2>Select Your Role</h2>
                            <p>Choose how you'd like to use Channel4Me to begin your journey</p>
                            
                            <div className="role-cards">
                                {roles.map((role) => (
                                    <div 
                                        key={role.id}
                                        className={`role-card ${role.cardClass} ${selectedRole === role.id ? 'selected' : ''}`}
                                        onClick={() => handleRoleSelect(role.id as 'doctor' | 'patient')}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                handleRoleSelect(role.id as 'doctor' | 'patient');
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Select ${role.title} role`}
                                    >
                                        <div className="role-icon">
                                            <i className={role.icon}></i>
                                        </div>
                                        <div className="role-info">
                                            <h3>{role.title}</h3>
                                            <p>{role.description}</p>
                                        </div>
                                        <div className="select-indicator">
                                            <i className="fas fa-check"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="action-buttons">
                                <button 
                                    className="btn btn-primary btn-lg btn-continue" 
                                    onClick={handleContinue}
                                >
                                    <i className="fas fa-arrow-right"></i>
                                    Continue as <span id="selectedRoleText">
                                        {selectedRole === 'doctor' ? 'Healthcare Provider' : 'Patient'}
                                    </span>
                                </button>
                                
                                <button 
                                    className="btn btn-outline btn-lg" 
                                    onClick={handleLogin}
                                >
                                    <i className="fas fa-sign-in-alt"></i>
                                    Already have an account? Sign In
                                </button>
                            </div>
                            
                            <p className="login-link">
                                Need help choosing?
                                <a href="#">Contact our support team</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default RegistrationType;