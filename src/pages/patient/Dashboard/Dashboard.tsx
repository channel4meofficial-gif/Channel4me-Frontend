import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/patient/PatientProfile.css';

const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

const DEFAULT_PROFILE_DATA = {
    firstName: 'Nimal',
    lastName: 'Perera',
    age: '45',
    location: 'Colombo, Sri Lanka',
    guardianFirstName: 'Kumari',
    guardianLastName: 'Perera',
    contactNumber1: '0778518614',
    contactNumber2: '0742107576',
};

const DEFAULT_BLOOD_REPORT = {
    bloodSugar: '85mg/dL',
    cholesterol: '200 mg/dL',
    kidneyHealth: '200 mg/dL',
    thyroidDisorders: '4.0 mIU/L',
};

const DEFAULT_UPCOMING_APPOINTMENTS = [
    { id: '1', time: '5.00 pm', location: 'Roseth Hospital', doctor: 'Dr Sudarshan' },
];

const DEFAULT_DOCTOR_FEEDBACK = [
    {
        id: '1',
        text: "I've reviewed your case and prescribed the needed medicine. Please follow the instructions in the app. Your consultation is complete, and your medication has been updated. Follow the steps shown in the app.",
    },
];

const DEFAULT_RECENT_CONSULTATIONS = [
    { id: '1', date: 'March 15, 2026', doctor: 'Dr. Sudarshan', rating: 0, comment: '' },
    { id: '2', date: 'March 10, 2026', doctor: 'Dr. Perera', rating: 4, comment: 'Great service' },
];

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
    const [profileData, setProfileData] = useState(DEFAULT_PROFILE_DATA);
    const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);
    const [bloodReport, setBloodReport] = useState<{ [key: string]: string }>(DEFAULT_BLOOD_REPORT);
    const [upcomingAppointments, setUpcomingAppointments] = useState(DEFAULT_UPCOMING_APPOINTMENTS);
    const [doctorFeedback, setDoctorFeedback] = useState(DEFAULT_DOCTOR_FEEDBACK);
    const [recentConsultations, setRecentConsultations] = useState(DEFAULT_RECENT_CONSULTATIONS);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState<typeof DEFAULT_RECENT_CONSULTATIONS[0] | null>(null);
    const [tempRating, setTempRating] = useState(0);
    const [tempComment, setTempComment] = useState('');

    useEffect(() => {
        const storedProfileData = localStorage.getItem('patientProfileData');
        if (storedProfileData) {
            try {
                setProfileData(JSON.parse(storedProfileData));
            } catch (e) {
                console.error("Failed to parse patientProfileData", e);
            }
        }

        const storedImage = localStorage.getItem('patientProfileImage');
        if (storedImage) {
            setProfileImage(storedImage);
        }

        const storedBloodReport = localStorage.getItem('patientBloodReport');
        if (storedBloodReport) {
            try {
                setBloodReport(JSON.parse(storedBloodReport));
            } catch (e) {
                console.error("Failed to parse patientBloodReport", e);
            }
        }

        const storedAppointments = localStorage.getItem('patientUpcomingAppointments');
        if (storedAppointments) {
            try {
                setUpcomingAppointments(JSON.parse(storedAppointments));
            } catch (e) {
                console.error("Failed to parse patientUpcomingAppointments", e);
            }
        }

        const storedFeedback = localStorage.getItem('patientDoctorFeedback');
        if (storedFeedback) {
            try {
                setDoctorFeedback(JSON.parse(storedFeedback));
            } catch (e) {
                console.error("Failed to parse patientDoctorFeedback", e);
            }
        }

        const storedRecent = localStorage.getItem('patientRecentConsultations');
        if (storedRecent) {
            try {
                setRecentConsultations(JSON.parse(storedRecent));
            } catch (e) {
                console.error("Failed to parse patientRecentConsultations", e);
            }
        }
    }, []);

    const handleOpenReview = (appt: typeof DEFAULT_RECENT_CONSULTATIONS[0]) => {
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
                                    <h2 className="pps-profile-name">{`${firstName} ${lastName}`}</h2>
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
                                            <span className="label">Guardian Name</span> <span>: {`${guardianFirstName} ${guardianLastName}`.trim()}</span>
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
                                                No upcoming appointments.
                                            </li>
                                        ) : (
                                            upcomingAppointments.map(apt => (
                                                <li key={apt.id} className="pps-list-item">
                                                    <span className="label">{apt.time} at {apt.location}</span>
                                                    <span>: {apt.doctor}</span>
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

                    {/* Recent Consultations & Doctor Feedback Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            {/* Recent Consultations */}
                            <div className="pps-card">
                                <div className="pps-card-header">
                                    <h3 className="pps-card-title blue">Recent Consultations</h3>
                                </div>
                                <ul className="pps-list">
                                    {recentConsultations.map(appt => (
                                        <li key={appt.id} className="pps-list-item" style={{ justifyContent: 'space-between' }}>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{appt.doctor}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>{appt.date}</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {appt.rating > 0 ? (
                                                    <div style={{ display: 'flex', gap: '2px' }}>
                                                        {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= appt.rating} />)}
                                                    </div>
                                                ) : (
                                                    <button className="pps-btn-review" onClick={() => handleOpenReview(appt)}>Review</button>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

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
                                        doctorFeedback.map((feedback) => (
                                            <div key={feedback.id} className="pps-feedback-item">
                                                {feedback.text}
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
