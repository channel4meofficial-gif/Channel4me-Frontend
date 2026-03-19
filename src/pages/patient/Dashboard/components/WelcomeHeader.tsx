import React from 'react';
import styles from '../../../styles/patient/Dashboard.module.css';

interface WelcomeHeaderProps {
  name?: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ name }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const healthTips = [
    "Stay hydrated! Drink at least 8 glasses of water today.",
    "A 15-minute walk can significantly boost your mood and energy.",
    "Remember to take deep breaths throughout your work day.",
    "Fruits and vegetables are your body's best friends."
  ];

  const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];

  return (
    <div className={styles.welcomeHeader}>
      <h1 className={styles.greeting}>Welcome back, {name || 'Patient'}!</h1>
      <p className={styles.date}>{currentDate}</p>
      <div className={styles.healthTip}>
        <strong>Health Tip:</strong> {randomTip}
      </div>
    </div>
  );
};

export default WelcomeHeader;
