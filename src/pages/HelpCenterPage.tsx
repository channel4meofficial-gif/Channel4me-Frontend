import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const HelpCenterPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Help Center</h1>
                    <p className="page-subtitle">Search for articles or browse topics to find answers</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="search-bar">
                        <input type="text" placeholder="Search for help..." className="search-input" />
                    </div>
                    <div className="help-categories">
                        <div className="cat-card">
                            <i className="fas fa-user-circle"></i>
                            <h3>Account Support</h3>
                            <p>Login issues, account settings, and profile management.</p>
                        </div>
                        <div className="cat-card">
                            <i className="fas fa-credit-card"></i>
                            <h3>Billing & Payments</h3>
                            <p>Subscription plans, invoices, and payment methods.</p>
                        </div>
                        <div className="cat-card">
                            <i className="fas fa-shield-alt"></i>
                            <h3>Safety & Security</h3>
                            <p>Data privacy, encryption, and secure communications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default HelpCenterPage;
