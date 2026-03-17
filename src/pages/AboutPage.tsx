import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const AboutPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">About Us</h1>
                    <p className="page-subtitle">Our mission to revolutionize healthcare access</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-building"></i>
                        <h2>Company Story</h2>
                        <p>This page is currently under development. Soon it will feature our company history, mission, vision, and the amazing team behind Channel4Me.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default AboutPage;
