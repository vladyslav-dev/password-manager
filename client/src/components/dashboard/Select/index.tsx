import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useOnClickOutside from '../../../hooks/useOnclickOutside';
import GroupService from '../../../services/GroupService';
import { setGroups } from '../../../store/slices/password';
import { IGroup } from '../../../types/group';
import Button from '../../common/Button';
import Input from '../../common/Input';
import ToggleArrow from '../../icons/ToggleArrow';
import styles from './style.module.scss';

interface ISelectProps {
    selectedOption: IGroup | null;
    options: IGroup[];
    changeHandler: (event: React.MouseEvent) => void;
}

const Select: React.FC<ISelectProps> = ({
    selectedOption,
    options,
    changeHandler
}) => {

    const dispatch = useDispatch();

    const selectedRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    const [newGroupValue, setNewGroupValue] = useState<string>('')

    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

    useOnClickOutside(() => setIsOptionsOpen(false), selectedRef, optionsRef);

    const changeOptionHandler = (event: React.MouseEvent) => {
        setIsOptionsOpen(false);
        changeHandler(event)
    }

    const createNewGroup = () => {
        GroupService.createOne({ title: newGroupValue })
            .then(() => {
                GroupService.getAll()
                    .then((groups: IGroup[]) => {
                        dispatch(setGroups(groups))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

        setNewGroupValue('');
    }

    return (
        <div className={`${styles.selectWrapper} ${isOptionsOpen ? styles.active : ''}`}>
            <div
                ref={selectedRef}
                className={styles.select}
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
                <span className={styles.selected}>
                    {selectedOption ? selectedOption.title : 'No group'}
                </span>
                <ToggleArrow />
            </div>
            <div className={styles.options} ref={optionsRef}>
                {options.length ? (
                    <div className={styles.optionsList}>
                        {options.map((option) => (
                            <div
                                key={option._id}
                                id={option._id}
                                onClick={changeOptionHandler}
                                className={styles.optionsItem}
                            >
                                {option.title}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noGroups}>You haven't created any groups yet.</div>
                )}
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
        </div>
    )
}

export default Select;