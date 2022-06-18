import React, { useRef, useState } from 'react';
import { IPassword } from '../../../../../types/password';
import styles from './style.module.scss';
import optionsSvg from '../../../../../images/icons/options.svg';
import copySvg from '../../../../../images/icons/copy.svg';
import useOnClickOutside from '../../../../../hooks/useOnclickOutside';
import { useNavigate } from 'react-router-dom';
import PasswordService from '../../../../../services/PasswordService';
import { useDispatch } from 'react-redux';
import { setPasswordData } from '../../../../../store/slices/password';


interface IPasswordItemProps {
    passwordData: IPassword;
}

const PasswordItem: React.FC<IPasswordItemProps> = ({
    passwordData
}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const optionsRef = useRef<HTMLImageElement>(null);
    const optionsModalRef = useRef<HTMLDivElement>(null);

    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');

    useOnClickOutside(() => setIsOptionsOpen(false), optionsRef, optionsModalRef);


    const copyToClipboard = () => {
        if (!navigator.clipboard) {
            alert('Clipboard API not supported in your browser');
        }

        navigator.clipboard.writeText(passwordData.password)
            .then(() => alert('Copied to clipboard'))
            .catch((err: any) => alert('Something went wrong while copying'));
    }

    const handleInputType = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
        setIsOptionsOpen(false)
    }

    const navigateToEditPage = () => {
        navigate(`/dashboard/edit-password/${passwordData._id}`);
    }

    const deleteCurrentItem = () => {
        PasswordService.deleteOne(passwordData._id)
            .then(() => console.log('Password deleted'))
            .catch((err) => console.log('Something went wrong while deleting, ', err))
            .finally(() => {
                PasswordService.getAll()
                    .then((data) => dispatch(setPasswordData(data)))
                    .catch(() => console.log('Something went wrong while getting data'))
            })
    }

    return (
        <li className={styles.passwordItem}>
            <div className={styles.passwordLogo}>{passwordData.service.trim().split('')[0]}</div>
            <div className={styles.passwordService}>
                <span className={styles.label}>Service</span>
                <span className={styles.serviceName} title={passwordData.service}>{passwordData.service}</span>
            </div>
            <div className={styles.passwordUsername}>
                <span className={styles.label}>Username</span>
                <span className={styles.username} title={passwordData.username}>{passwordData.username}</span>
            </div>
            <div className={styles.passwordSecret}>
                <span className={styles.label}>Password</span>
                <input
                    className={styles.passwordSecretPass}
                    value={passwordData.password}
                    type={inputType}
                    readOnly
                />
                <img
                    src={copySvg}
                    alt="copy"
                    onClick={copyToClipboard}
                    className={styles.copyPassword}
                />
            </div>
            <div className={styles.options}>
                <img
                    ref={optionsRef}
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                    src={optionsSvg}
                    alt="options"
                />
                <div
                    className={`${styles.optionsModal} ${isOptionsOpen ? styles.active : ''}`}
                    ref={optionsModalRef}
                >
                    <button onClick={handleInputType} className={styles.link}>Show/hide password</button>
                    <button onClick={navigateToEditPage} className={styles.link}>Edit</button>
                    <button onClick={deleteCurrentItem} className={styles.link}>Delete</button>
                </div>
            </div>
        </li>
    )
}

export default PasswordItem;