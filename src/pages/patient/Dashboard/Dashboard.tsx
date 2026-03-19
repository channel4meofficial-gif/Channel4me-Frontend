import React from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import { useAuth } from '../../../context/AuthContext';
import './PatientProfile.css';

const PATIENT_AVATAR = "https://randomuser.me/api/portraits/men/75.jpg";

function EditIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
    );
}

function PinIcon() {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </svg>
    );
}

const PatientDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <PublicLayout>
            <div className="pps-page">
                <main className="pps-main">
                    <div className="pps-container">
                        
                        <div className="pps-layout-grid">
                            {/* LEFT COLUMN */}
                            <div className="pps-col-left">
                                <div className="pps-card pps-profile-card">
                                    <div className="pps-profile-img-wrap">
                                        <img src={PATIENT_AVATAR} alt="Profile" className="pps-profile-img" />
                                    </div>
                                    <h2 className="pps-profile-name">{user?.name || 'Patient User'}</h2>
                                    <p className="pps-profile-age">Age {user?.age || '25'}</p>
                                    <p className="pps-profile-location"><PinIcon /> {user?.location || 'Colombo, Sri Lanka'}</p>
                                    <button className="pps-btn-edit" onClick={() => navigate('/patient/profile/edit')}>
                                        Edit <EditIcon />
                                    </button>
                                    <div className="pps-member-id" style={{ marginTop: '15px', padding: '8px', background: '#f1f5f9', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>
                                        ID: <span style={{ color: '#667eea' }}>{user?.memberId || 'CH4M-0000'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="pps-col-right">
                                {/* Emergency Contact */}
                                <div className="pps-card">
                                    <div className="pps-card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '24px' }}>
                                        <h3 className="pps-card-title">Emergency Contact</h3>
                                        <button className="pps-btn-edit" onClick={() => navigate('/patient/emergency-contact/edit')}>
                                            Edit <EditIcon />
                                        </button>
                                    </div>
                                    <ul className="pps-list">
                                        <li className="pps-list-item">
                                            <span className="label">Guardian Name</span> <span>: {user?.guardianName || 'Emergency Contact'}</span>
                                        </li>
                                        <li className="pps-list-item">
                                            <span className="label">Contact Number</span> <span>: {user?.contactNumber || 'Not provided'}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Upcoming Appointments */}
                                <div className="pps-card">
                                    <div className="pps-card-header">
                                        <h3 className="pps-card-title blue">Up-comming appointments</h3>
                                    </div>
                                    <ul className="pps-list">
                                        {user?.appointments && user.appointments.length > 0 ? (
                                            user.appointments.map(apt => (
                                                <li key={apt.id} className="pps-list-item">
                                                    {apt.time} at {apt.location || 'Roseth Hospital'}. Dr {apt.doctorName}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="pps-list-item">No upcoming appointments</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Health Conditions */}
                        <div className="pps-card" style={{ marginBottom: '24px' }}>
                            <div className="pps-card-header">
                                <h3 className="pps-card-title blue">Health Conditions (Last Time Sync)</h3>
                                <button className="pps-btn-edit" onClick={() => navigate('/patient/blood-report/new')}>
                                    New Blood Report
                                </button>
                            </div>
                            <div className="pps-condition-grid">
                                <div className="pps-condition-item">Blood Sugar Level - 85mg/dL</div>
                                <div className="pps-condition-item">Cholesterol - 200 mg/dL</div>
                                <div className="pps-condition-item">Kidney Health - 200 mg/dL</div>
                                <div className="pps-condition-item">Thyroid Disorders - 4.0 mIU/L</div>
                            </div>
                        </div>

                        {/* Doctor Feedback */}
                        <div className="pps-card pps-feedback-card">
                            <div className="pps-card-header">
                                <h3 className="pps-card-title blue">Doctor Feedback</h3>
                            </div>
                            <div className="pps-feedback-list">
                                <div className="pps-feedback-item">
                                    I've reviewed your case and prescribed the needed medicine. Please follow the instructions in the app. - Dr. prasad
                                </div>
                                <div className="pps-feedback-item">
                                    Your consultation is complete, and your medication has been updated. Follow the steps shown in the app. - Dr. Nalin
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </PublicLayout>
    );
};

export default PatientDashboard;
