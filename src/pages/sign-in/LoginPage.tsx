import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout/publiclayout';
import '../../styles/register/RegistrationType.css';
import { useAuth } from '../../context/AuthContext';
import { User, UserRole } from '../../types/auth';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

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

        try {
            const res = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role: loginRole })
            });
            const data = await res.json();

            if (data.success) {
                const userObj: User = {
                    id: data.data.userId,
                    name: data.data.fullName || `${data.data.firstName || ''} ${data.data.lastName || ''}`.trim() || data.data.email,
                    email: data.data.email,
                    role: data.data.role,
                };
                login(userObj, data.token);

                // Redirect to intended page or dashboard
                const from = (location.state as any)?.from?.pathname || `/${loginRole}/dashboard`;
                navigate(from, { replace: true });
            } else {
                alert(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login API Error:', error);
            alert('Login failed. Cannot reach the server.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/v1/auth/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credentialResponse.credential })
            });
            const data = await res.json();

            if (data.success) {
                const userObj: User = {
                    id: data.data.userId,
                    name: data.data.fullName || `${data.data.firstName || ''} ${data.data.lastName || ''}`.trim() || data.data.email,
                    email: data.data.email,
                    role: data.data.role || 'patient',
                };
                login(userObj, data.token);

                // Redirect to intended page or patient dashboard by default
                const from = (location.state as any)?.from?.pathname || `/patient/dashboard`;
                navigate(from, { replace: true });
            } else {
                alert(data.message || 'Google Login failed.');
            }
        } catch (error) {
            console.error('Google Login API Error:', error);
            alert('Google Login failed. Cannot reach the server.');
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
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => {
                                                console.error('Login Failed');
                                                alert('Google Login failed.');
                                            }}
                                            useOneTap
                                            shape="rectangular"
                                            theme="outline"
                                            text="signin_with"
                                        />
                                    </div>
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
