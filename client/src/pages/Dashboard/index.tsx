import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import FirstPassword from '../../components/dashboard/FirstPassword';
import InfoCard from '../../components/dashboard/InfoCard';
import PasswordList from '../../components/dashboard/PasswordList';
import { RootState } from '../../store';
import { IPassword } from '../../types/password';
import styles from './style.module.scss';

interface IDataView {
    [key: string]: {
        groupTitle: string;
        passwordList: IPassword[];
    }
}


interface IDashboardProps {}

const Dashboard: React.FC<IDashboardProps> = () => {

    const {
        passwordCollection,
        groupsCollection,
        totalPasswords,
        totalGroups
    } = useSelector((state: RootState) => state.passwordReducer);

    const passwordData = useMemo(() => Object.values(passwordCollection), [passwordCollection]);

    const renderDataView = useMemo(() => {

        const dataView: IDataView = Object.values(passwordCollection).reduce((acc: IDataView, password: IPassword) => {
            const groupTitle = password.group ? groupsCollection[password.group]?.title : 'All';

            acc[groupTitle] = {
                groupTitle,
                passwordList: acc[groupTitle] ? [...acc[groupTitle]['passwordList'], password] : [password],
            }

            return acc
        }, {})

        return Object.assign({}, dataView);

    }, [passwordCollection, groupsCollection])

    console.log(renderDataView)

    const sort: any  = 'All'

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
                    {passwordData.length ? (
                        <>
                            {sort === 'All' ? (
                                <>
                                    {Object.values(renderDataView).map(({ groupTitle, passwordList }) => (
                                        <PasswordList
                                            key={groupTitle}
                                            groupTitle={groupTitle === 'All' ? 'No group' : groupTitle}
                                            passwordList={passwordList}
                                        />
                                    ))}
                            </>
                            ) : (
                                <PasswordList
                                    groupTitle={renderDataView[sort]['groupTitle']}
                                    passwordList={renderDataView[sort].passwordList}
                                />
                            )}
                        </>
                    ) : (
                        <FirstPassword />
                    )}
                </div>
            </main>
        </div>
    )
}

export default Dashboard