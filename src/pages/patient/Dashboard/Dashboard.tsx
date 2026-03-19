import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import '../../../styles/patient/PatientProfile.css';

const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const DEFAULT_PROFILE_DATA = {
    firstName: 'Cristiano',
    lastName: 'Ronaldo',
    age: '40',
    location: 'Riyadh, Saudi Arabia',
    guardianFirstName: 'Dolores',
    guardianLastName: 'Aveiro',
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
    const [profileData, setProfileData] = useState(DEFAULT_PROFILE_DATA);
    const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);
    const [bloodReport, setBloodReport] = useState<{ [key: string]: string }>(DEFAULT_BLOOD_REPORT);
    const [upcomingAppointments, setUpcomingAppointments] = useState(DEFAULT_UPCOMING_APPOINTMENTS);
    const [doctorFeedback, setDoctorFeedback] = useState(DEFAULT_DOCTOR_FEEDBACK);

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
    }, []);

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

                        {/* Doctor Feedback */}
                        <div className="pps-card pps-feedback-card">
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
                </main>
            </div>
        </PublicLayout>
    );
};

export default PatientDashboard;
