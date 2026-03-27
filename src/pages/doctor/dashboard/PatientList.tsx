import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/doctor/dashboard/PatientList.css';
import Header from '../../../components/ui/header/header';
import Footer from '../../../components/ui/footer/footer';
import DoctorSidebar from './DoctorSidebar';
import { useAuth } from '../../../context/AuthContext';

// ── Helpers ─────────────────────────────────────────────────
const HOSPITAL_ICON: any = { Hemas: '🏥', Asiri: '🏨' };

const STRIPS = ['blue', 'pink', 'green', 'purple', 'orange'];
const AVATAR_STYLES = [
  { background: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', color: '#1d4ed8' }, // blue
  { background: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#be185d' }, // pink
  { background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#15803d' }, // green
  { background: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', color: '#6d28d9' }, // purple
  { background: 'linear-gradient(135deg,#ffedd5,#fed7aa)', color: '#c2410c' }  // orange
];

const getPatientInitials = (name: string) => {
    if (!name) return "?";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name[0].toUpperCase();
};

const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// PatientCard Component
function PatientCard({ patient, stripClass, avatarStyle, onView }: any) {
  const genderClass = patient.gender?.toLowerCase() || 'other';
  return (
    <div className="patient-card">
      {/* Colour accent strip */}
      <div className={`patient-card-strip ${stripClass}`}></div>

      {/* Header: avatar + name */}
      <div className="patient-card-header">
        <div className="patient-avatar-lg" style={avatarStyle}>
          {getPatientInitials(patient.patientName)}
        </div>
        <div className="patient-meta">
          <div className="patient-meta-name">{patient.patientName}</div>
          <div className="patient-meta-row">
            <span className="patient-meta-tag age">🎂 {patient.age} yrs</span>
            <span className={`patient-meta-tag ${genderClass}`}>
              {patient.gender === 'Male' ? '♂' : '♀'} {patient.gender}
            </span>
          </div>
          <div className="patient-id">ID: {patient.patientId}</div>
        </div>
      </div>

      <div className="patient-card-divider"></div>

      {/* Details */}
      <div className="patient-card-details">
        <div className="detail-row">
          <span className="detail-label">
            <span className="detail-label-icon">🧬</span> Condition
          </span>
          <span className="detail-value condition">{patient.condition}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">
            <span className="detail-label-icon">🏥</span> Hospital
          </span>
          <span className="detail-value">
            {HOSPITAL_ICON[patient.hospital] ?? '🏥'} {patient.hospital}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">
            <span className="detail-label-icon">🕐</span> Appointment
          </span>
          <span className="detail-value">{formatTime(patient.appointmentTime)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="patient-card-footer">
        <button className="btn-view-patient" onClick={onView}>
          👁 View Patient
        </button>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function PatientList() {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) return;

    const fetchPatients = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/doctor/my-patients', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.success) {
          setPatients(data.patients || []);
        }
      } catch (err) {
        console.error("Failed to fetch patients:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  // navigation handler passed down to cards; accepts patient id
  const handleNavigateToPatientsDetails = (id: string) => {
    navigate(`/doctor/dashboard/patients/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="layout">
        <DoctorSidebar />
        <div className="main">
          <div className="pl-page">
            <div className="pl-content">

              {/* ── Heading ── */}
              <div className="pl-heading">
                <div className="pl-heading-left">
                  <h2>👥 My Patients</h2>
                  <p>All patients under your care — view and manage records</p>
                </div>
              </div>

              {/* ── Stats Strip ── */}
              <div className="pl-stats-strip">
                <div className="pl-stat-mini">
                  <div className="pl-stat-mini-icon blue">👥</div>
                  <div>
                    <div className="pl-stat-mini-num">{isLoading ? "..." : patients.length}</div>
                    <div className="pl-stat-mini-label">Total Patients</div>
                  </div>
                </div>
              </div>

              {/* ── Patient Grid ── */}
              <div className="pl-grid">
                {isLoading ? (
                  <div className="pl-empty">
                    <div className="pl-empty-title">Loading patients...</div>
                  </div>
                ) : patients.length === 0 ? (
                  <div className="pl-empty">
                    <div className="pl-empty-icon">🔍</div>
                    <div className="pl-empty-title">No patients found</div>
                    <div className="pl-empty-sub">Try adjusting your search or filters</div>
                  </div>
                ) : (
                  patients.map((patient, index) => {
                    // Loop through CSS strip color classes: 0=blue, 1=pink, 2=green, 3=purple, 4=orange
                    const colorIndex = index % STRIPS.length;
                    const stripClass = STRIPS[colorIndex];
                    const avatarStyle = AVATAR_STYLES[colorIndex];

                    return (
                      <PatientCard
                        key={patient.patientId || index}
                        patient={patient}
                        stripClass={stripClass}
                        avatarStyle={avatarStyle}
                        onView={() => handleNavigateToPatientsDetails(patient.patientId)}
                      />
                    );
                  })
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
