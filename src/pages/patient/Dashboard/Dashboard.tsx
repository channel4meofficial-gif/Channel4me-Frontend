import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import PublicLayout from '../../../components/layout/PublicLayout/publiclayout';
import WelcomeHeader from './components/WelcomeHeader';
import UpcomingAppointments from './components/UpcomingAppointments';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import HealthSummary from './components/HealthSummary';
import Notifications from './components/Notifications';
import styles from './Dashboard.module.css';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <PublicLayout>
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <WelcomeHeader name={user?.name} />
          
          <div className={styles.grid}>
            <div className={styles.mainColumn}>
              <Notifications />
              <UpcomingAppointments appointments={user?.appointments} />
              <QuickActions />
            </div>
            
            <div className={styles.sideColumn}>
              <HealthSummary user={user} />
              <RecentActivity appointments={user?.appointments} />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PatientDashboard;
