import React from 'react';
import { useLocation } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout/publiclayout';

const PlaceholderPage: React.FC = () => {
    const location = useLocation();
    const pageName = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2) || 'Page';

    return (
        <PublicLayout>
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {pageName}
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                    We're currently working on this page to bring you the best experience. Check back soon for updates!
                </p>
                <div style={{ marginTop: '40px' }}>
                    <i className="fas fa-tools" style={{ fontSize: '4rem', color: '#e2e8f0' }}></i>
                </div>
                <button 
                    onClick={() => window.history.back()} 
                    className="btn btn-primary" 
                    style={{ marginTop: '40px' }}
                >
                    <i className="fas fa-arrow-left"></i> Go Back
                </button>
            </div>
        </PublicLayout>
    );
};

export default PlaceholderPage;
