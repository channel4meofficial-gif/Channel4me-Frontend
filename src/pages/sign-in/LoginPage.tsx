import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import '../../styles/register/RegistrationType.css';
import { useAuth } from '../../context/AuthContext';
import { User, UserRole } from '../../types/auth';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [loginRole, setLoginRole] = useState<UserRole>('patient');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulated API Response
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mock user creation based on selection
            const mockUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                name: loginRole === 'doctor' ? 'Dr. Emma Wilson' : loginRole === 'admin' ? 'System Admin' : 'Cristiano Ronaldo',
                email: email,
                role: loginRole,
                age: loginRole === 'patient' ? 38 : undefined,
                location: loginRole === 'patient' ? 'Riyadh, Saudi Arabia' : 'Colombo, Sri Lanka',
                guardianName: loginRole === 'patient' ? 'Dolores Aveiro' : undefined,
                contactNumber: '0778518614',
                appointments: loginRole === 'patient' ? [
                    {
                        id: 'apt-1',
                        doctorName: 'Dr. Sudarshan',
                        specialization: 'Cardiologist',
                        date: '2026-03-25',
                        time: '5:00 PM',
                        status: 'upcoming'
                    },
                    {
                        id: 'apt-2',
                        doctorName: 'Dr. Sarah Chen',
                        specialization: 'Neurologist',
                        date: '2026-03-10',
                        time: '10:30 AM',
                        status: 'completed',
                        prescriptionUrl: '/mock/prescription.pdf',
                        rating: 5
                    }
                ] : []
            };
            const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

            login(mockUser, mockToken);

            // Redirect to intended page or dashboard
            const from = (location.state as any)?.from;
            const destination = from?.pathname || `/${loginRole}/dashboard`;
            navigate(destination, { replace: true, state: from?.state });
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PublicLayout>
            <main className="main-content-register" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
                <div className="container">
                    <div className="registration-wrapper-steps" style={{ maxWidth: '500px', margin: '0 auto' }}>
                        
                        <div className="registration-form-container">
                            <div className="form-header" style={{ textAlign: 'center' }}>
                                <div className="login-badge" style={{ 
                                    display: 'inline-flex', 
                                    padding: '8px 16px', 
                                    background: '#eff6ff', 
                                    color: '#2563eb', 
                                    borderRadius: '20px', 
                                    fontSize: '13px', 
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }}>
                                    <i className="fas fa-lock" style={{ marginRight: '8px' }}></i> Secure Portal
                                </div>
                                <h1 style={{ marginBottom: '8px' }}>Welcome Back</h1>
                                <p>Manage your health journey with Channel4Me</p>
                            </div>

                            {/* Role Switcher */}
                            <div className="role-switcher" style={{ 
                                display: 'flex', 
                                background: '#f8fafc', 
                                padding: '4px', 
                                borderRadius: '12px', 
                                marginBottom: '24px',
                                border: '1px solid #e2e8f0'
                            }}>
                                {(['patient', 'doctor', 'admin'] as const).map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setLoginRole(role)}
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            textTransform: 'capitalize',
                                            cursor: 'pointer',
                                            background: loginRole === role ? 'white' : 'transparent',
                                            color: loginRole === role ? '#667eea' : '#64748b',
                                            boxShadow: loginRole === role ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <i className="fas fa-envelope" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                                        <input 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                                        <a href="#" style={{ fontSize: '13px', color: '#667eea', fontWeight: '500', textDecoration: 'none' }}>Forgot password?</a>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <i className="fas fa-unlock-alt" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                                        <input 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer' }}
                                        >
                                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                                    <input type="checkbox" id="remember" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                                    <label htmlFor="remember" style={{ fontSize: '14px', color: '#64748b', cursor: 'pointer' }}>Remember me for 30 days</label>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary" 
                                    style={{ width: '100%', padding: '14px', fontSize: '16px' }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <><i className="fas fa-spinner fa-spin"></i> Signing in...</>
                                    ) : (
                                        <><i className="fas fa-sign-in-alt"></i> Sign In</>
                                    )}
                                </button>
                            </form>

                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Or continue with</p>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="btn btn-outline" style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <i className="fab fa-google" style={{ color: '#ea4335' }}></i> Google
                                    </button>
                                    <button className="btn btn-outline" style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <i className="fab fa-apple"></i> Apple
                                    </button>
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
                                <p style={{ fontSize: '14px', color: '#64748b' }}>
                                    Don't have an account? 
                                    <button 
                                        onClick={() => navigate('/register')}
                                        style={{ background: 'none', border: 'none', color: '#667eea', fontWeight: '600', cursor: 'pointer', padding: '0 5px' }}
                                    >
                                        Create Account
                                    </button>
                                </p>
                            </div>
                        </div>
                        
                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                                © 2026 Channel4Me Healthcare. All rights reserved. Secure 256-bit SSL encrypted connection.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default LoginPage;
