import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
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

    const { groupsCollection } = useSelector((state: RootState) => state.passwordReducer);

    const [localGroupsCollection, setLocalGroupsCollection] = useState<TGroupCollection>({});

    useEffect(() => {
        setLocalGroupsCollection(groupsCollection);
    }, [groupsCollection])

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
        setFormData({...formData, group: localGroupsCollection[id]})
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
                            <Select
                                selectedOption={formData.group}
                                options={Object.values(localGroupsCollection)}
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