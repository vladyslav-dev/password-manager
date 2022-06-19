import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import FirstPassword from '../../components/dashboard/FirstPassword';
import InfoCard from '../../components/dashboard/InfoCard';
import PasswordList from '../../components/dashboard/PasswordList';
import Select from '../../components/dashboard/Select';
import { RootState } from '../../store';
import { IGroup } from '../../interfaces/group';
import { IPassword } from '../../interfaces/password';
import { transformGroupsToFilter } from '../../utils/select';
import styles from './style.module.scss';

interface IDataView {
    [key: string]: {
        group: IGroup;
        passwordList: IPassword[];
    }
}

const FILTER_ALL = 'All';

const Dashboard: React.FC = () => {

    const {
        passwordCollection,
        groupsCollection,
        totalPasswords,
        totalGroups,
        isFetched
    } = useSelector((state: RootState) => state.passwordReducer);

    const [filterGroups, setFilterGroups] = useState<string>(FILTER_ALL);

    const passwordData = useMemo(() => Object.values(passwordCollection), [passwordCollection]);

    const renderDataView = useMemo(() => {
        const dataView: IDataView = Object.values(passwordCollection).reduce((acc: IDataView, password: IPassword) => {
            const group: IGroup | null = password.group ? groupsCollection[password.group]: null;
            const groupTitle = group?.title || FILTER_ALL;

            acc[groupTitle] = {
                group: group ? groupsCollection[group._id] : { _id: '', title: FILTER_ALL, user: '' },
                passwordList: acc[groupTitle] ? [...acc[groupTitle]['passwordList'], password] : [password],
            };

            return acc;
        }, {})

        return Object.assign({}, dataView);

    }, [passwordCollection, groupsCollection])

    const selectOptions = useMemo(() => {
        return transformGroupsToFilter(Object.keys(renderDataView), filterGroups);
    }, [renderDataView, filterGroups]);

    const selectHandler = (event: React.MouseEvent) => {
        const { id } = event.target as HTMLDivElement;
        setFilterGroups(id);
    };

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
                    <Select
                        modalPosition='bottom'
                        selectedOption={filterGroups}
                        options={selectOptions}
                        changeHandler={selectHandler}
                    />
                </div>
                <div className={styles.mainSection}>
                    {!Object.keys(passwordCollection).length && isFetched ? <FirstPassword /> : !passwordData.length ? null : (
                        <>
                            {filterGroups === FILTER_ALL ? (
                                <>
                                    {Object.values(renderDataView).map(({ group, passwordList }) => (
                                        <PasswordList
                                            key={group.title}
                                            group={group}
                                            passwordList={passwordList}
                                        />
                                    ))}
                            </>
                            ) : (
                                <PasswordList
                                    group={renderDataView[filterGroups]['group']}
                                    passwordList={renderDataView[filterGroups].passwordList}
                                />
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Dashboard