import React from 'react';
import { IPassword } from '../../../types/password';
import PasswordItem from './helpers/PasswordItem';
import styles from './style.module.scss';

interface IPasswordListProps {
    groupTitle: string;
    passwordList: IPassword[];
}

const PasswordList: React.FC<IPasswordListProps> = ({
    groupTitle,
    passwordList
}) => {

    return (
        <div className={styles.passwordListWrapper}>
            <div className={styles.passwordListGroup}>
                <h5>{groupTitle}</h5>
            </div>
            <ul className={styles.passwordList}>
                {passwordList.map(password => (
                    <PasswordItem key={password._id} passwordData={password} />
                ))}
            </ul>
        </div>
    )
}

export default PasswordList;