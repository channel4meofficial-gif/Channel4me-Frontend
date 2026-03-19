import React from 'react';
import { Appointment } from '../../../../types/auth';
import styles from '../Dashboard.module.css';

interface RecentActivityProps {
  appointments?: Appointment[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ appointments = [] }) => {
  const completed = appointments
    .filter(apt => apt.status === 'completed')
    .slice(0, 3);

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Recent Activity</h3>
      <div className={styles.appointmentList}>
        {completed.length > 0 ? (
          completed.map(apt => (
            <div key={apt.id} className={styles.appointmentItem} style={{ padding: '12px', border: 'none', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{apt.doctorName}</span>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{apt.specialization} • {apt.date}</p>
                </div>
                <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '12px', cursor: 'pointer' }}>Details</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>No recent activity to show.</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
