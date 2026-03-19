import React from 'react';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';
import '../styles/pages.css';

const DoctorsPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Doctors</h1>
                    <p className="page-subtitle">Coming Soon</p>
                </div>
            </div>
            
            <div className="page-content">
                <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
                    <i className="fas fa-tools" style={{ fontSize: '48px', color: '#3b82f6', marginBottom: '20px' }}></i>
                    <h2>Under Development</h2>
                    <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                        We are currently working hard to bring you this page. Please check back later for updates.
                    </p>
                </div>
            </div>
        </PublicLayout>
    );
};

export default DoctorsPage;
