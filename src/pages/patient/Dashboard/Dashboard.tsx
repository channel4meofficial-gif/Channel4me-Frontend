import React from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
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
                                    <h2 className="pps-profile-name">Cristiano Ronaldo</h2>
                                    <p className="pps-profile-age">Age 40</p>
                                    <p className="pps-profile-location"><PinIcon /> Riyadh, Saudi Arabia</p>
                                    <button className="pps-btn-edit" onClick={() => navigate('/patient/profile/edit')}>
                                        Edit <EditIcon />
                                    </button>
                                </div>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="pps-col-right">
                                {/* Emergency Contact */}
                                <div className="pps-card">
                                    <div className="pps-card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '24px' }}>
                                        <h3 className="pps-card-title">Emergency Contact</h3>
                                        <button className="pps-btn-edit">
                                            Edit <EditIcon />
                                        </button>
                                    </div>
                                    <ul className="pps-list">
                                        <li className="pps-list-item">
                                            <span className="label">Guardian Name</span> <span>: Dolores Aveiro</span>
                                        </li>
                                        <li className="pps-list-item">
                                            <span className="label">Contact Number1</span> <span>: 0778518614</span>
                                        </li>
                                        <li className="pps-list-item">
                                            <span className="label">Contact Number2</span> <span>: 0742107576</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Upcoming Appointments */}
                                <div className="pps-card">
                                    <div className="pps-card-header">
                                        <h3 className="pps-card-title blue">Up-comming appointments</h3>
                                    </div>
                                    <ul className="pps-list">
                                        <li className="pps-list-item">
                                            5.00 pm at Roseth Hospital. Dr Sudarshan
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Health Conditions */}
                        <div className="pps-card" style={{ marginBottom: '24px' }}>
                            <div className="pps-card-header">
                                <h3 className="pps-card-title blue">Health Conditions (Last Time Sync)</h3>
                                <button className="pps-btn-edit">
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
