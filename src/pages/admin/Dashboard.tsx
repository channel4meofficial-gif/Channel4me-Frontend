import React from 'react';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <PublicLayout>
            <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ 
                    background: 'white', 
                    borderRadius: '20px', 
                    padding: '40px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <header style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '40px',
                        borderBottom: '1px solid #f1f5f9',
                        paddingBottom: '20px'
                    }}>
                        <div>
                            <h1 style={{ color: '#1e293b', fontSize: '28px', marginBottom: '8px' }}>Admin Portal</h1>
                            <p style={{ color: '#64748b' }}>Welcome back, {user?.name}</p>
                        </div>
                        <button 
                            onClick={logout}
                            style={{ 
                                padding: '10px 20px', 
                                background: '#ef4444', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Log Out
                        </button>
                    </header>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                        {[
                            { label: 'Total Users', value: '1,284', color: '#3b82f6', icon: '👥' },
                            { label: 'Active Doctors', value: '156', color: '#10b981', icon: '👨‍⚕️' },
                            { label: 'Pending Verifications', value: '12', color: '#f59e0b', icon: '📎' },
                            { label: 'System Health', value: 'Optimal', color: '#8b5cf6', icon: '⚡' }
                        ].map((stat, i) => (
                            <div key={i} style={{ 
                                padding: '24px', 
                                background: '#f8fafc', 
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{stat.icon}</div>
                                <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>{stat.label}</div>
                                <div style={{ color: stat.color, fontSize: '32px', fontWeight: '700', marginTop: '4px' }}>{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <h2 style={{ color: '#1e293b', fontSize: '20px', marginBottom: '20px' }}>Recent Activity</h2>
                        <div style={{ background: '#f8fafc', borderRadius: '12px', overflow: 'hidden' }}>
                            {[
                                'New doctor registration: Dr. Sarah Chen',
                                'System update completed successfully',
                                'New patient sign-up: Robert Fox',
                                'Automated security scan finished'
                            ].map((activity, i) => (
                                <div key={i} style={{ 
                                    padding: '16px 20px', 
                                    borderBottom: i === 3 ? 'none' : '1px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }}></div>
                                    <span style={{ color: '#475569', fontSize: '14px' }}>{activity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default AdminDashboard;
