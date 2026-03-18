import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';

const Unauthorized: React.FC = () => {
    return (
        <PublicLayout>
            <div style={{ 
                minHeight: 'calc(100vh - 200px)', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '20px',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚫</div>
                <h1 style={{ fontSize: '36px', color: '#1e293b', marginBottom: '16px' }}>Access Denied</h1>
                <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '500px', lineHeight: '1.6', marginBottom: '32px' }}>
                    Oops! You don't have the required permissions to view this page. 
                    Please contact an administrator if you believe this is an error.
                </p>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Link to="/" style={{ 
                        padding: '12px 24px', 
                        background: '#3b82f6', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '8px',
                        fontWeight: '600',
                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                    }}>
                        Go Home
                    </Link>
                    <Link to="/login" style={{ 
                        padding: '12px 24px', 
                        background: 'white', 
                        color: '#475569', 
                        textDecoration: 'none', 
                        borderRadius: '8px',
                        fontWeight: '600',
                        border: '1px solid #e2e8f0'
                    }}>
                        Switch Account
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Unauthorized;
