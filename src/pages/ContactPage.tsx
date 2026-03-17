import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const ContactPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-subtitle">We'd love to hear from you</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-envelope-open-text"></i>
                        <h2>Get In Touch</h2>
                        <p>This page is currently under development. Soon it will contain our contact form, office locations, and direct contact directories.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default ContactPage;
