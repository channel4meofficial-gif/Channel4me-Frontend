import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const PressPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Press & Media</h1>
                    <p className="page-subtitle">Latest news and announcements from Channel4Me</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-newspaper"></i>
                        <h2>Press Releases</h2>
                        <p>This page is currently under development. Soon it will contain our latest press releases, media kits, and news coverage.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PressPage;
