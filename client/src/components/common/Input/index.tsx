import React, { useState } from 'react';
import styles from './style.module.scss';
import eye from '../../../images/icons/eye.svg';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({
    label,
    value,
    type,
    handler,
    ...props
}) => {

    const [inputType, setInputType] = useState(type);

    const changePasswordVisibility = () => {
        inputType === 'password' ? setInputType('text') : setInputType('password');
    }

    return (
        <div className={styles.inputWrapper}>
            <input
                id={label}
                name={label}
                value={value}
                onChange={handler}
                autoComplete='off'
                type={inputType}
                placeholder={' '}
                {...props}
            />
            <label htmlFor={label}>{label}</label>
            {type === 'password' && (
                <button
                    className={`${styles.eye} ${inputType !== 'password' ? styles.hide : ''}`}
                    onClick={changePasswordVisibility}
                >
                    <img src={eye} alt='eye' />
                </button>
            )}

        </div>
    )
}

export default React.memo(Input);