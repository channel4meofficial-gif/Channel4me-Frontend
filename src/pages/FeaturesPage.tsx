import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const FeaturesPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Platform Features</h1>
                    <p className="page-subtitle">Everything you need for modern healthcare management</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-tools"></i>
                        <h2>Features Overview Pipeline</h2>
                        <p>This page is currently under development. Soon it will display our comprehensive AI doctor matching, instant booking, and health tracking features in detail.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default FeaturesPage;
