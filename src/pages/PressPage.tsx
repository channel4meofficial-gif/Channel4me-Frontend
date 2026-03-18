import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const PressPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Press & Media</h1>
                    <p className="page-subtitle">Latest news and media resources from Channel4Me</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="press-grid">
                        <div className="press-card">
                            <span className="date">March 15, 2026</span>
                            <h3>Channel4Me Secures Series B Funding</h3>
                            <p>We are excited to announce a $50M investment to expand our AI health services.</p>
                            <button className="read-more">Read Full Story</button>
                        </div>
                        <div className="press-card">
                            <span className="date">February 10, 2026</span>
                            <h3>New Partnership with Global Health Org</h3>
                            <p>Collaborating to bring digital healthcare to underserved communities.</p>
                            <button className="read-more">Read Full Story</button>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PressPage;
