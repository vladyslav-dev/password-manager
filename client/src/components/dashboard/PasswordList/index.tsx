import React from 'react';
import { IPassword } from '../../../interfaces/password';
import PasswordItem from './helpers/PasswordItem';
import styles from './style.module.scss';
import editSvg from '../../../images/icons/edit.svg';
import { IGroup } from '../../../interfaces/group';
import { useNavigate } from 'react-router-dom';

interface IPasswordListProps {
    group: IGroup;
    passwordList: IPassword[];
}

const PasswordList: React.FC<IPasswordListProps> = ({
    group,
    passwordList
}) => {

    const navigate = useNavigate();

    return (
        <div className={styles.passwordListWrapper}>
            <div className={styles.passwordListGroup}>
                {group._id && <img
                    src={editSvg}
                    alt='edit'
                    onClick={() => navigate(`/dashboard/edit-group/${group._id}`)}
                />}
                <h5>{group.title}</h5>
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