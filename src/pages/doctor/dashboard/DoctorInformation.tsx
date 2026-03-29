import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/doctor/dashboard/DcotorInformation.css";
import Header from "../../../components/ui/header/header";
import Footer from "../../../components/ui/footer/footer";
import DoctorSidebar from "./DoctorSidebar";
import { useAuth } from "../../../context/AuthContext";

function DoctorInformation() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Nice date formatting
  const todayDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const doctorName = user?.name || "Doctor";
  const displayDoctorName = doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`;

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      
      try {
        setIsLoading(true);
        const [statsRes, apptsRes] = await Promise.all([
          fetch("https://api.channel4me.com/api/doctor/dashboard-stats", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("https://api.channel4me.com/api/doctor/appointments", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const statsData = await statsRes.json();
        const apptsData = await apptsRes.json();

        if (statsData.success) {
          setDashboardStats(statsData.data);
        }
        if (apptsData.success) {
          setAppointments(apptsData.appointments || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleNavigateToAppointments = () => {
    navigate("/doctor/dashboard/appointments");
  };

  // Helper for dynamic patient initials
  const getPatientInitials = (name: string) => {
    if (!name) return "?";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name[0].toUpperCase();
  };

  // Fallbacks if data is still loading
  const todaysAppointmentsCount = dashboardStats?.todaysAppointments || 0;
  const totalPatientsCount = dashboardStats?.totalPatients || 0;
  const ratingAverage = dashboardStats?.yourRating?.average || 0;
  const ratingTotalReviews = dashboardStats?.yourRating?.totalReviews || 0;

  // Since backend doesn't provide monthly difference, mock "+0 new" 
  const monthlyChange = 0; 

  const shownAppointments = appointments.slice(0, 3);

  return (
    <div>
      <Header />
      <div className="layout">
        {/* ── Sidebar ── */}
        <DoctorSidebar />

        {/* ── Main Area ── */}
        <div className="main">
          {/* Topbar */}
          <header className="topbar">
            <div className="topbar-welcome">
              <h1>
                {getGreeting()}, <span>{displayDoctorName}</span> 👋
              </h1>
              <p>
                {todayDate} &nbsp;·&nbsp; You have {todaysAppointmentsCount} appointment{todaysAppointmentsCount !== 1 ? 's' : ''} today
              </p>
            </div>
          </header>

          {/* Content */}
          <div className="content">
            {isLoading ? (
               <div style={{ padding: '20px', textAlign: 'center' }}>Loading dashboard data...</div>
            ) : (
              <>
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
                      <div className="stat-value">{todaysAppointmentsCount}</div>
                      <div className="stat-sub">
                        <strong>{todaysAppointmentsCount} scheduled</strong> for today
                      </div>
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
                      <div className="stat-value">{totalPatientsCount.toLocaleString()}</div>
                      <div className="stat-sub">
                        <strong>+{monthlyChange} new</strong> this month
                      </div>
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
                      <div className="stat-value">{ratingAverage.toFixed(1)}</div>
                      <div className="stat-sub">
                        Based on <strong>{ratingTotalReviews} review{ratingTotalReviews !== 1 ? 's' : ''}</strong>
                      </div>
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
                        <div className="card-sub">
                          {todayDate.split(', ')[1]} — {shownAppointments.length} of {appointments.length} shown
                        </div>
                      </div>
                      <button
                        className="view-all"
                        onClick={handleNavigateToAppointments}
                      >
                        View All →
                      </button>
                    </div>
                    <div className="table-wrap">
                      {appointments.length === 0 ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                           No appointments scheduled for today.
                        </div>
                      ) : (
                        <table>
                          <colgroup>
                            <col style={{ width: "260px" }} />
                            <col style={{ width: "100px" }} />
                            <col style={{ width: "130px" }} />
                            <col style={{ width: "140px" }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>Patient</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Hospital</th>
                            </tr>
                          </thead>
                          <tbody>
                            {shownAppointments.map((appt, idx) => {
                              // Cycle backgrounds creatively using index
                              const colors = [
                                { bg: "#eff6ff", text: "#2563eb", grad: "linear-gradient(135deg,#eff6ff,#dbeafe)" },
                                { bg: "#fce7f3", text: "#be185d", grad: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
                                { bg: "#dcfce7", text: "#15803d", grad: "linear-gradient(135deg,#dcfce7,#bbf7d0)" }
                              ];
                              const colorSpec = colors[idx % colors.length];

                              return (
                                <tr key={appt.bookingId || idx}>
                                  <td>
                                    <div className="patient-cell">
                                      <div
                                        className="patient-avatar"
                                        style={{ background: colorSpec.grad, color: colorSpec.text }}
                                      >
                                        {getPatientInitials(appt.patientName)}
                                      </div>
                                      <div>
                                        <div className="patient-name">{appt.patientName}</div>
                                        <div className="patient-detail">
                                          {appt.visitType}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{appt.date.split(' 202')[0]}</td>
                                  <td>
                                    <span className="time-chip">{appt.time}</span>
                                  </td>
                                  <td>
                                    <span className={`hospital-tag ${appt.hospital?.toLowerCase().includes('hemas') ? 'hemas' : 'asiri'}`}>
                                      🏥 {appt.hospital}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
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
                    <div className="notif-list" style={{ minHeight: '200px' }}>
                      {notifications.length === 0 ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b' }}>
                           No notifications
                        </div>
                      ) : (
                        notifications.map((notif, index) => (
                           <div className="notif-item" key={index}>
                             <div className={`notif-dot ${notif.color || "blue"}`}></div>
                             <div className="notif-body">
                               <div className="notif-title">{notif.title}</div>
                               <div className="notif-msg">{notif.message}</div>
                               <div className="notif-time">{notif.time}</div>
                             </div>
                           </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* /content */}
        </div>
        {/* /main */}
      </div>
      {/* layout  */}
      <Footer />
    </div>
  );
}

export default DoctorInformation;
