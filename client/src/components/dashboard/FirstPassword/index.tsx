import React from 'react';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import firstPasswordVector from '../../../images/first-password-vector.svg';

const FirstPassword: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <img src={firstPasswordVector} alt='Vector' />
            <h3 className={styles.subtitle}>Add your first password</h3>
            <Button
                clickHandler={() => navigate('/dashboard/new-password')}
                title='ADD PASSWORD'
            />
        </div>
    )
}

export default FirstPassword;