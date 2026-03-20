import React, { useState } from 'react';
import '../../../styles/doctor/dashboard/Appointments.css';
// ── Sample data ────────────────────────────────────────────
const APPOINTMENTS = [
  {
    id: 1,
    initials: 'MT',
    name: 'MT Dinuka',
    type: 'Follow-up Visit',
    avatarStyle: { background: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', color: '#1d4ed8' },
    time: '12:00 PM',
    hospital: 'Hemas',
    status: 'confirmed',
  },
  {
    id: 2,
    initials: 'AS',
    name: 'Ashani',
    type: 'New Consultation',
    avatarStyle: { background: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#be185d' },
    time: '1:00 PM',
    hospital: 'Asiri',
    status: 'confirmed',
  },
  {
    id: 3,
    initials: 'DL',
    name: 'Dulhara',
    type: 'Routine Check-up',
    avatarStyle: { background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#15803d' },
    time: '3:00 PM',
    hospital: 'Hemas',
    status: 'confirmed',
  },
  {
    id: 4,
    initials: 'JM',
    name: 'James',
    type: 'Initial Consultation',
    avatarStyle: { background: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', color: '#6d28d9' },
    time: '4:00 PM',
    hospital: 'Asiri',
    status: 'confirmed',
  },
  {
    id: 5,
    initials: 'MC',
    name: 'Michael',
    type: 'Follow-up Visit',
    avatarStyle: { background: 'linear-gradient(135deg,#ffedd5,#fed7aa)', color: '#c2410c' },
    time: '5:00 PM',
    hospital: 'Asiri',
    status: 'confirmed',
  },
];


// ── Helpers ────────────────────────────────────────────────
function StatusPill({ status }) {
  const labels = { confirmed: 'Confirmed', pending: 'Pending', cancelled: 'Cancelled' };
  return <span className={`status-pill ${status}`}>{labels[status] ?? status}</span>;
}

function HospitalTag({ name }) {
  const cls = name.toLowerCase();
  return <span className={`hosp-tag ${cls}`}>🏥 {name}</span>;
}

// ── Component ──────────────────────────────────────────────
export default function Appointment() {
  const [activeDay, setActiveDay] = useState(19);
  const filtered = APPOINTMENTS;

  const confirmed = APPOINTMENTS.filter(a => a.status === 'confirmed').length;
  const pending   = APPOINTMENTS.filter(a => a.status === 'pending').length;

  return (
    <div className="appt-page">

      {/* Topbar — reuse the shared topbar from your layout,
          or include it here if Appointments is a standalone page */}

      <div className="appt-content">

        {/* ── Heading ── */}
        <div className="appt-heading">
          <div>
            <h2>📅 Appointments</h2>
            <p className="appt-heading-sub">Manage and track all patient appointments</p>
          </div>
        </div>

        {/* ── Date Navigator ── */}
        <div className="date-nav">
          <button className="date-nav-btn" title="Previous week">‹</button>

          <div className="date-nav-center">
            <div className="date-nav-icon">📅</div>
            <div className="date-nav-text">
              <div className="date-full">Monday, January 19, 2026</div>
              <div className="date-rel">Today · Week 3</div>
            </div>
          </div>

          <button className="date-nav-btn" title="Next week">›</button>
        </div>

        {/* ── Summary Bar ── */}
        <div className="appt-summary-bar">
          <div className="summary-card">
            <div className="summary-icon blue">📋</div>
            <div className="summary-info">
              <div className="s-label">Total Appointments</div>
              <div className="s-value">{APPOINTMENTS.length}</div>
              <div className="s-sub">For January 19, 2026</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon green">✅</div>
            <div className="summary-info">
              <div className="s-label">Confirmed</div>
              <div className="s-value">{confirmed}</div>
              <div className="s-sub">Ready to proceed</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon orange">⏳</div>
            <div className="summary-info">
              <div className="s-label">Pending Approval</div>
              <div className="s-value">{pending}</div>
              <div className="s-sub">Awaiting your action</div>
            </div>
          </div>
        </div>

        {/* ── Appointments List ── */}
        <div className="appt-list-card">

          <div className="appt-list-header">
            <div>
              <div className="appt-list-title">Appointments for January 19, 2026</div>
              <div className="appt-list-meta">{filtered.length} appointment{filtered.length !== 1 ? 's' : ''} shown</div>
            </div>

          </div>

          {filtered.length === 0 ? (
            <div className="appt-empty">
              <div className="appt-empty-icon">🗓️</div>
              <div className="appt-empty-text">No appointments for this day</div>
            </div>
          ) : (
            <div className="appt-table-wrap">
              <table className="appt-table">
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Hospital</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(a => (
                    <tr key={a.id}>

                      {/* Patient */}
                      <td>
                        <div className="pt-cell">
                          <div className="pt-avatar" style={a.avatarStyle}>
                            {a.initials}
                          </div>
                          <div>
                            <div className="pt-name">{a.name}</div>
                            <div className="pt-type">{a.type}</div>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td>Jan 19</td>

                      {/* Time */}
                      <td>
                        <span className="time-chip-appt">
                          <span className="tc-icon">🕐</span>
                          {a.time}
                        </span>
                      </td>

                      {/* Hospital */}
                      <td>
                        <HospitalTag name={a.hospital} />
                      </td>

                      {/* Status */}
                      <td>
                        <StatusPill status={a.status} />
                      </td>



                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
