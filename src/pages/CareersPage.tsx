import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const CareersPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Join Our Team</h1>
                    <p className="page-subtitle">Help us build the future of digital healthcare</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="careers-section">
                        <h2>Why Work With Us?</h2>
                        <p>We're looking for passionate individuals who want to make a real impact in people's lives. Join a diverse team of engineers, doctors, and designers.</p>
                        
                        <div className="job-list">
                            <div className="job-item">
                                <h3>Senior Full Stack Developer</h3>
                                <p>Remote • Engineering</p>
                                <button className="apply-btn">Apply Now</button>
                            </div>
                            <div className="job-item">
                                <h3>UI/UX Designer</h3>
                                <p>Silicon Valley • Design</p>
                                <button className="apply-btn">Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default CareersPage;
