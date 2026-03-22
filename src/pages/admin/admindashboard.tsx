import React, { useState, useEffect } from 'react';
import '../../styles/admin/admindashboard.css';
import Header from '../../components/ui/header/header';
import Footer from '../../components/ui/footer/footer';
import { useAuth } from '../../context/AuthContext';

const API_BASE = "http://localhost:5000/api/admin";

// Helper: get stored JWT token
const getToken = () => localStorage.getItem('token') || '';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ totalPatients: 0, todaysAppointments: 0, pendingDoctors: 0 });
    const [notifications, setNotifications] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [pendingDoctors, setPendingDoctors] = useState<any[]>([]);

    // Functions moved above useEffect to fix TS2448

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_BASE}/dashboard-stats`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            const data = await res.json();
            if (data.success) setStats(data.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const res = await fetch(`${API_BASE}/notifications`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            const data = await res.json();
            if (data.success) setNotifications(data.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const res = await fetch(`${API_BASE}/appointments`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            const data = await res.json();
            if (data.success) setAppointments(data.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    const fetchPendingDoctors = async () => {
        try {
            const res = await fetch(`${API_BASE}/doctors/pending`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            const data = await res.json();
            if (data.success) setPendingDoctors(data.data);
        } catch (error) {
            console.error("Error fetching pending doctors:", error);
        }
    };

    const handleDoctorAction = async (id: string, action: 'approve' | 'reject') => {
        try {
            const res = await fetch(`${API_BASE}/doctors/${id}/${action}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            const data = await res.json();
            if (data.success) {
                // Remove the doctor from the list after action
                setPendingDoctors(prev => prev.filter(doc => doc._id !== id));
                // Update stats
                fetchStats();
            } else {
                alert("Failed to perform action: " + data.message);
            }
        } catch (error) {
            console.error("Error performing action:", error);
            alert("Error performing action");
        }
    };

    useEffect(() => {
        fetchStats();
        fetchNotifications();
        fetchAppointments();
        fetchPendingDoctors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Header/>
            <div className="admin-page">
                <aside className="admin-sidebar">

                    <div className="sidebar-section">
                        <span className="sidebar-heading">MAIN MENU</span>
                        <div className="sidebar-menu">
                            <button
                                className={`menu-btn ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                <span className="menu-icon">🏠</span> Dashboard
                            </button>
                            <button
                                className={`menu-btn ${activeTab === 'appointments' ? 'active' : ''}`}
                                onClick={() => setActiveTab('appointments')}
                            >
                                <div className="menu-item-content">
                                    <span className="menu-icon">📅</span> Appointments
                                </div>
                                <span className="menu-badge">{stats.todaysAppointments}</span>
                            </button>
                            <button
                                className={`menu-btn ${activeTab === 'approvals' ? 'active' : ''}`}
                                onClick={() => setActiveTab('approvals')}
                            >
                                <span className="menu-icon">👥</span> Doctor Approvals
                                {stats.pendingDoctors > 0 && <span className="menu-badge" style={{backgroundColor: '#ff9800'}}>{stats.pendingDoctors}</span>}
                            </button>
                        </div>
                    </div>

                    <div className="sidebar-footer">
                        <div className="profile-badge">
                            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
                        </div>
                        <div className="profile-info">
                            <span className="profile-name">{user?.name || 'Admin User'}</span>
                            <span className="profile-role">Administrator</span>
                        </div>
                    </div>
                </aside>

                <main className="admin-main">
                    <header className="main-header">
                        <div className="header-greeting">
                            <h1>Good Morning, <span>{user?.name || 'Admin'}</span> 👋</h1>
                            <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </header>

                    <div className="admin-content-wrapper">
                        {activeTab === 'overview' && <OverviewTab stats={stats} notifications={notifications} />}
                        {activeTab === 'appointments' && <AppointmentsTab appointments={appointments} />}
                        {activeTab === 'approvals' && <DoctorApprovalsTab pendingDoctors={pendingDoctors} onAction={handleDoctorAction} />}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

const OverviewTab = ({ stats, notifications }: { stats: any, notifications: any[] }) => (
    <div className="dashboard-content">
        <div className="stat-cards-container">
            <div className="stat-card border-blue">
                <div className="stat-header">
                    <h3>TODAY'S APPOINTMENTS</h3>
                    <div className="stat-icon bg-blue">📅</div>
                </div>
                <p className="card-value">{stats.todaysAppointments}</p>
                <span className="card-trend text-blue"><strong>{stats.todaysAppointments} scheduled</strong> for today</span>
            </div>
            <div className="stat-card border-green">
                <div className="stat-header">
                    <h3>TOTAL PATIENTS</h3>
                    <div className="stat-icon bg-green">👥</div>
                </div>
                <p className="card-value">{stats.totalPatients}</p>
                <span className="card-trend text-green">Total registered patients</span>
            </div>
            <div className="stat-card border-orange">
                <div className="stat-header">
                    <h3>PENDING APPROVALS</h3>
                    <div className="stat-icon bg-orange">⭐</div>
                </div>
                <p className="card-value">{stats.pendingDoctors}</p>
                <span className="card-trend text-orange">Requires review</span>
            </div>
        </div>

        <div className="dashboard-bottom">
            <div className="dashboard-notifications full-width">
                <div className="board-header">
                    <div>
                        <h2>Notifications</h2>
                        <p>Latest updates for you</p>
                    </div>
                </div>
                <div className="notification-list">
                    {notifications.length > 0 ? (
                        notifications.map(notif => (
                            <div className="notification-item" key={notif.id}>
                                <div className="notif-dot green"></div>
                                <div className="notif-content">
                                    <h4>Booking Notification</h4>
                                    <p>{notif.message}</p>
                                    <span>{new Date(notif.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state" style={{padding: '20px', color: '#666'}}>No new notifications.</div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const AppointmentsTab = ({ appointments }: { appointments: any[] }) => {
    const getInitials = (name: string) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <div className="dashboard-content">
            <div className="dashboard-table-container full-width">
                <div className="board-header">
                    <div>
                        <h2>All Appointments</h2>
                        <p>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} — {appointments.length} total shown</p>
                    </div>
                </div>

                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>PATIENT</th>
                            <th>DOCTOR</th>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th>HOSPITAL</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((app, index) => {
                                const colors = ['blue', 'pink', 'green'];
                                const colorClass = colors[index % colors.length];
                                const appDate = app.date_and_time ? new Date(app.date_and_time) : new Date();
                                const doctorName = app.doctor_id ? app.doctor_id.fullName : "Unknown Doctor";
                                const doctorSpec = app.doctor_id ? app.doctor_id.specialization : "Specialist";

                                return (
                                    <tr key={app._id}>
                                        <td>
                                            <div className="app-user">
                                                <div className={`app-initials avatar-${colorClass}`}>{getInitials(app.patientName)}</div>
                                                <div className="user-details-group">
                                                    <span className="app-name">{app.patientName}</span>
                                                    <span className="app-subtitle">{app.visit_type || 'Consultation'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="app-user">
                                                <div className={`app-initials avatar-${colorClass}`}>{getInitials(doctorName)}</div>
                                                <div className="user-details-group">
                                                    <span className="app-name">{doctorName}</span>
                                                    <span className="app-subtitle">{doctorSpec}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="font-medium">{appDate.toLocaleDateString()}</td>
                                        <td className="font-medium">🕒 {appDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td><span className="hospital-pill">🏥 {app.hospital}</span></td>
                                        <td><span className={`status-badge badge-${app.appointment_status?.toLowerCase() || 'pending'}`}>{app.appointment_status || 'Pending'}</span></td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} style={{textAlign: 'center', padding: '30px', color: '#666'}}>No appointments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const DoctorApprovalsTab = ({ pendingDoctors, onAction }: { pendingDoctors: any[], onAction: (id: string, action: 'approve' | 'reject') => void }) => {
    
    const getInitials = (name: string) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <div className="tab-section">
            <h1 className="section-title">DOCTOR REGISTRATIONS</h1>
            <p className="section-subtitle">Verify doctor certificates before accepting them into the platform.</p>

            <div className="approvals-board">
                <table className="approvals-table">
                    <thead>
                        <tr>
                            <th>Doctor Name</th>
                            <th>Specialty</th>
                            <th>Exp.</th>
                            <th>Applied Date</th>
                            <th>Certificate Docs</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingDoctors.length > 0 ? (
                            pendingDoctors.map(doc => {
                                const docName = doc.fullName || doc.name || 'Unknown';
                                const certUrl = doc.documents && doc.documents.length > 0 && doc.documents[0].filePath
                                    ? `http://localhost:5000/${doc.documents[0].filePath.replace(/\\/g, '/')}`
                                    : null;
                                const certName = doc.documents && doc.documents.length > 0 && doc.documents[0].originalName
                                    ? doc.documents[0].originalName
                                    : 'No Document';

                                return (
                                    <tr key={doc._id}>
                                        <td>
                                            <div className="doc-info">
                                                <div className="doc-avatar">{getInitials(docName)}</div>
                                                <span className="doc-name">{docName}</span>
                                            </div>
                                        </td>
                                        <td>{doc.specialization || 'N/A'}</td>
                                        <td>{doc.yearsOfExperience ? doc.yearsOfExperience + ' Yrs' : 'N/A'}</td>
                                        <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {certUrl ? (
                                                <a href={certUrl} target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                                                    <button className="view-cert-btn" type="button" style={{cursor: 'pointer'}}>
                                                        📄 View {certName.length > 15 ? certName.substring(0, 15) + '...' : certName}
                                                    </button>
                                                </a>
                                            ) : (
                                                <span>No docs</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="action-group">
                                                <button className="btn-accept" onClick={() => onAction(doc._id, 'approve')}>Accept</button>
                                                <button className="btn-deny" onClick={() => onAction(doc._id, 'reject')}>Reject</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={6}>
                                    <div className="empty-state" style={{textAlign: 'center', padding: '30px', color: '#666'}}>No pending doctor approvals at the moment.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
