import React from 'react';
import Navbar from '../../components/dashboard/Navbar';
import styles from './style.module.scss';

interface IDashboardProps {
    children?: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardProps> = ({ children }) => (
    <div className={styles.wrapper}>
        <Navbar />
        <div className={styles.dashboardContainer}>
            <div className={styles.mainContent}>
                <div className={styles.mainContainer}>
                    {children}
                </div>
            </div>
        </div>
    </div>
)

export default DashboardLayout;