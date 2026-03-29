import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/patient/PatientEditProfile.css';

const API_BASE = 'http://localhost:5000';

const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const DEFAULT_FORM = {
    firstName: '',
    lastName: '',
    age: '',
    location: '',
    guardianFirstName: '',
    guardianLastName: '',
    contactNumber1: '',
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
    const [form, setForm] = useState(DEFAULT_FORM);
    const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getToken = () => localStorage.getItem('token') || '';

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/v1/profiles`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                const data = await res.json();
                if (data.success && data.data) {
                    const p = data.data;
                    setForm({
                        firstName: p.firstName || '',
                        lastName: p.lastName || '',
                        age: p.age ? String(p.age) : '',
                        location: p.location || '',
                        guardianFirstName: p.guardianFirstName || '',
                        guardianLastName: p.guardianLastName || '',
                        contactNumber1: p.contactNumber1 || '',
                        contactNumber2: p.contactNumber2 || '',
                    });
                    if (p.profilePicture) {
                        setProfileImage(`${API_BASE}/${p.profilePicture}`);
                    }
                }
            } catch (e) {
                console.error('Failed to load profile', e);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setProfileImage(reader.result);
            }
        };
        reader.readAsDataURL(file);

        // Upload to backend
        setIsUploading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('profilePicture', file);
            const res = await fetch(`${API_BASE}/api/v1/profiles/upload-picture`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${getToken()}` },
                body: formData
            });
            const data = await res.json();
            if (data.success && data.data?.accessUrl) {
                setProfileImage(data.data.accessUrl);
                // Persist so the navbar header updates immediately
                localStorage.setItem('profilePicture', data.data.accessUrl);
                // Dispatch storage event so other components (header) pick it up in the same tab
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'profilePicture',
                    newValue: data.data.accessUrl,
                }));
            } else {
                setError(data.message || 'Failed to upload picture.');
            }
        } catch (err) {
            setError('Failed to upload profile picture.');
        } finally {
            setIsUploading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');
        try {
            const res = await fetch(`${API_BASE}/api/v1/profiles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    role: 'patient',
                    firstName: form.firstName,
                    lastName: form.lastName,
                    age: form.age ? Number(form.age) : undefined,
                    location: form.location,
                    contactNumber1: form.contactNumber1,
                    contactNumber2: form.contactNumber2,
                    guardianFirstName: form.guardianFirstName,
                    guardianLastName: form.guardianLastName,
                })
            });
            const data = await res.json();
            if (data.success) {
                navigate('/patient/dashboard');
            } else {
                setError(data.message || 'Failed to save profile.');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <PublicLayout>
            <div className="pep-page">
                <main className="pep-main">
                    <div className="pep-container">
                        <h1 className="pep-title">User Profile Settings</h1>
                        <p className="pep-subtitle">Manage your personal information and preference.</p>

                        {error && (
                            <div style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '14px' }}>
                                {error}
                            </div>
                        )}

                        {/* Avatar */}
                        <div className="pep-avatar-section">
                            <div className="pep-avatar-wrap" onClick={triggerFileInput} style={{ cursor: 'pointer', position: 'relative' }}>
                                <img src={profileImage} alt="Profile" />
                                {isUploading && (
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>
                                        Uploading…
                                    </div>
                                )}
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
                        <button className="pep-save-btn" onClick={handleSave} disabled={isSaving || isUploading}>
                            {isSaving ? 'Saving…' : 'Save And Exit'}
                        </button>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
};

export default PatientEditProfile;
