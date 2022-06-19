import React from 'react';
import styles from './style.module.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    clickHandler?: (event: any) => void;
}

const Button: React.FC<IButtonProps> = ({
    title,
    clickHandler,
    disabled,
    ...props
}) => (
    <button
        className={`${styles.button} ${disabled ? styles.disable : ''}`}
        onClick={clickHandler}
        {...props}
    >
        {title}
    </button>
)

export default Button;