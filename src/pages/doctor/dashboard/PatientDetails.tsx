import { useNavigate, useParams } from 'react-router-dom';
import '../../../styles/doctor/dashboard/PatientDetails.css';
import React, { useState } from 'react';



interface HealthCondition {
  dot: string;
  icon: string;
  name: string;
  value: string;
}

interface EmergencyContact {
  guardian: string;
  contact1: string;
  contact2: string;
}

interface Feedback {
  id: number;
  color: string;
  text: string;
  time: string;
}

interface Patient {
  id: number;
  initials: string;
  name: string;
  age: string | number;
  gender: string;
  address: string;
  hospital: string;
  nextAppt: string;
  bloodType: string;
  emergency: EmergencyContact;
  healthConditions: HealthCondition[];
  feedback: Feedback[];
}

const PATIENTS: Patient[] = [
{
  id: 1,
  initials: 'MT',
  name: 'DT Dinuka',
  age: '-',
  gender: 'Male',
  address: 'N/A',
  hospital: 'N/A',
  nextAppt: '-',
  bloodType: 'O+',
  emergency: {
    guardian: 'Thisara Perera',
    contact1: '0766 579 841',
    contact2: '0785 238 219',
  },
  healthConditions: [
     { name: 'Blood Pressure',    value: '120/80 mmHg', dot: 'purple', icon: '❤️' },
  ],
  feedback: [
    {
      id: 1,
      text: "I've reviewed your case and prescribed the needed medicine. Please follow the instructions in the app.",
      time: 'Jan 19, 2026 · 12:30 PM',
      color: 'blue',
    }
  ]
},
{
  id: 2,
  initials: 'AS',
  name: 'Ashani',
  age: '-',
  gender: 'Male',
  address: 'N/A',
  hospital: 'N/A',
  nextAppt: '-',
  bloodType: '-',
  emergency: {
    guardian: 'Upali',
    contact1: '0766 579 841',
    contact2: '0785 238 219',
  },
  healthConditions: [
        { name: 'Thyroid Disorders', value: '4.0 mIU/L',  dot: 'orange', icon: '🔬' },
   
  ],
  feedback: [
    {
      id: 2,
      text: 'Your consultation is complete, and your medication has been updated. Follow the steps shown in the app.',
      time: 'Jan 15, 2026 · 10:00 AM',
      color: 'green',
    }
  ]
},
{
  id: 3,
  initials: 'Du',
  name: 'Dulhara',
  age: '-',
  gender: 'Male',
  address: 'N/A',
  hospital: 'N/A',
  nextAppt: '-',
  bloodType: '-',
  emergency: {
    guardian: 'Hulawa',
    contact1: '0766 579 841',
    contact2: '0785 238 219',
  },
  healthConditions: [
        { name: 'Cholesterol',       value: '200 mg/dL',  dot: 'blue',   icon: '💉' },

  ],
  feedback: []
},
{
  id: 4,
  initials: 'JA',
  name: 'James',
  age: '-',
  gender: 'Male',
  address: 'N/A',
  hospital: 'N/A',
  nextAppt: '-',
  bloodType: '-',
  emergency: {
    guardian: 'Wiliams',
    contact1: '0766 579 841',
    contact2: '0785 238 219',
  },
  healthConditions: [
    { name: 'Blood Sugar Level', value: '85 mg/dL',   dot: 'green',  icon: '🩸' },
  ],
  feedback: []
},
{
  id: 5,
  initials: 'MI',
  name: 'Michael',
  age: '-',
  gender: 'Male',
  address: 'N/A',
  hospital: 'N/A',
  nextAppt: '-',
  bloodType: '-',
  emergency: {
    guardian: 'Smith',
    contact1: '0766 579 841',
    contact2: '0785 238 219',
  },
  healthConditions: [
    { name: 'Blood Sugar Level', value: '85 mg/dL',   dot: 'green',  icon: '🩸' },
  ],
  feedback: []
}
 
];

// ── Default sample patient (used if lookup fails) ─────────────
const FALLBACK_PATIENT: Patient = {
  id: 1,
  initials: '--',
  name: 'Mock Patient',
  age: '10',
  gender: 'Male',
  address: 'N/A',
  hospital: 'N/A',
  nextAppt: '-',
  bloodType: '-',
  emergency: {
    guardian: '-',
    contact1: '-',
    contact2: '-',
  },
  healthConditions: [],
  feedback: []
};

// ── Sub-components ──────────────────────────────────────────
function SectionCard({ iconBg, icon, title, sub, children }) {
  return (
    <div className="pd-section-card">
      <div className="pd-card-header">
        <div className={`pd-card-header-icon ${iconBg}`}>{icon}</div>
        <div>
          <div className="pd-card-title">{title}</div>
          {sub && <div className="pd-card-sub">{sub}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────
export default function PatientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const patientId = Number(id);

  // find matching patient using the shared list
  const p = PATIENTS.find(pt => pt.id === patientId) ||  FALLBACK_PATIENT;
  const genderClass = p.gender.toLowerCase();

  const handleNavigateToPatientsDetails = () => {
    navigate('/doctor/dashboard/patients');
  };

  return (
    <div className="pd-page">
      <div className="pd-content">

          {/* ── Breadcrumb / Back ── */}
        <div className="pd-breadcrumb">
          <button className="pd-back-btn" onClick={handleNavigateToPatientsDetails}>
            ← Back
          </button>
          <div className="pd-breadcrumb-trail">
            My Patients › <span>{p.name}</span>
          </div>
        </div>

        {/* ── Top Row: Profile + Right Column ── */}
        <div className="pd-top-row">

          {/* Profile Card */}
          <div className="pd-profile-card">
            <div className="pd-profile-banner">
              <div className="pd-profile-banner-pattern"></div>
            </div>

            <div className="pd-avatar-wrap">
              <div className="pd-avatar">{p.initials}</div>
              <div className="pd-avatar-online" title="Active"></div>
            </div>

            <div className="pd-profile-body">
              <div className="pd-patient-name">{p.name}</div>

              <div className="pd-patient-tags">
                <span className="pd-tag age">🎂 {p.age} yrs</span>
                <span className={`pd-tag ${genderClass}`}>
                  {p.gender === 'Male' ? '♂' : '♀'} {p.gender}
                </span>
                <span className="pd-tag id">ID: {p.id}</span>
              </div>

              <div className="pd-address">
                📍 {p.address}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="pd-right-col">

            {/* Quick info chips */}
            <div className="pd-quick-info">
              <div className="pd-info-chip">
                <div className="pd-info-chip-icon blue">🏥</div>
                <div>
                  <div className="pd-info-chip-label">Hospital</div>
                  <div className="pd-info-chip-value">{p.hospital}</div>
                </div>
              </div>
              <div className="pd-info-chip">
                <div className="pd-info-chip-icon green">🩸</div>
                <div>
                  <div className="pd-info-chip-label">Blood Type</div>
                  <div className="pd-info-chip-value">{p.bloodType}</div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="pd-emergency-card">
              <div className="pd-card-header">
                <div className="pd-card-header-icon red">🚨</div>
                <div>
                  <div className="pd-card-title">Emergency Contact</div>
                  <div className="pd-card-sub">Guardian &amp; backup contacts</div>
                </div>
              </div>
              <div className="pd-emergency-list">
                <div className="pd-emergency-row">
                  <div className="pd-emerg-dot red"></div>
                  <span className="pd-emerg-label">👤 Guardian Name</span>
                  <span className="pd-emerg-value">{p.emergency.guardian}</span>
                </div>
                <div className="pd-emergency-row">
                  <div className="pd-emerg-dot blue"></div>
                  <span className="pd-emerg-label">📞 Contact 1</span>
                  <span className="pd-emerg-value">{p.emergency.contact1}</span>
                </div>
                <div className="pd-emergency-row">
                  <div className="pd-emerg-dot green"></div>
                  <span className="pd-emerg-label">📞 Contact 2</span>
                  <span className="pd-emerg-value">{p.emergency.contact2}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Health Conditions ── */}
        <SectionCard
          iconBg="blue"
          icon="🧬"
          title="Health Conditions"
          sub="Last synced from wearable & lab results"
        >
          <div className="pd-health-grid">
            {p.healthConditions.map((h, i) => (
              <div className="pd-health-item" key={i}>
                <div className={`pd-health-dot ${h.dot}`}></div>
                <div>
                  <div className="pd-health-name">{h.icon} {h.name}</div>
                  <div className="pd-health-val">{h.value}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Doctor Feedback ── */}
        <SectionCard
          iconBg="green"
          icon="💬"
          title="Doctor Feedback"
          sub="Your notes and prescriptions for this patient"
        >
          <div className="pd-feedback-list">
            {p.feedback.map(f => (
              <div className={`pd-feedback-item ${f.color}`} key={f.id}>
                <div className="pd-feedback-icon">
                  {f.color === 'green' ? '✓' : '💊'}
                </div>
                <div>
                  <div className="pd-feedback-text">{f.text}</div>
                  <div className="pd-feedback-time">🕐 {f.time}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
