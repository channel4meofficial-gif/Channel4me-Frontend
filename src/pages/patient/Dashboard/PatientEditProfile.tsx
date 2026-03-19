import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import './PatientEditProfile.css';

const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const DEFAULT_PROFILE_DATA = {
    firstName: 'Nimal',
    lastName: 'Perera',
    age: '45',
    location: '',
    guardianFirstName: 'Sunitha',
    guardianLastName: '',
    contactNumber1: '0771234567',
    contactNumber2: '',
};

/* ── Icons ── */
function UserIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    );
}

function PinIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
    );
}

/* ── Component ── */
const PatientEditProfile: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(DEFAULT_PROFILE_DATA);
    const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedProfileData = localStorage.getItem('patientProfileData');
        if (storedProfileData) {
            try {
                setForm(JSON.parse(storedProfileData));
            } catch (e) {
                console.error("Failed to parse patientProfileData from local storage", e);
            }
        }
        
        const storedImage = localStorage.getItem('patientProfileImage');
        if (storedImage) {
            setProfileImage(storedImage);
        }
    }, []);

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setProfileImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSave = () => {
        localStorage.setItem('patientProfileData', JSON.stringify(form));
        localStorage.setItem('patientProfileImage', profileImage);
        navigate('/patient/dashboard');
    };

    return (
        <PublicLayout>
            <div className="pep-page">
                <main className="pep-main">
                    <div className="pep-container">
                        <h1 className="pep-title">User Profile Settings</h1>
                        <p className="pep-subtitle">Manage your personal information and preference.</p>

                        {/* Avatar */}
                        <div className="pep-avatar-section">
                            <div className="pep-avatar-wrap" onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
                                <img src={profileImage} alt="Profile" />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <p className="pep-avatar-hint">Click on the profile to change the picture.</p>
                        </div>

                        {/* Personal Details */}
                        <div className="pep-section">
                            <span className="pep-section-label">Personal Detail</span>
                            <div className="pep-grid">
                                <div className="pep-field">
                                    <label className="pep-label">First Name</label>
                                    <div className="pep-input-wrap">
                                        <UserIcon />
                                        <input
                                            type="text"
                                            value={form.firstName}
                                            onChange={handleChange('firstName')}
                                        />
                                    </div>
                                </div>
                                <div className="pep-field">
                                    <label className="pep-label">Last Name</label>
                                    <div className="pep-input-wrap">
                                        <UserIcon />
                                        <input
                                            type="text"
                                            value={form.lastName}
                                            onChange={handleChange('lastName')}
                                        />
                                    </div>
                                </div>
                                <div className="pep-field">
                                    <label className="pep-label">Age</label>
                                    <div className="pep-input-wrap">
                                        <CalendarIcon />
                                        <input
                                            type="number"
                                            value={form.age}
                                            onChange={handleChange('age')}
                                            placeholder="Age"
                                            min="0"
                                            max="150"
                                        />
                                    </div>
                                </div>
                                <div className="pep-field">
                                    <label className="pep-label">Location</label>
                                    <div className="pep-input-wrap">
                                        <PinIcon />
                                        <input
                                            type="text"
                                            value={form.location}
                                            onChange={handleChange('location')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Details */}
                        <div className="pep-section">
                            <span className="pep-section-label">Emergency Detail</span>
                            <div className="pep-grid">
                                <div className="pep-field">
                                    <label className="pep-label">Guardian First Name</label>
                                    <div className="pep-input-wrap">
                                        <UserIcon />
                                        <input
                                            type="text"
                                            value={form.guardianFirstName}
                                            onChange={handleChange('guardianFirstName')}
                                        />
                                    </div>
                                </div>
                                <div className="pep-field">
                                    <label className="pep-label">Guardian Last Name</label>
                                    <div className="pep-input-wrap">
                                        <UserIcon />
                                        <input
                                            type="text"
                                            value={form.guardianLastName}
                                            onChange={handleChange('guardianLastName')}
                                        />
                                    </div>
                                </div>
                                <div className="pep-field">
                                    <label className="pep-label">Contact Number 1</label>
                                    <div className="pep-input-wrap">
                                        <PhoneIcon />
                                        <input
                                            type="tel"
                                            value={form.contactNumber1}
                                            onChange={handleChange('contactNumber1')}
                                        />
                                    </div>
                                </div>
                                <div className="pep-field">
                                    <label className="pep-label">Contact Number 2</label>
                                    <div className="pep-input-wrap">
                                        <PhoneIcon />
                                        <input
                                            type="tel"
                                            value={form.contactNumber2}
                                            onChange={handleChange('contactNumber2')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button className="pep-save-btn" onClick={handleSave}>
                            Save And Exit
                        </button>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
};

export default PatientEditProfile;
