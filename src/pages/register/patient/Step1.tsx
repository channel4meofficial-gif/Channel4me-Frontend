import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientRegistration } from '../../../context/patientRegistrationContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/register/RegistrationType.css';      // global registration styles
import '../../../styles/register/patient/PatientRegistration.css'; // patient-specific styles

const PatientStep1: React.FC = () => {
    const navigate = useNavigate();
    const { data, updatePersonal, nextStep } = usePatientRegistration();
    const personal = data.personal;

    const [formData, setFormData] = useState({
        fullName: personal?.fullName || '',
        email: personal?.email || '',
        day: personal?.dob?.day || '',
        month: personal?.dob?.month || '',
        year: personal?.dob?.year || '',
        mobile: personal?.mobile || '',
        password: personal?.password || '',
        confirmPassword: personal?.confirmPassword || '',
        terms: personal?.terms || false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
        setFormData({ ...formData, [target.name]: value });
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.day || !formData.month || !formData.year) newErrors.dob = 'Date of birth is required';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
        else if (!/^\d{10,15}$/.test(formData.mobile.replace(/\D/g, ''))) newErrors.mobile = 'Mobile must be 10-15 digits';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) newErrors.password = 'Password must contain letters and numbers';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.terms) newErrors.terms = 'You must agree to the terms';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const personalData = {
            fullName: formData.fullName,
            email: formData.email,
            dob: { day: formData.day, month: formData.month, year: formData.year },
            mobile: formData.mobile,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            terms: formData.terms,
        };
        updatePersonal(personalData);
        nextStep();
        navigate('/patient/register/step2');
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    return (
        <PublicLayout>
            <div className="container">
                <div className="registration-wrapper">
                    <div className="steps">
                        <div className="step active">
                            <div className="step-number">1</div>
                            <div className="step-label">Personal Info</div>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <div className="step-label">Health Profile</div>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <div className="step-label">Complete</div>
                        </div>
                    </div>

                    <div className="form-container">
                        <div className="form-header">
                            <h1>Create Patient Account</h1>
                            <p>Fill in your personal information to get started</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                                <span className="form-helper">As per your national identity card</span>
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your email address"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                                <span className="form-helper">We'll send confirmation to this email</span>
                            </div>

                            {/* Date of Birth */}
                            <div className="form-group">
                                <label className="form-label">Date of Birth</label>
                                <div className="dob-grid">
                                    <select name="day" value={formData.day} onChange={handleChange} className="dob-select">
                                        <option value="" disabled>Day</option>
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <select name="month" value={formData.month} onChange={handleChange} className="dob-select">
                                        <option value="" disabled>Month</option>
                                        {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                                    </select>
                                    <select name="year" value={formData.year} onChange={handleChange} className="dob-select">
                                        <option value="" disabled>Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                {errors.dob && <span className="error-message">{errors.dob}</span>}
                            </div>

                            {/* Mobile Number */}
                            <div className="form-group">
                                <label className="form-label">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your mobile number"
                                />
                                {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                                <span className="form-helper">Used for appointment reminders</span>
                            </div>

                            {/* Password */}
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Create a secure password"
                                    />
                                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                                {errors.password && <span className="error-message">{errors.password}</span>}
                                <span className="form-helper">Minimum 8 characters with letters and numbers</span>
                            </div>

                            {/* Confirm Password */}
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Confirm your password"
                                    />
                                    <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="terms">
                                <input type="checkbox" name="terms" id="terms" checked={formData.terms} onChange={handleChange} />
                                <label htmlFor="terms">
                                    I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                                </label>
                            </div>
                            {errors.terms && <span className="error-message">{errors.terms}</span>}

                            <button type="submit" className="btn btn-primary">
                                <i className="fas fa-arrow-right"></i> Continue to Health Profile
                            </button>
                        </form>

                        <div className="login-link">
                            Already have an account? <a href="/patient/login">Sign In</a>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PatientStep1;