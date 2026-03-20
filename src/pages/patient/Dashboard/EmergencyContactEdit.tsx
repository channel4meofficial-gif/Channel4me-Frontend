import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/patient/EmergencyContactEdit.css';

function UserIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
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

const EmergencyContactEdit: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        guardianFirstName: 'Dolores',
        guardianLastName: 'Aveiro',
        contactNumber1: '0778518614',
        contactNumber2: '0742107576',
    });

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSave = () => {
        navigate('/patient/dashboard');
    };

    return (
        <PublicLayout>
            <div className="ece-page">
                <main className="ece-main">
                    <div className="ece-container">
                        <h1 className="ece-title">Emergency Contact Settings</h1>
                        <p className="ece-subtitle">Update your emergency contact information.</p>

                        <div className="ece-section">
                            <span className="ece-section-label">Emergency Detail</span>
                            <div className="ece-grid">
                                <div className="ece-field">
                                    <label className="ece-label">Guardian First Name</label>
                                    <div className="ece-input-wrap">
                                        <UserIcon />
                                        <input
                                            type="text"
                                            value={form.guardianFirstName}
                                            onChange={handleChange('guardianFirstName')}
                                        />
                                    </div>
                                </div>
                                <div className="ece-field">
                                    <label className="ece-label">Guardian Last Name</label>
                                    <div className="ece-input-wrap">
                                        <UserIcon />
                                        <input
                                            type="text"
                                            value={form.guardianLastName}
                                            onChange={handleChange('guardianLastName')}
                                        />
                                    </div>
                                </div>
                                <div className="ece-field">
                                    <label className="ece-label">Contact Number 1</label>
                                    <div className="ece-input-wrap">
                                        <PhoneIcon />
                                        <input
                                            type="tel"
                                            value={form.contactNumber1}
                                            onChange={handleChange('contactNumber1')}
                                        />
                                    </div>
                                </div>
                                <div className="ece-field">
                                    <label className="ece-label">Contact Number 2</label>
                                    <div className="ece-input-wrap">
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

                        <button className="ece-save-btn" onClick={handleSave}>
                            Save And Exit
                        </button>
                    </div>
                </main>
            </div>
        </PublicLayout>
    );
};

export default EmergencyContactEdit;
