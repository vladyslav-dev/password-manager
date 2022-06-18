import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PasswordService from '../../../services/PasswordService';
import { RootState } from '../../../store';
import { setPasswordData } from '../../../store/slices/password';
import { IGroup } from '../../../types/group';
import { IPassword } from '../../../types/password';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../Select';
import styles from './style.module.scss';

type FormType = 'create' | 'update';

interface IPasswordFormProps {
    title: string;
    passwordData?: IPassword;
    type: FormType;
}

interface IPasswordFormState {
    service: string;
    username: string;
    password: string;
    group: IGroup | null;
}

const PasswordForm: React.FC<IPasswordFormProps> = ({
    type,
    title,
    passwordData
}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { groupsCollection } = useSelector((state: RootState) => state.passwordReducer);


    const [formData, setFormData] = useState<IPasswordFormState>({
        service: passwordData?.service || '',
        username: passwordData?.username || '',
        password: passwordData?.password || '',
        group: passwordData?.group ? groupsCollection[passwordData?.group] : null
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value})
    }

    const selectHandler = (event: React.MouseEvent) => {
        const { id } = event.target as HTMLDivElement;
        setFormData({...formData, group: groupsCollection[id]})
    }

    const sumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (type === 'create') {
            PasswordService.createOne({
                ...formData,
                group: formData?.group?._id ?? null
            })
            .then(() => {
                PasswordService.getAll()
                    .then(data => dispatch(setPasswordData(data)))
                    .catch(err => console.log(err))
                    .finally(() => navigate('/dashboard'))
            })
            .catch(err => console.log(err))
        }

        if (type === 'update') {
            PasswordService.updateOne({
                ...formData,
                _id: passwordData?._id!,
                user: passwordData?.user!,
                group: formData?.group?._id ?? null
            })
            .then(() => {
                PasswordService.getAll()
                    .then(data => dispatch(setPasswordData(data)))
                    .catch(err => console.log(err))
                    .finally(() => navigate('/dashboard'))
            })
            .catch(err => console.log(err))
        }
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
                            <Select
                                selectedOption={formData.group}
                                options={Object.values(groupsCollection)}
                                changeHandler={selectHandler}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <Button
                                clickHandler={sumbitHandler}
                                title={type === 'create' ? 'ADD NEW PASSWORD' : 'UPDATE PASSWORD'}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordForm;