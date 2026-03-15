import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorPersonalData, Gender } from '../../../types/doctor';
import { useDoctorRegistration } from '../../../context/doctorRegistrationContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/register/doctor/Step1.css';

const DoctorStep1: React.FC = () => {
  const navigate = useNavigate();
  const { registrationData, updatePersonalData } = useDoctorRegistration();

  // Local state type – we'll let TypeScript infer it
  const [formData, setFormData] = useState({
    fullName: registrationData?.personal?.fullName || '',
    email: registrationData?.personal?.email || '',
    mobile: registrationData?.personal?.mobile || '',
    dob: registrationData?.personal?.dob || '',
    gender: registrationData?.personal?.gender || '',
    password: registrationData?.personal?.password || '',
    confirmPassword: registrationData?.personal?.confirmPassword || '',
    agreeTerms: registrationData?.personal?.agreeTerms || false,
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

    // Cast gender to Gender type – it will always be one of the allowed values from the dropdown
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
      <div className="container">
        <div className="registration-wrapper">
          {/* Steps indicator */}
          <div className="steps">
            <div className="step active">
              <div className="step-number">1</div>
              <div className="step-label">Personal</div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-label">Professional</div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-label">Documents</div>
            </div>
          </div>

          {/* Form card */}
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-main-title">Doctor Registration</h2>
              <p className="form-step-description">Step 1: Personal Information</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
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
                <label className="form-label">Professional Email</label>
                <input
                  type="email"
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
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
                <span className="form-helper">Used for verification and notifications</span>
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                <span className="form-helper">Must be at least 21 years old</span>
              </div>

              {/* Gender */}
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
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

              {/* Password */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
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
                <span className="form-helper">Minimum 8 characters with 1 number and 1 special character</span>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
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
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <span>I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a></span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                Next Step <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default DoctorStep1;