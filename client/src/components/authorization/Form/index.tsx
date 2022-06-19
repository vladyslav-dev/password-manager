import React, { useMemo, useState } from 'react';
import styles from './style.module.scss';
import logo from '../../../images/logo.svg';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import { setAuth, setUser } from '../../../store/slices/auth';
import { useDispatch } from 'react-redux';
import Alert from '../../common/Alert';

interface IFormProps {
    title: string;
    type: 'login' | 'register';
}

interface IFormState {
    login: string;
    password: string;
}

const Form: React.FC<IFormProps> = ({
    type,
    title
}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [alertMessage, setAlertMessage] = useState<string>('');

    const [formData, setFormData] = useState<IFormState>({
        login: '',
        password: '',
    });

    const isValid = useMemo(() => {
        return Object.values(formData).every(value => value.length > 0);
    }, [formData]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        })));
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (type === 'register') {
            AuthService.registration(formData)
                .then(data => {
                    localStorage.setItem('password-manager:accessToken', data.accessToken);

                    dispatch(setAuth(true));
                    dispatch(setUser(data.user));
                })
                .catch(err => {
                    setAlertMessage(err?.response?.data?.message || 'Network error');
                    setTimeout(() => setAlertMessage(''), 2800);
                })
        }

        if (type === 'login') {
            AuthService.login(formData)
                .then(data => {
                    localStorage.setItem('password-manager:accessToken', data.accessToken);

                    dispatch(setAuth(true));
                    dispatch(setUser(data.user));
                })
                .catch(err => {
                    console.log(err)

                    setAlertMessage(err?.response?.data?.message || 'Network error');
                    setTimeout(() => setAlertMessage(''), 2800);
                })
        }
    }

    return (
        <div className={styles.formBox}>
            <div className={styles.formHead}>
                <div className={styles.formLogo}>
                    <img src={logo} alt='Logo' />
                </div>
                <h1>{title}</h1>
            </div>
            <form className={styles.form} action='#' onSubmit={submitHandler}>
                <div className={styles.formContainer}>
                    <div className={styles.formItem}>
                        <Input
                            type={'text'}
                            label='Login'
                            name='login'
                            value={formData.login}
                            handler={changeHandler}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <Input
                            type={'password'}
                            label='Password'
                            name='password'
                            value={formData.password}
                            handler={changeHandler}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <Button
                            clickHandler={submitHandler}
                            title={title}
                            type='submit'
                            disabled={!isValid}
                        />
                    </div>
                </div>
            </form>
            <div className={styles.navigate}>
                <span className={styles.navigateText}>
                    {type === 'login' ? 'Don\'t have an account? ' : 'Already have an account? '}
                </span>
                <span className={styles.navigateLink} onClick={() => navigate(`/${type === 'login' ? 'register' : 'login'}`)}>
                    {type === 'login' ? 'Sign up' : 'Sign in'}
                </span>
            </div>
            <Alert message={alertMessage} isShow={!!alertMessage} />
        </div>
    )
}

export default Form;