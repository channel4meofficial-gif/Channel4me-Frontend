import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const TermsPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Terms of Service</h1>
                    <p className="page-subtitle">Understand the rules and guidelines for using our platform</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="policy-content">
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing or using Channel4Me, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                        
                        <h2>2. User Responsibilities</h2>
                        <p>As a user, you are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
                        
                        <h2>3. Service Limitations</h2>
                        <p>Channel4Me is a digital health platform and does not provide emergency medical services. In case of an emergency, call your local emergency number immediately.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default TermsPage;
