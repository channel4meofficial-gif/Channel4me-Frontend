import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const DoctorSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Extract initials dynamically
  const getInitials = (name: string) => {
    if (!name) return "DR";
    const cleanName = name.replace(/^Dr\.\s*|^Dr\s*/i, "").trim();
    if (!cleanName) return "DR";
    const words = cleanName.split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return cleanName[0].toUpperCase();
  };

  const doctorName = user?.name || "Doctor";
  const doctorInitials = getInitials(doctorName);
  
  // Use specialty if available in user object, otherwise fallback
  const doctorSpecialty = (user as any)?.specialization || "Neurologist";

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
          <div className="doctor-avatar">{doctorInitials}</div>
          <div className="doctor-info">
            <div className="name">{doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`}</div>
            <div className="role">{doctorSpecialty}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
