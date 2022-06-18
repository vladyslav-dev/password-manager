import React from 'react';
import { useSelector } from 'react-redux';
import FirstPassword from '../../components/dashboard/FirstPassword';
import InfoCard from '../../components/dashboard/InfoCard';
import { RootState } from '../../store';
import styles from './style.module.scss';

interface IDashboardProps {}

const Dashboard: React.FC<IDashboardProps> = () => {

    const { totalPasswords, totalGroups } = useSelector((state: RootState) => state.passwordReducer);

    return (
        <div className={styles.dashboard}>
            <aside className={styles.aside}>
                <div className={styles.asideCard}>
                    <InfoCard
                        total={totalPasswords}
                        title={'Passwords'}
                        linkTo={'/dashboard/new-password'}
                    />
                </div>
                <div className={styles.asideCard}>
                    <InfoCard
                        total={totalGroups}
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