import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PasswordForm from '../../components/dashboard/PasswordForm';
import PasswordService from '../../services/PasswordService';
import { IPassword } from '../../interfaces/password';
import styles from './style.module.scss';

const EditPassword: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [passwordData, setPasswordData] = useState<IPassword | null>(null);

    useEffect(() => {

        if (!id) {
            navigate('/dashboard');
            return;
        }

        PasswordService.getOne(id)
            .then(data => setPasswordData(data))
            .catch(err => console.log(err));

    }, [])

    if (passwordData === null) {
        return null;
    }

    return (
        <main className={styles.editPassword}>
            <PasswordForm title={'Update password'} passwordData={passwordData} type='update' />
        </main>
    )
}

export default EditPassword;