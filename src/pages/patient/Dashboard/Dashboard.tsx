import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/patient/PatientProfile.css';

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

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

function StarIcon({ filled, onClick }: { filled: boolean; onClick?: () => void }) {
    return (
        <svg
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default', transition: 'transform 0.1s' }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={filled ? "#fbbf24" : "none"}
            stroke={filled ? "#fbbf24" : "#cbd5e1"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onMouseEnter={(e) => onClick && (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => onClick && (e.currentTarget.style.transform = 'scale(1)')}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    );
}

const PatientDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState<any>({});
    const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);
    const [bloodReport, setBloodReport] = useState<{ [key: string]: string } | null>(null);
    const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
    const [doctorFeedback, setDoctorFeedback] = useState<any[]>([]);
    const [recentConsultations, setRecentConsultations] = useState<any[]>([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState<any | null>(null);
    const [tempRating, setTempRating] = useState(0);
    const [tempComment, setTempComment] = useState('');

    const API_BASE = 'http://localhost:5000';
    const getToken = () => localStorage.getItem('token') || '';

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch profile
                const profileRes = await fetch(`${API_BASE}/api/v1/profiles`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                const profileJson = await profileRes.json();
                if (profileJson.success && profileJson.data) {
                    setProfileData(profileJson.data);
                    if (profileJson.data.profilePicture) {
                        setProfileImage(`${API_BASE}/${profileJson.data.profilePicture}`);
                    }
                    if (profileJson.data.doctorFeedback) {
                        setDoctorFeedback(profileJson.data.doctorFeedback);
                    }
                }

                // Fetch health records
                const healthRes = await fetch(`${API_BASE}/api/v1/health-records`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                const healthJson = await healthRes.json();
                if (healthJson.success && healthJson.data) {
                    setBloodReport({
                        bloodSugar: healthJson.data.bloodSugar,
                        cholesterol: healthJson.data.cholesterol,
                        kidneyHealth: healthJson.data.kidneyHealth,
                        thyroidDisorders: healthJson.data.thyroidDisorder,
                    });
                }

                // Fetch upcoming appointments from API
                const apptRes = await fetch(`${API_BASE}/api/v1/bookings/my-upcoming`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                const apptJson = await apptRes.json();
                if (apptJson.success && Array.isArray(apptJson.data)) {
                    setUpcomingAppointments(apptJson.data);
                } else {
                    setUpcomingAppointments([]);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            }
        };

        fetchDashboardData();



        const storedRecent = localStorage.getItem('patientRecentConsultations');
        if (storedRecent) {
            try {
                setRecentConsultations(JSON.parse(storedRecent));
            } catch (e) {
                console.error("Failed to parse patientRecentConsultations", e);
            }
        }
    }, []);

    const handleOpenReview = (appt: any) => {
        setSelectedAppt(appt);
        setTempRating(appt.rating || 0);
        setTempComment(appt.comment || '');
        setIsReviewModalOpen(true);
    };

    const handleSubmitReview = () => {
        if (!selectedAppt) return;
        const updated = recentConsultations.map(item =>
            item.id === selectedAppt.id ? { ...item, rating: tempRating, comment: tempComment } : item
        );
        setRecentConsultations(updated);
        localStorage.setItem('patientRecentConsultations', JSON.stringify(updated));
        setIsReviewModalOpen(false);
    };

    const {
        firstName, lastName, age, location,
        guardianFirstName, guardianLastName,
        contactNumber1, contactNumber2
    } = profileData;

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
                                        <img src={profileImage} alt="Profile" className="pps-profile-img" />
                                    </div>
                                    <h2 className="pps-profile-name">{firstName || lastName ? `${firstName || ''} ${lastName || ''}`.trim() : 'Complete your profile'}</h2>
                                    <p className="pps-profile-age">Age {age || '-'}</p>
                                    {location && <p className="pps-profile-location"><PinIcon /> {location}</p>}
                                    <button className="pps-btn-edit" onClick={() => navigate('/patient/dashboard/edit-profile')}>
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
                                        <button className="pps-btn-edit" onClick={() => navigate('/patient/dashboard/edit-emergency-contact')}>
                                            Edit <EditIcon />
                                        </button>
                                    </div>
                                    <ul className="pps-list">
                                        <li className="pps-list-item">
                                            <span className="label">Guardian Name</span> <span>: {guardianFirstName || guardianLastName ? `${guardianFirstName || ''} ${guardianLastName || ''}`.trim() : '-'}</span>
                                        </li>
                                        <li className="pps-list-item">
                                            <span className="label">Contact Number1</span> <span>: {contactNumber1 || '-'}</span>
                                        </li>
                                        {contactNumber2 && (
                                            <li className="pps-list-item">
                                                <span className="label">Contact Number2</span> <span>: {contactNumber2}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* Upcoming Appointments */}
                                <div className="pps-card">
                                    <div className="pps-card-header">
                                        <h3 className="pps-card-title blue">Up-comming appointments</h3>
                                    </div>
                                    <ul className="pps-list">
                                        {upcomingAppointments.length === 0 ? (
                                            <li className="pps-list-item" style={{ color: '#888' }}>
                                                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#93c5fd', display: 'inline-block', marginRight: '8px' }}></span>
                                                No upcoming appointments.
                                            </li>
                                        ) : (
                                            upcomingAppointments.map(apt => (
                                                <li key={apt.id} className="pps-list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                        <span style={{ fontWeight: 600, color: '#1e40af' }}>{apt.doctor}</span>
                                                        <span style={{
                                                            fontSize: '11px',
                                                            padding: '2px 8px',
                                                            borderRadius: '12px',
                                                            background: (apt.paymentStatus === 'paid' || apt.paymentStatus === 'completed') ? '#dcfce7' : '#fef9c3',
                                                            color: (apt.paymentStatus === 'paid' || apt.paymentStatus === 'completed') ? '#166534' : '#713f12',
                                                            fontWeight: 500,
                                                        }}>{apt.paymentStatus === 'paid' || apt.paymentStatus === 'completed' ? 'Confirmed' : 'Pending Payment'}</span>
                                                    </div>
                                                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                                                        📅 {apt.date} &nbsp;⏰ {apt.time}
                                                    </div>
                                                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                                                        🏥 {apt.location}
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Health Conditions */}
                        <div className="pps-card" style={{ marginBottom: '24px' }}>
                            <div className="pps-card-header">
                                <h3 className="pps-card-title blue">Health Conditions (Last Time Sync)</h3>
                                <button className="pps-btn-edit" onClick={() => navigate('/patient/dashboard/new-blood-report')}>
                                    New Blood Report
                                </button>
                            </div>
                            <div className="pps-condition-grid">
                                {bloodReport ? (
                                    <>
                                        <div className="pps-condition-item">Blood Sugar Level - {bloodReport.bloodSugar || 'Not recorded'}</div>
                                        <div className="pps-condition-item">Cholesterol - {bloodReport.cholesterol || 'Not recorded'}</div>
                                        <div className="pps-condition-item">Kidney Health - {bloodReport.kidneyHealth || 'Not recorded'}</div>
                                        <div className="pps-condition-item">Thyroid Disorders - {bloodReport.thyroidDisorders || 'Not recorded'}</div>
                                    </>
                                ) : (
                                    <div style={{ color: '#888', gridColumn: 'span 2' }}>No health conditions recorded yet. Click "New Blood Report" to add.</div>
                                )}
                        </div>
                    </div>

                    {/* Doctor Feedback Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '24px' }}>

                            {/* Doctor Feedback */}
                            <div className="pps-card">
                                <div className="pps-card-header">
                                    <h3 className="pps-card-title blue">Doctor Feedback</h3>
                                </div>
                                <div className="pps-feedback-list">
                                    {doctorFeedback.length === 0 ? (
                                        <div className="pps-feedback-item" style={{ color: '#888', textAlign: 'center', padding: '16px' }}>
                                            No doctor feedback available yet.
                                        </div>
                                    ) : (
                                        doctorFeedback.slice().reverse().map((feedback: any, index: number) => (
                                            <div key={feedback._id || index} className="pps-feedback-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                                                <div>
                                                    <div style={{fontWeight: 600, color: '#1e40af'}}>{feedback.doctorName || 'Doctor'}</div>
                                                    <div style={{marginTop: '4px', color: '#475569'}}>{feedback.feedback || feedback.text}</div>
                                                </div>
                                                <button 
                                                    className="pps-btn-view" 
                                                    onClick={() => navigate('/patient/dashboard/prescriptions')} 
                                                    style={{background: '#3b82f6', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '12px'}}
                                                >
                                                    History
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Review Modal */}
                        {isReviewModalOpen && (
                            <div className="pps-modal-overlay">
                                <div className="pps-modal-content">
                                    <h3 className="pps-modal-title">Rate Your Experience</h3>
                                    <p className="pps-modal-subtitle">How was your consultation with <strong>{selectedAppt?.doctor}</strong>?</p>
                                    
                                    <div className="pps-star-rating">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <StarIcon key={s} filled={s <= tempRating} onClick={() => setTempRating(s)} />
                                        ))}
                                    </div>

                                    <textarea 
                                        className="pps-review-textarea"
                                        placeholder="Share your feedback (optional)..."
                                        value={tempComment}
                                        onChange={(e) => setTempComment(e.target.value)}
                                    />

                                    <div className="pps-modal-actions">
                                        <button className="pps-btn-cancel" onClick={() => setIsReviewModalOpen(false)}>Cancel</button>
                                        <button className="pps-btn-submit" onClick={handleSubmitReview}>Submit Review</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </PublicLayout>
    );
};

export default PatientDashboard;
