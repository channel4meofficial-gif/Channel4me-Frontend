import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const AboutPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">About Channel4Me</h1>
                    <p className="page-subtitle">Bridging the gap between symptoms and solutions</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="about-section">
                        <h2>Our Mission</h2>
                        <p>At Channel4Me, we believe that quality healthcare is a fundamental right. Our platform leverages cutting-edge technology to make medical consultations, symptom analysis, and record management seamless and secure for patients and doctors alike.</p>
                        
                        <div className="stats-grid">
                            <div className="stat-item">
                                <h3>10k+</h3>
                                <p>Active Patients</p>
                            </div>
                            <div className="stat-item">
                                <h3>500+</h3>
                                <p>Specialized Doctors</p>
                            </div>
                            <div className="stat-item">
                                <h3>50+</h3>
                                <p>Medical Specialties</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default AboutPage;
