import React from 'react';
import styles from './style.module.scss';

interface IAuthorizationProps {
    children?: React.ReactNode;
}

const AuthLayout: React.FC<IAuthorizationProps> = ({ children }) => (
    <div className={styles.wrapper}>
        {children}
    </div>
)

export default AuthLayout;