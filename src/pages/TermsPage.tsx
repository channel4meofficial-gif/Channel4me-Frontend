import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const TermsPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Terms of Service</h1>
                    <p className="page-subtitle">Rules and guidelines for using the Channel4Me platform</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-file-contract"></i>
                        <h2>User Agreement</h2>
                        <p>This page is currently under development. Soon it will contain our comprehensive terms and conditions for both patients and healthcare providers.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default TermsPage;
