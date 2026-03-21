import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <span className="nav-label">Main Menu</span>
      <a
        className={`nav-item ${isActive("/doctor/dashboard") ? "active" : ""}`}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("/doctor/dashboard");
        }}
      >
        <span className="nav-icon">🏠</span> Dashboard
      </a>
      <a
        className={`nav-item ${isActive("/doctor/dashboard/appointments") ? "active" : ""
          }`}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("/doctor/dashboard/appointments");
        }}
      >
        <span className="nav-icon">📅</span> Appointments
        <span className="nav-badge">5</span>
      </a>
      <a
        className={`nav-item ${isActive("/doctor/dashboard/patients") || location.pathname.startsWith("/doctor/dashboard/patients/") ? "active" : ""
          }`}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("/doctor/dashboard/patients");
        }}
      >
        <span className="nav-icon">👥</span> My Patients
      </a>
      <a
        className={`nav-item ${isActive("/doctor/dashboard/e-prescription") ? "active" : ""
          }`}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("/doctor/dashboard/e-prescription");
        }}
      >
        <span className="nav-icon">📝</span> E-Prescription
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
  );
};

export default DoctorSidebar;
