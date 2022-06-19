import React from 'react';
import PasswordForm from '../../components/dashboard/PasswordForm';
import styles from './style.module.scss';

const NewPassword: React.FC = () => (
    <main className={styles.newPassword}>
        <PasswordForm title={'New password'} type='create' />
    </main>
)

export default NewPassword;