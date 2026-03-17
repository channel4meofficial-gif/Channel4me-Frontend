import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const CareersPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Careers</h1>
                    <p className="page-subtitle">Join us in building the future of healthcare</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-briefcase"></i>
                        <h2>Open Positions</h2>
                        <p>This page is currently under development. Soon it will list our open roles, company culture, and benefits package for prospective employees.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default CareersPage;
