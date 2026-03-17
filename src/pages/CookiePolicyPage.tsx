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
                    <div className="placeholder-box">
                        <i className="fas fa-cookie-bite"></i>
                        <h2>Cookie Usage</h2>
                        <p>This page is currently under development. Soon it will detail the types of cookies we use, their purpose, and how you can manage your preferences.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default CookiePolicyPage;
