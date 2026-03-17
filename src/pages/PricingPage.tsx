import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const PricingPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Simple, Transparent Pricing</h1>
                    <p className="page-subtitle">Choose the perfect plan for your healthcare needs</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-tags"></i>
                        <h2>Pricing Plans</h2>
                        <p>This page is currently under development. Soon it will display our Free, Pro, and Family plans with full feature comparisons.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PricingPage;
