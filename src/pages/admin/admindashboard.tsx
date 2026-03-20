import React, { useState } from 'react';
import '../../styles/admin/admindashboard.css';
import Header from '../../components/ui/header/header';
import Footer from '../../components/ui/footer/footer';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('appointments');

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
                            <span className="menu-badge">5</span>
                        </button>
                        <button
                            className={`menu-btn ${activeTab === 'approvals' ? 'active' : ''}`}
                            onClick={() => setActiveTab('approvals')}
                        >
                            <span className="menu-icon">👥</span> Doctor Approvals
                        </button>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <div className="profile-badge">EW</div>
                    <div className="profile-info">
                        <span className="profile-name">Admin User</span>
                        <span className="profile-role">Administrator</span>
                    </div>
                </div>
            </aside>

            <main className="admin-main">
                <header className="main-header">
                    <div className="header-greeting">
                        <h1>Good Morning, <span>Admin</span> 👋</h1>
                        <p>Monday, 19 March 2026 · You have 5 appointments today</p>
                    </div>
                </header>

                <div className="admin-content-wrapper">
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'appointments' && <AppointmentsTab />}
                    {activeTab === 'approvals' && <DoctorApprovalsTab />}
                </div>
            </main>
        </div>
        <Footer />
        </div>
    );
};

const OverviewTab = () => (
    <div className="dashboard-content">
        <div className="stat-cards-container">
            <div className="stat-card border-blue">
                <div className="stat-header">
                    <h3>TODAY'S APPOINTMENTS</h3>
                    <div className="stat-icon bg-blue">📅</div>
                </div>
                <p className="card-value">5</p>
                <span className="card-trend text-blue"><strong>5 scheduled</strong> for today</span>
            </div>
            <div className="stat-card border-green">
                <div className="stat-header">
                    <h3>TOTAL PATIENTS</h3>
                    <div className="stat-icon bg-green">👥</div>
                </div>
                <p className="card-value">6,000</p>
                <span className="card-trend text-green"><strong>+12 new</strong> this month</span>
            </div>
            <div className="stat-card border-orange">
                <div className="stat-header">
                    <h3>PENDING APPROVALS</h3>
                    <div className="stat-icon bg-orange">⭐</div>
                </div>
                <p className="card-value">12</p>
                <span className="card-trend text-orange">Requires review</span>
            </div>
        </div>

        <div className="dashboard-bottom">
            <div className="dashboard-table-container">
                <div className="board-header">
                    <div>
                        <h2>Recent Activity</h2>
                        <p>Latest updates from your platform</p>
                    </div>
                </div>
                <div className="empty-state">Select Appointments or Doctor Approvals tab to view details.</div>
            </div>
            <div className="dashboard-notifications">
                <div className="board-header">
                    <div>
                        <h2>Notifications</h2>
                        <p>Latest updates for you</p>
                    </div>
                </div>
                <div className="notification-list">
                    <div className="notification-item">
                        <div className="notif-dot blue"></div>
                        <div className="notif-content">
                            <h4>New Appointment Request</h4>
                            <p>MT Dinuka has requested an appointment for today at 12:00 PM.</p>
                            <span>2 minutes ago</span>
                        </div>
                    </div>
                    <div className="notification-item">
                        <div className="notif-dot red"></div>
                        <div className="notif-content">
                            <h4>Emergency Alert</h4>
                            <p>Patient Dulhara requires immediate attention at Hemas Hospital.</p>
                            <span>15 minutes ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AppointmentsTab = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, name: 'MT Dinuka', time: '12:00 PM', hospital: 'Hemas', status: 'Accepted' },
        { id: 2, name: 'Ashani', time: '1:00 PM', hospital: 'Asiri', status: 'Pending' },
        { id: 3, name: 'Dulhara', time: '3:00 PM', hospital: 'Hemas', status: 'Accepted' },
        { id: 4, name: 'James', time: '4:00 PM', hospital: 'Asiri', status: 'Accepted' },
        { id: 5, name: 'Michael', time: '5:00 PM', hospital: 'Asiri', status: 'Pending' },
    ]);

    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const handleAction = (id: number, action: 'Accepted' | 'Cancelled') => {
        setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: action } : app));
    };

    return (
        <div className="dashboard-content">
            <div className="dashboard-table-container full-width">
                <div className="board-header">
                    <div>
                        <h2>Today's Appointments</h2>
                        <p>March 19, 2026 — {appointments.length} of {appointments.length} shown</p>
                    </div>
                </div>

                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>PATIENT</th>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th>HOSPITAL</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((app, index) => {
                            const colors = ['blue', 'pink', 'green'];
                            const colorClass = colors[index % colors.length];
                            return (
                                <tr key={app.id}>
                                    <td>
                                        <div className="app-user">
                                            <div className={`app-initials avatar-${colorClass}`}>{getInitials(app.name)}</div>
                                            <div className="user-details-group">
                                                <span className="app-name">{app.name}</span>
                                                <span className="app-subtitle">Consultation</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium">Mar 19</td>
                                    <td className="font-medium">🕒 {app.time}</td>
                                    <td><span className="hospital-pill">🏥 {app.hospital}</span></td>
                                    <td>
                                        <span className={`status-pill pill-${app.status.toLowerCase()}`}>{app.status}</span>
                                    </td>
                                    <td>
                                        <div className="app-actions">
                                            {app.status === 'Pending' && (
                                                <>
                                                    <button className="icon-btn check-btn" onClick={() => handleAction(app.id, 'Accepted')}>&#10003;</button>
                                                    <button className="icon-btn close-btn" onClick={() => handleAction(app.id, 'Cancelled')}>&#10005;</button>
                                                </>
                                            )}
                                            <button className="view-icon-btn">👁️</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const DoctorApprovalsTab = () => {
    const [pendingDoctors, setPendingDoctors] = useState([
        { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', experience: '10 Yrs', applied: '2026-01-18', cert: 'sarah_mbbs.pdf', avatar: 'SJ', status: 'Pending' },
        { id: 2, name: 'Dr. Ramesh Silva', specialty: 'Neurologist', experience: '8 Yrs', applied: '2026-01-19', cert: 'ramesh_cert.pdf', avatar: 'RS', status: 'Pending' },
        { id: 3, name: 'Dr. Emily Chen', specialty: 'Pediatrician', experience: '5 Yrs', applied: '2026-01-19', cert: 'emily_license.pdf', avatar: 'EC', status: 'Pending' },
    ]);

    const handleAction = (id: number, action: 'Accepted' | 'Rejected') => {
        setPendingDoctors(prev => prev.map(doc => doc.id === id ? { ...doc, status: action } : doc));
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
                        {pendingDoctors.map(doc => (
                            <tr key={doc.id}>
                                <td>
                                    <div className="doc-info">
                                        <div className="doc-avatar">{doc.avatar}</div>
                                        <span className="doc-name">{doc.name}</span>
                                    </div>
                                </td>
                                <td>{doc.specialty}</td>
                                <td>{doc.experience}</td>
                                <td>{doc.applied}</td>
                                <td>
                                    <button className="view-cert-btn">
                                        📄 View {doc.cert}
                                    </button>
                                </td>
                                <td>
                                    {doc.status === 'Pending' ? (
                                        <div className="action-group">
                                            <button className="btn-accept" onClick={() => handleAction(doc.id, 'Accepted')}>Accept</button>
                                            <button className="btn-deny" onClick={() => handleAction(doc.id, 'Rejected')}>Reject</button>
                                        </div>
                                    ) : (
                                        <span className={`status-badge badge-${doc.status.toLowerCase()}`}>{doc.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {pendingDoctors.length === 0 && (
                    <div className="empty-state">No pending doctor approvals at the moment.</div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
