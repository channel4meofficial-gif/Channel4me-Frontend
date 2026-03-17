import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const HelpCenterPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Help Center</h1>
                    <p className="page-subtitle">How can we help you today?</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-life-ring"></i>
                        <h2>Support Resources</h2>
                        <p>This page is currently under development. Soon it will contain step-by-step guides, video tutorials, and account management help.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default HelpCenterPage;
