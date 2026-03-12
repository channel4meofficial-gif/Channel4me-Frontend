import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/doctor/dashboard/PatientList.css';

// ── Patient data ────────────────────────────────────────────
const PATIENTS = [
  {
    id: 1,
    initials: 'MT',
    name: 'M T Dinuka',
    age: 32,
    gender: 'Male',
    condition: 'Migraine',
    hospital: 'Hemas',
    time: '12:00 PM',
    strip: 'blue',
    avatarStyle: { background: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', color: '#1d4ed8' },
  },
  {
    id: 2,
    initials: 'AS',
    name: 'Ashani',
    age: 28,
    gender: 'Female',
    condition: 'Epilepsy',
    hospital: 'Asiri',
    time: '1:00 PM',
    strip: 'pink',
    avatarStyle: { background: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#be185d' },
  },
  {
    id: 3,
    initials: 'DL',
    name: 'Dulhara',
    age: 50,
    gender: 'Female',
    condition: "Parkinson's Disease",
    hospital: 'Hemas',
    time: '3:00 PM',
    strip: 'green',
    avatarStyle: { background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#15803d' },
  },
  {
    id: 4,
    initials: 'JM',
    name: 'James',
    age: 45,
    gender: 'Male',
    condition: 'Ischemic Stroke',
    hospital: 'Asiri',
    time: '4:00 PM',
    strip: 'purple',
    avatarStyle: { background: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', color: '#6d28d9' },
  },
  {
    id: 5,
    initials: 'MC',
    name: 'Michael',
    age: 32,
    gender: 'Male',
    condition: 'Peripheral Neuropathy',
    hospital: 'Asiri',
    time: '5:00 PM',
    strip: 'orange',
    avatarStyle: { background: 'linear-gradient(135deg,#ffedd5,#fed7aa)', color: '#c2410c' },
  },
];

// ── Helpers ─────────────────────────────────────────────────
const HOSPITAL_ICON = { Hemas: '🏥', Asiri: '🏨' };

// PatientCard now receives a navigation handler prop along with the patient object
function PatientCard({ patient, onView }) {
  const genderClass = patient.gender.toLowerCase();
  return (
    <div className="patient-card">
      {/* Colour accent strip */}
      <div className={`patient-card-strip ${patient.strip}`}></div>

      {/* Header: avatar + name */}
      <div className="patient-card-header">
        <div className="patient-avatar-lg" style={patient.avatarStyle}>
          {patient.initials}
        </div>
        <div className="patient-meta">
          <div className="patient-meta-name">{patient.name}</div>
          <div className="patient-meta-row">
            <span className="patient-meta-tag age">🎂 {patient.age} yrs</span>
            <span className={`patient-meta-tag ${genderClass}`}>
              {patient.gender === 'Male' ? '♂' : '♀'} {patient.gender}
            </span>
          </div>
          <div className="patient-id">ID: {patient.id}</div>
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
          <span className="detail-value">{patient.time}</span>
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

  // navigation handler passed down to cards; accepts patient id
  const handleNavigateToPatientsDetails = (id) => {
    navigate(`/doctor/dashboard/patients/${id}`);
  };

  return (
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
              <div className="pl-stat-mini-num">{PATIENTS.length}</div>
              <div className="pl-stat-mini-label">Total Patients</div>
            </div>
          </div>
        </div>

        {/* ── Patient Grid ── */}
        <div className="pl-grid">
          {PATIENTS.length === 0 ? (
            <div className="pl-empty">
              <div className="pl-empty-icon">🔍</div>
              <div className="pl-empty-title">No patients found</div>
              <div className="pl-empty-sub">Try adjusting your search or filters</div>
            </div>
          ) : (
            PATIENTS.map(patient => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onView={() => handleNavigateToPatientsDetails(patient.id)}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}
