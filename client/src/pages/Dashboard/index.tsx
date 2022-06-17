import React from 'react';
import FirstPassword from '../../components/dashboard/FirstPassword';
import InfoCard from '../../components/dashboard/InfoCard';
import styles from './style.module.scss';

interface IDashboardProps {}

const Dashboard: React.FC<IDashboardProps> = () => {

    return (
        <div className={styles.dashboard}>
            <aside className={styles.aside}>
                <div className={styles.asideCard}>
                    <InfoCard
                        total={12}
                        title={'Passwords'}
                        linkTo={'/dashboard/new-password'}
                    />
                </div>
                <div className={styles.asideCard}>
                    <InfoCard
                        total={0}
                        title={'Groups'}
                        linkTo={'/dashboard/new-group'}
                    />
                </div>
            </aside>
            <main className={styles.main}>
                <div className={styles.toolbar}>
                    toolbar
                </div>
                <div className={styles.mainSection}>
                    <FirstPassword />
                </div>
            </main>
        </div>
    )
}

export default Dashboard