import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const FeaturesPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Platform Features</h1>
                    <p className="page-subtitle">Innovative tools designed for modern healthcare</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <i className="fas fa-calendar-check"></i>
                            <h3>Smart Scheduling</h3>
                            <p>Book and manage appointments with a single click. Real-time availability for all doctors.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-robot"></i>
                            <h3>AI Symptom Checker</h3>
                            <p>Get preliminary health insights using our advanced AI-driven symptom analysis tool.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-video"></i>
                            <h3>Telemedicine</h3>
                            <p>Consult with top specialists from the comfort of your home via high-definition video calls.</p>
                        </div>
                        <div className="feature-card">
                            <i className="fas fa-file-medical"></i>
                            <h3>Digital Records</h3>
                            <p>Access your medical history, prescriptions, and lab results securely at any time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default FeaturesPage;
