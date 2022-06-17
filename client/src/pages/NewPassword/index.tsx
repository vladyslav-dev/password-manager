import React from 'react';
import PasswordForm from '../../components/dashboard/PasswordForm';
import styles from './style.module.scss';

const NewPassword: React.FC = () => {

    return (
        <main className={styles.newPassword}>
            <PasswordForm title={'New password'} />
        </main>
    )
}

export default NewPassword;