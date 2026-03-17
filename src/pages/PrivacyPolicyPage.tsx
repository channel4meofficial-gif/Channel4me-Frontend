import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Privacy Policy</h1>
                    <p className="page-subtitle">How we protect your personal and medical information</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-user-shield"></i>
                        <h2>Privacy Guidelines</h2>
                        <p>This page is currently under development. Soon it will contain our full legal privacy policy, detailing data collection, storage, and medical confidentiality compliance.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PrivacyPolicyPage;
