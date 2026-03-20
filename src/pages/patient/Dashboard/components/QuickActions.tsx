import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/patient/Dashboard.module.css';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    { label: 'Book New Appointment', icon: 'fa-calendar-plus', path: '/patient/find-doctors' },
    { label: 'Check Symptoms', icon: 'fa-stethoscope', path: '/patient/symptom-checker' },
    { label: 'View Medical Records', icon: 'fa-file-medical', path: '/patient/records' },
    { label: 'Write a Review', icon: 'fa-star', path: '/patient/reviews' },
  ];

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Quick Actions</h3>
      <div className={styles.actionGrid}>
        {actions.map((action, i) => (
          <button 
            key={i} 
            className={styles.actionBtn}
            onClick={() => navigate(action.path)}
          >
            <i className={`fas ${action.icon} ${styles.actionIcon}`}></i>
            <span className={styles.actionLabel}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
