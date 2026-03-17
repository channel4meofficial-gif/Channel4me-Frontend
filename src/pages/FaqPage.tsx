import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const FaqPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Frequently Asked Questions</h1>
                    <p className="page-subtitle">Quick answers to common questions about Channel4Me</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-question-circle"></i>
                        <h2>FAQ Knowledge Base</h2>
                        <p>This page is currently under development. Soon it will feature expandable topics relating to booking, prescriptions, privacy, and technical issues.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default FaqPage;
