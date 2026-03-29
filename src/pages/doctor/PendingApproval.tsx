import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';

const PendingApproval: React.FC = () => {
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
                <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    background: '#fef3c7', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '40px',
                    marginBottom: '32px',
                    color: '#f59e0b'
                }}>
                    ⏳
                </div>
                <h1 style={{ fontSize: '32px', color: '#1e293b', marginBottom: '16px' }}>Registration Submitted!</h1>
                <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', lineHeight: '1.6', marginBottom: '40px' }}>
                    Thank you for joining Channel4Me. Your account is currently <strong>pending verification</strong> by our medical board. 
                    This process usually takes 24-48 hours. We'll notify you via email once your profile is approved.
                </p>
                <div style={{ 
                    background: '#f8fafc', 
                    padding: '24px', 
                    borderRadius: '16px', 
                    border: '1px solid #e2e8f0',
                    maxWidth: '500px',
                    marginBottom: '40px',
                    textAlign: 'left'
                }}>
                    <h3 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '12px' }}>What happens next?</h3>
                    <ul style={{ color: '#475569', fontSize: '14px', paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Verification of medical credentials and license</li>
                        <li>Background check and profile review</li>
                        <li>Approval notification via email</li>
                        <li>Access to your professional dashboard</li>
                    </ul>
                </div>
                <Link to="/" style={{ 
                    padding: '12px 32px', 
                    background: '#3b82f6', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '8px',
                    fontWeight: '600',
                    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                }}>
                    Return to Homepage
                </Link>
            </div>
        </PublicLayout>
    );
};

export default PendingApproval;
