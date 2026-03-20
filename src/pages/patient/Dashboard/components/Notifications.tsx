import React from 'react';
import styles from '../../../styles/patient/Dashboard.module.css';

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, text: "Prescription for Amoxicillin needs review.", icon: "fa-prescription" },
    { id: 2, text: "Your result for Blood Test is now available.", icon: "fa-vial" }
  ];

  if (notifications.length === 0) return null;

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Notifications</h3>
      <div className={styles.notifList}>
        {notifications.map(notif => (
          <div key={notif.id} className={styles.notifItem}>
            <i className={`fas ${notif.icon} ${styles.notifIcon}`}></i>
            <span className={styles.notifContent}>{notif.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
