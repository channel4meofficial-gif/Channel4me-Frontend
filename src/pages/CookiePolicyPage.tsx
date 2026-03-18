import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const CookiePolicyPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Cookie Policy</h1>
                    <p className="page-subtitle">How we use cookies to improve your experience</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="policy-content">
                        <h2>What are cookies?</h2>
                        <p>Cookies are small text files stored on your device that help us recognize you and remember your preferences.</p>
                        
                        <h2>Types of cookies we use</h2>
                        <ul>
                            <li><strong>Essential:</strong> Required for the platform to function.</li>
                            <li><strong>Analytical:</strong> Help us understand how you use the site.</li>
                            <li><strong>Functional:</strong> Remember your settings and preferences.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default CookiePolicyPage;
