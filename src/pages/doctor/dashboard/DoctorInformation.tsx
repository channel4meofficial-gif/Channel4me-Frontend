import { useNavigate } from 'react-router-dom';
import '../../../styles/doctor/dashboard/DcotorInformation.css';

function DoctorInformation() {
  const navigate = useNavigate();

  const handleNavigateToPatients = () => {
    navigate('/doctor/dashboard/patients');
  };

  const handleNavigateToAppointments = () => {
    navigate('/doctor/dashboard/appointments');
  };

  return (
  <div className="layout">

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">💊</div>
          <div className="logo-text">Channel<span>4Me</span></div>
        </div>

        <span className="nav-label">Main Menu</span>
        <a className="nav-item active" href="#">
          <span className="nav-icon">🏠</span> Dashboard
        </a>
        <a className="nav-item" href="#"   onClick={e => { e.preventDefault(); handleNavigateToAppointments(); }}>
          <span className="nav-icon">📅</span> Appointments
          <span className="nav-badge">5</span>
        </a>
        <a className="nav-item" href="#" onClick={e => { e.preventDefault(); handleNavigateToPatients(); }}>
          <span className="nav-icon">👥</span> My Patients
        </a>

        <div className="sidebar-bottom">
          <div className="doctor-card">
            <div className="doctor-avatar">EW</div>
            <div className="doctor-info">
              <div className="name">Dr. Emma Wilson</div>
              <div className="role">Neurologist</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="main">

        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-welcome">
            <h1>Good Morning, <span>Dr. Emma Wilson</span> 👋</h1>
            <p>Monday, 27 January 2025 &nbsp;·&nbsp; You have 5 appointments today</p>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <span>🔍</span>
              <input type="text" placeholder="Search patients, records…" />
            </div>
            <button className="icon-btn" title="Notifications">
              🔔
              <span className="dot"></span>
            </button>
            <button className="icon-btn" title="Help">❓</button>
          </div>
        </header>

        {/* Content */}
        <div className="content">

          {/* Quick Schedule Banner */}
          <div className="schedule-bar">
            <span className="schedule-bar-icon">⏰</span>
            <div className="schedule-bar-text">
              <div className="t1">Next Appointment in 45 minutes</div>
              <div className="t2">MT Dinuka · Hemas Hospital · 12:00 PM</div>
            </div>
            <button className="schedule-bar-btn">View Details →</button>
          </div>

          {/* Stat Cards */}
          <div className="stats-row">

            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <div className="stat-label">Today's Appointments</div>
                </div>
                <div className="stat-icon">📅</div>
              </div>
              <div>
                <div className="stat-value">5</div>
                <div className="stat-sub"><strong>5 scheduled</strong> for today</div>
              </div>
            </div>

            <div className="stat-card green">
              <div className="stat-top">
                <div>
                  <div className="stat-label">Total Patients</div>
                </div>
                <div className="stat-icon">👥</div>
              </div>
              <div>
                <div className="stat-value">6,000</div>
                <div className="stat-sub"><strong>+12 new</strong> this month</div>
              </div>
            </div>

            <div className="stat-card orange">
              <div className="stat-top">
                <div>
                  <div className="stat-label">Your Rating</div>
                </div>
                <div className="stat-icon">⭐</div>
              </div>
              <div>
                <div className="stat-value">4.8</div>
                <div className="stat-sub">Based on <strong>180 reviews</strong></div>
              </div>
            </div>

          </div>

          {/* Bottom Row */}
          <div className="bottom-row">

            {/* Appointments Table */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Today's Appointments</div>
                  <div className="card-sub">January 27, 2025 — 3 of 5 shown</div>
                </div>
                <button className="view-all" onClick={handleNavigateToAppointments}>View All →</button>
              </div>
              <div className="table-wrap">
                <table>
                  <colgroup>
                    <col style={{ width: '260px' }} />
                    <col style={{ width: '100px' }} />
                    <col style={{ width: '130px' }} />
                    <col style={{ width: '140px' }} />
                    <col style={{ width: '140px' }} />
                    <col style={{ width: '56px' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Hospital</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="patient-cell">
                          <div className="patient-avatar">MT</div>
                          <div>
                            <div className="patient-name">MT Dinuka</div>
                            <div className="patient-detail">Follow-up Visit</div>
                          </div>
                        </div>
                      </td>
                      <td>Jan 27</td>
                      <td><span className="time-chip">12:00 PM</span></td>
                      <td><span className="hospital-tag hemas">🏥 Hemas</span></td>
                      <td><span className="status-badge confirmed">Confirmed</span></td>
                      <td><button className="action-btn view" title="View">👁</button></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="patient-cell">
                          <div
                            className="patient-avatar"
                            style={{ background: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#be185d' }}
                          >
                            AS
                          </div>
                          <div>
                            <div className="patient-name">Ashani</div>
                            <div className="patient-detail">New Consultation</div>
                          </div>
                        </div>
                      </td>
                      <td>Jan 27</td>
                      <td><span className="time-chip">1:00 PM</span></td>
                      <td><span className="hospital-tag asiri">🏥 Asiri</span></td>
                      <td><span className="status-badge pending">Pending</span></td>
                      <td><button className="action-btn view" title="View">👁</button></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="patient-cell">
                          <div
                            className="patient-avatar"
                            style={{ background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)', color: '#15803d' }}
                          >
                            DL
                          </div>
                          <div>
                            <div className="patient-name">Dulhara</div>
                            <div className="patient-detail">Routine Check-up</div>
                          </div>
                        </div>
                      </td>
                      <td>Jan 27</td>
                      <td><span className="time-chip">3:00 PM</span></td>
                      <td><span className="hospital-tag hemas">🏥 Hemas</span></td>
                      <td><span className="status-badge confirmed">Confirmed</span></td>
                      <td><button className="action-btn view" title="View">👁</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notifications */}
            <div className="card notif-card">
              <div className="card-header">
                <div>
                  <div className="card-title">Notifications</div>
                  <div className="card-sub">Latest updates for you</div>
                </div>
                <button className="view-all">Mark all read</button>
              </div>
              <div className="notif-list">

                <div className="notif-item">
                  <div className="notif-dot blue"></div>
                  <div className="notif-body">
                    <div className="notif-title">New Appointment Request</div>
                    <div className="notif-msg">MT Dinuka has requested an appointment for today at 12:00 PM.</div>
                    <div className="notif-time">2 minutes ago</div>
                  </div>
                </div>

                <div className="notif-item">
                  <div className="notif-dot red"></div>
                  <div className="notif-body">
                    <div className="notif-title">🚨 Emergency Alert</div>
                    <div className="notif-msg">Patient Dulhara requires immediate attention at Hemas Hospital.</div>
                    <div className="notif-time">15 minutes ago</div>
                  </div>
                </div>

                <div className="notif-item">
                  <div className="notif-dot orange"></div>
                  <div className="notif-body">
                    <div className="notif-title">Pending Confirmation</div>
                    <div className="notif-msg">Ashani's appointment is awaiting your confirmation.</div>
                    <div className="notif-time">30 minutes ago</div>
                  </div>
                </div>

                <div className="notif-item">
                  <div className="notif-dot green"></div>
                  <div className="notif-body">
                    <div className="notif-title">New Review Received</div>
                    <div className="notif-msg">A patient left you a 5-star review. Your rating is now 4.8.</div>
                    <div className="notif-time">1 hour ago</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        {/* /content */}
      </div>
      {/* /main */}
    </div>
    /* /layout */
  );
}

export default DoctorInformation;