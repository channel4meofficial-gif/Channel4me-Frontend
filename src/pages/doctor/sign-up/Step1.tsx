import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DoctorPersonalData, Gender } from '../../../types/doctor';
import { useDoctorRegistration } from '../../../context/doctorRegistrationContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/register/RegistrationType.css';      // global registration styles
import '../../../styles/doctor/sign-up/Step1.css';         // doctor-specific styles
import StepIndicator from '../../../components/ui/common/StepIndicator';

const DoctorStep1: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { registrationData, updatePersonalData, resetRegistration } = useDoctorRegistration();
  
  React.useEffect(() => {
    // Treat as a brand new registration if not explicitly navigating back from Step 2
    if (!(location.state as any)?.fromStep2) {
      localStorage.removeItem('doctorProfessionalData');
      localStorage.removeItem('doctorPersonalData');
      resetRegistration();
    }
  }, [location.state, resetRegistration]);

  const isBackNavigation = (location.state as any)?.fromStep2;
  const initialPersonal = isBackNavigation ? registrationData?.personal : null;

  const [formData, setFormData] = useState({
    fullName: initialPersonal?.fullName || '',
    email: initialPersonal?.email || '',
    mobile: initialPersonal?.mobile || '',
    dob: initialPersonal?.dob || '',
    gender: initialPersonal?.gender || '',
    password: initialPersonal?.password || '',
    confirmPassword: initialPersonal?.confirmPassword || '',
    agreeTerms: initialPersonal?.agreeTerms || false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    if (!formData.agreeTerms) {
      alert('You must agree to the terms and conditions');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const personalData: DoctorPersonalData = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      dob: formData.dob,
      gender: formData.gender as Gender,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      agreeTerms: formData.agreeTerms,
      userType: 'doctor',
    };

    updatePersonalData(personalData);
    navigate('/doctor/register/step2');
  };

  return (
    <PublicLayout>
      <main className="main-content-register">
        <div className="container">
          <div className="registration-wrapper-steps">
            
            {/* Steps indicator */}
            <StepIndicator 
              currentStep={1} 
              steps={[
                { number: 1, label: 'Personal Info' },
                { number: 2, label: 'Professional Info' },
                { number: 3, label: 'Verification' }
              ]} 
            />

            {/* Form Container */}
            <div className="registration-form-container">
              <div className="form-header">
                <h1>Doctor Registration</h1>
                <p>Enter your personal details to create your professional account</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Dr. First Last Name"
                    required
                  />
                  <span className="form-helper">As per your medical license</span>
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Professional Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="doctor@hospital.com"
                    required
                  />
                  <span className="form-helper">Use your hospital/institution email</span>
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="mobile" className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                  <span className="form-helper">Used for verification and notifications</span>
                </div>

                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  {/* Date of Birth */}
                  <div className="form-group">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="form-control"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="form-group">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-control"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {passwordError && <span className="error-message">{passwordError}</span>}
                </div>

                {/* Terms agreement */}
                <div className="terms">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <label htmlFor="agreeTerms">
                    I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Next Step <i className="fas fa-arrow-right"></i>
                </button>
              </form>
              
              <div className="login-link">
                Already have an account? <a href="/login">Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default DoctorStep1;