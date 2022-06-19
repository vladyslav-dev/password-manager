import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PasswordService from '../../../services/PasswordService';
import { RootState } from '../../../store';
import { setPasswordData } from '../../../store/slices/password';
import { IGroup } from '../../../interfaces/group';
import { IPassword } from '../../../interfaces/password';
import { transformGroupsToOptions } from '../../../utils/select';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select, { IOption } from '../Select';
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

    const isValid = useMemo(() => {
        return !!formData.service.trim() && !!formData.username.trim() && !!formData.password.trim();
    }, [formData]);

    const transformedToOption: IOption[] = useMemo(() => {
        return transformGroupsToOptions(groupsCollection, formData.group?._id!);
    }, [groupsCollection, formData]);


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
                                modalPosition='top'
                                selectedOption={formData.group?.title || 'No group'}
                                options={transformedToOption}
                                changeHandler={selectHandler}
                                showAddGroup={true}
                            />
                        </div>
                        <div className={styles.formItem}>
                            <Button
                                clickHandler={sumbitHandler}
                                disabled={!isValid}
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