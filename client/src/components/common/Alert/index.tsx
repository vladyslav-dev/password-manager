import React from 'react';
import styles from './styles.module.scss';

interface IAlertProps {
    message: string;
    isShow: boolean;
}

const Alert: React.FC<IAlertProps> = ({
    message,
    isShow
}) => (
    <div className={`${styles.alert} ${isShow ? styles.active : ''}`}>{message}</div>
)

export default React.memo(Alert);