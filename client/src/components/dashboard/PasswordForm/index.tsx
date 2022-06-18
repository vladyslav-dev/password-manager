import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PasswordService from '../../../services/PasswordService';
import { RootState } from '../../../store';
import { setPasswordData } from '../../../store/slices/password';
import { IGroup, TGroupCollection } from '../../../types/group';
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
    group: IGroup | null;
}

const PasswordForm: React.FC<IPasswordFormProps> = ({
    title
}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { groupsCollection } = useSelector((state: RootState) => state.passwordReducer);


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

    const selectHandler = (event: React.MouseEvent) => {
        const { id } = event.target as HTMLDivElement;
        setFormData({...formData, group: groupsCollection[id]})
    }

    const sumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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