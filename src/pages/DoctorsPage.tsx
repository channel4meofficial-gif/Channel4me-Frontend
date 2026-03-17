import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const DoctorsPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Find a Doctor</h1>
                    <p className="page-subtitle">Connect with top-rated specialists available now</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container">
                    <div className="placeholder-box">
                        <i className="fas fa-user-md"></i>
                        <h2>Doctor Directory</h2>
                        <p>This page is currently under development. Soon you will be able to search, filter, and view detailed profiles of all verified doctors on our platform.</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default DoctorsPage;
