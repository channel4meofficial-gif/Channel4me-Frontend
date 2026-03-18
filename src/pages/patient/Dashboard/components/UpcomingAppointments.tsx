import React from 'react';
import { Appointment } from '../../../../types/auth';
import styles from '../Dashboard.module.css';

interface UpcomingAppointmentsProps {
  appointments?: Appointment[];
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ appointments = [] }) => {
  const upcoming = appointments
    .filter(apt => apt.status === 'upcoming')
    .slice(0, 3);

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <span>Upcoming Appointments</span>
        {upcoming.length > 0 && <button className={styles.btnAction} style={{ color: '#3b82f6', fontSize: '12px' }}>See All</button>}
      </div>

      <div className={styles.appointmentList}>
        {upcoming.length > 0 ? (
          upcoming.map(apt => (
            <div key={apt.id} className={`${styles.appointmentItem} ${styles.upcoming}`}>
              <div className={styles.aptHeader}>
                <div>
                  <span className={styles.doctorName}>{apt.doctorName}</span>
                  <span className={styles.specialty}>{apt.specialization}</span>
                </div>
                <span className={`${styles.status} ${styles.confirmed}`}>Confirmed</span>
              </div>
              <div className={styles.aptDetails}>
                <i className="far fa-calendar-alt"></i>
                {apt.date} at {apt.time}
              </div>
              <div className={styles.actions}>
                <button className={`${styles.btnAction} ${styles.btnReschedule}`}>Reschedule</button>
                <button className={`${styles.btnAction} ${styles.btnCancel}`}>Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#64748b', marginBottom: '16px' }}>No upcoming appointments</p>
            <button className={styles.btnAction} style={{ background: '#3b82f6', color: 'white' }}>Book Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
