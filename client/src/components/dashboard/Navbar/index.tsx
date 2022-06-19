import React, { useRef, useState } from 'react';
import styles from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import logo from '../../../images/logo.svg';
import ToggleArrow from '../../icons/ToggleArrow';
import useOnClickOutside from '../../../hooks/useOnclickOutside';
import AuthService from '../../../services/AuthService';
import { setAuth } from '../../../store/slices/auth';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {

    const { user } = useSelector((state: RootState) => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

    useOnClickOutside(() => setIsOptionsOpen(false), buttonRef);

    const optionsHandler = () => setIsOptionsOpen(!isOptionsOpen);

    const logout = () => {
        AuthService.logout();

        localStorage.removeItem('password-manager:accessToken');

        dispatch(setAuth(false));

        navigate('/login');
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.dashboardContainer}>
                <div className={styles.navbarContainer}>
                    <div className={styles.logo} onClick={() => navigate('/dashboard')}>
                        <img src={logo} alt='Logo' />
                        <span>Dashboard</span>
                    </div>
                    <button className={`${styles.logout} ${isOptionsOpen ? styles.active : ''}`} ref={buttonRef} onClick={optionsHandler}>
                        <span>{user?.login}</span>
                        <ToggleArrow />
                        <div
                            onClick={(event) => event.stopPropagation()}
                            className={styles.options}
                        >
                            <span onClick={logout}>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;