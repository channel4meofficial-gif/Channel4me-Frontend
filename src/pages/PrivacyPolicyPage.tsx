import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Privacy Policy</h1>
                    <p className="page-subtitle">Your data privacy and security are our top priorities</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="policy-content">
                        <h2>1. Information Collection</h2>
                        <p>We collect information that you provide directly to us when you create an account, such as your name, email address, and medical preferences.</p>
                        
                        <h2>2. Data Usage</h2>
                        <p>Your data is used solely to provide and improve our healthcare services. We never sell your personal information to third parties.</p>
                        
                        <h2>3. Security</h2>
                        <p>We implement robust technical and organizational measures to protect your data against unauthorized access or disclosure.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PrivacyPolicyPage;
