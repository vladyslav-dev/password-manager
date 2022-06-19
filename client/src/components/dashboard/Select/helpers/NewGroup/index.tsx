import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GroupService from '../../../../../services/GroupService';
import { setGroups } from '../../../../../store/slices/password';
import { IGroup } from '../../../../../types/group';
import Button from '../../../../common/Button';
import Input from '../../../../common/Input';
import styles from './style.module.scss';

interface INewGroupProps {

}

const NewGroup: React.FC<INewGroupProps> = () => {

    const dispatch = useDispatch();

    const [newGroupValue, setNewGroupValue] = useState<string>('')

    const createNewGroup = (event: React.MouseEvent) => {
        event.preventDefault();

        GroupService.createOne({ title: newGroupValue })
            .then(() => {
                GroupService.getAll()
                    .then((groups: IGroup[]) => {
                        console.log('create new group')
                        dispatch(setGroups(groups))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

        setNewGroupValue('');
    }

    return (
        <div className={styles.newGroup}>
            <span className={styles.hr} />
                <div className={styles.newGroupInput}>
                    <Input
                        type={'text'}
                        label="New group name"
                        name="username"
                        value={newGroupValue}
                        handler={(event) => setNewGroupValue(event.target.value)}
                    />
                </div>
                <div className={styles.newGroupButton}>
                    <Button
                        title='ADD NEW GROUP'
                        style={{
                            minHeight: '26px',
                            width: '100%',
                            fontSize:'11px'
                        }}
                        disabled={!newGroupValue}
                        clickHandler={createNewGroup}
                    />
                </div>
        </div>
    )
}

export default NewGroup;