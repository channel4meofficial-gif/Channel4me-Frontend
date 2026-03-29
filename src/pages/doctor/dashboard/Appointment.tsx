import React, { useState, useEffect } from 'react';
import '../../../styles/doctor/dashboard/Appointments.css';
import Header from '../../../components/ui/header/header';
import Footer from '../../../components/ui/footer/footer';
import DoctorSidebar from './DoctorSidebar';
import { useAuth } from '../../../context/AuthContext';

// ── Helpers ────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const labels: any = { Confirmed: 'Confirmed', Pending: 'Pending', Rejected: 'Cancelled', cancelled: 'Cancelled', confirmed: 'Confirmed', pending: 'Pending' };
  const lowerStatus = status?.toLowerCase() || '';
  return <span className={`status-pill ${lowerStatus}`}>{labels[status] ?? status}</span>;
}

function HospitalTag({ name }: { name: string }) {
  const cls = name?.toLowerCase().includes('hemas') ? 'hemas' : 'asiri';
  return <span className={`hosp-tag ${cls}`}>🏥 {name}</span>;
}

const getPatientInitials = (name: string) => {
    if (!name) return "?";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name[0].toUpperCase();
};

const getWeekOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return Math.ceil((date.getDate() + firstDay) / 7);
};

const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};

// ── Component ──────────────────────────────────────────────
export default function Appointment() {
  const { token } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalAppointments: 0, confirmed: 0, pendingApproval: 0 });
  const [isLoading, setIsLoading] = useState(false);

  // Date Nav Logic
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  // Formatters
  const fullDateDisplay = new Intl.DateTimeFormat('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  }).format(selectedDate);

  const shortDateDisplay = new Intl.DateTimeFormat('en-US', {
      month: 'long', day: 'numeric', year: 'numeric' // "January 27, 2025" for titles
  }).format(selectedDate);

  const veryShortDate = new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric' // "Jan 27" for table
  }).format(selectedDate);

  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedDate);
  const weekText = `${isToday(selectedDate) ? 'Today' : dayName} · Week ${getWeekOfMonth(selectedDate)}`;

  useEffect(() => {
    if (!token) return;

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {
            // Adjust to get local YYYY-MM-DD reliably
            const offset = selectedDate.getTimezoneOffset();
            const localDate = new Date(selectedDate.getTime() - (offset*60*1000));
            const dateString = localDate.toISOString().split('T')[0];

            const res = await fetch(`https://api.channel4me.com/api/doctor/appointments?date=${dateString}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            
            if (data.success) {
                setAppointments(data.appointments || []);
                setStats(data.stats || { totalAppointments: 0, confirmed: 0, pendingApproval: 0 });
            }
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchAppointments();
  }, [selectedDate, token]);


  return (
    <div>
      <Header />
      <div className="layout">
        <DoctorSidebar />
        <div className="main">
          <div className="appt-page">

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
                <button className="date-nav-btn" title="Previous Day" onClick={() => changeDate(-1)}>‹</button>

                <div className="date-nav-center">
                  <div className="date-nav-icon">📅</div>
                  <div className="date-nav-text">
                    <div className="date-full">{fullDateDisplay}</div>
                    <div className="date-rel">{weekText}</div>
                  </div>
                </div>

                <button className="date-nav-btn" title="Next Day" onClick={() => changeDate(1)}>›</button>
              </div>

              {/* ── Summary Bar ── */}
              <div className="appt-summary-bar">
                <div className="summary-card">
                  <div className="summary-icon blue">📋</div>
                  <div className="summary-info">
                    <div className="s-label">Total Appointments</div>
                    <div className="s-value">{isLoading ? "..." : stats.totalAppointments}</div>
                    <div className="s-sub">For {shortDateDisplay}</div>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon green">✅</div>
                  <div className="summary-info">
                    <div className="s-label">Confirmed</div>
                    <div className="s-value">{isLoading ? "..." : stats.confirmed}</div>
                    <div className="s-sub">Ready to proceed</div>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon orange">⏳</div>
                  <div className="summary-info">
                    <div className="s-label">Pending Approval</div>
                    <div className="s-value">{isLoading ? "..." : stats.pendingApproval}</div>
                    <div className="s-sub">Awaiting your action</div>
                  </div>
                </div>
              </div>

              {/* ── Appointments List ── */}
              <div className="appt-list-card">

                <div className="appt-list-header">
                  <div>
                    <div className="appt-list-title">Appointments for {shortDateDisplay}</div>
                    <div className="appt-list-meta">{appointments.length} appointment{appointments.length !== 1 ? 's' : ''} shown</div>
                  </div>

                </div>

                {isLoading ? (
                  <div className="appt-empty">
                    <div className="appt-empty-text">Loading appointments...</div>
                  </div>
                ) : appointments.length === 0 ? (
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
                        {appointments.map((a, idx) => {
                          const colors = [
                            { bg: "#eff6ff", text: "#2563eb", grad: "linear-gradient(135deg,#eff6ff,#dbeafe)" },
                            { bg: "#fce7f3", text: "#be185d", grad: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
                            { bg: "#dcfce7", text: "#15803d", grad: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
                            { bg: "#ede9fe", text: "#6d28d9", grad: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
                            { bg: "#ffedd5", text: "#c2410c", grad: "linear-gradient(135deg,#ffedd5,#fed7aa)" }
                          ];
                          const colorSpec = colors[idx % colors.length];

                          return (
                            <tr key={a.bookingId || idx}>
                              {/* Patient */}
                              <td>
                                <div className="pt-cell">
                                  <div className="pt-avatar" style={{ background: colorSpec.grad, color: colorSpec.text }}>
                                    {getPatientInitials(a.patientName)}
                                  </div>
                                  <div>
                                    <div className="pt-name">{a.patientName}</div>
                                    <div className="pt-type">{a.visitType}</div>
                                  </div>
                                </div>
                              </td>

                              {/* Date */}
                              <td>{veryShortDate}</td>

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
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
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
