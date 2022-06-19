import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GroupService from '../../../services/GroupService';
import { setGroups } from '../../../store/slices/password';
import { IGroup } from '../../../types/group';
import Button from '../../common/Button';
import Input from '../../common/Input';
import styles from './style.module.scss';

type TGroupType = 'create' | 'update';

interface IGroupFormProps {
    type: TGroupType;
    groupData?: IGroup;
    title: string;
}

const GroupForm: React.FC<IGroupFormProps> = ({
    type,
    title,
    groupData
}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [groupValue, setGroupValue] = useState<string>(groupData?.title || '');

    const sumbitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (type === 'create') {
            GroupService.createOne({ title: groupValue })
            .then(() => {
                GroupService.getAll()
                    .then((groups: IGroup[]) => {
                        console.log('create new group')
                        dispatch(setGroups(groups))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
            .finally(() => navigate('/dashboard'))
        }

        if (type === 'update') {
            GroupService.updateOne({
                title: groupValue,
                user: groupData?.user!,
                _id: groupData?._id!
             })
            .then(() => {
                GroupService.getAll()
                    .then((groups: IGroup[]) => {
                        dispatch(setGroups(groups))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
            .finally(() => navigate('/dashboard'))
        }



        setGroupValue('');
    }

    return (
        <div className={styles.groupForm}>
            <h2 className={styles.groupFormTitle}>{title}</h2>
            <form action="#" className={styles.form} onSubmit={sumbitHandler}>
                <div className={styles.formContainer}>
                    <div className={styles.formItem}>
                        <Input
                            type={'text'}
                            label="New group name"
                            name="username"
                            value={groupValue}
                            handler={(event) => setGroupValue(event.target.value)}
                            style={{ borderColor: '#000000' }}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <Button
                            title={type === 'create' ? 'ADD NEW GROUP' : 'UPDATE GROUP'}
                            disabled={!groupValue}
                            clickHandler={sumbitHandler}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default GroupForm;