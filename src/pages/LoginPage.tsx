import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const LoginPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Welcome Back</h1>
                    <p className="page-subtitle">Log in to your Channel4Me account</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-sign-in-alt"></i>
                        <h2>Login Portal</h2>
                        <p>This page is currently under development. Soon it will feature our secure login form for patients, doctors, and administrators.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default LoginPage;
