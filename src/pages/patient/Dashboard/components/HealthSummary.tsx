import React from 'react';
import { User } from '../../../../types/auth';
import styles from '../../../styles/patient/Dashboard.module.css';

interface HealthSummaryProps {
  user?: User | null;
}

const HealthSummary: React.FC<HealthSummaryProps> = ({ user }) => {
  const summaryData = [
    { label: 'Blood Type', value: 'O+' },
    { label: 'Allergies', value: 'Penicillin' },
    { label: 'Medications', value: 'Vitamin D3' },
    { label: 'Weight', value: '72 kg' },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <span className={styles.blue}>Health Summary</span>
        <button style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer' }}><i className="fas fa-edit"></i></button>
      </div>
      <div className={styles.summaryGrid}>
        {summaryData.map((item, i) => (
          <div key={i} className={styles.summaryItem}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <span className={styles.summaryValue}>{item.value}</span>
          </div>
        ))}
      </div>
      <button className={styles.btnAction} style={{ width: '100%', marginTop: '16px', background: '#f1f5f9', color: '#475569' }}>
        Complete Profile
      </button>
    </div>
  );
};

export default HealthSummary;
