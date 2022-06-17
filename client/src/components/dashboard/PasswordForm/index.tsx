import React, { useState } from 'react';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../Select';
import styles from './style.module.scss';

interface IPasswordFormProps {
    title: string;
}

interface IPasswordFormState {
    service: string;
    username: string;
    password: string;
    group: string | null;
}

const PasswordForm: React.FC<IPasswordFormProps> = ({
    title
}) => {

    const [groups, setGroups] = useState<string[]>([]);

    const [formData, setFormData] = useState<IPasswordFormState>({
        service: '',
        username: '',
        password: '',
        group: null
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value})
    }

    const sumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <div className={styles.passwordForm}>
            <div className={styles.passwordFormContainer}>
                <h2 className={styles.passwordFormTitle}>{title}</h2>
                <form action="#" className={styles.form} onSubmit={sumbitHandler}>
                    <div className={styles.formContainer}>
                        <div className={styles.formItem}>
                            <Input
                                type={'text'}
                                label="Service"
                                name="service"
                                value={formData.service}
                                handler={changeHandler}
                                style={{ borderColor: '#000000' }}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <Input
                                type={'text'}
                                label="Username"
                                name="username"
                                value={formData.username}
                                handler={changeHandler}
                                style={{ borderColor: '#000000' }}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <Input
                                type={'text'}
                                label="Password"
                                name="password"
                                value={formData.password}
                                handler={changeHandler}
                                style={{ borderColor: '#000000' }}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <Select selectedOption={groups[0]} options={groups} />
                        </div>
                        <div className={styles.formItem}>
                            <Button
                                clickHandler={sumbitHandler}
                                title={'ADD NEW PASSWORD'}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordForm;