import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useOnclickOutside';
import { IGroup } from '../../../types/group';
import ToggleArrow from '../../icons/ToggleArrow';
import NewGroup from './helpers/NewGroup';
import styles from './style.module.scss';

export interface IOption {
    id: string;
    text: string;
}

interface ISelectProps {
    selectedOption: string;
    options: IOption[];
    changeHandler: (event: React.MouseEvent) => void;
    modalPosition: 'top' | 'bottom';
    showAddGroup?: boolean;
}

const Select: React.FC<ISelectProps> = ({
    selectedOption,
    options,
    changeHandler,
    modalPosition = 'top',
    showAddGroup = false
}) => {

    const selectedRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

    useOnClickOutside(() => setIsOptionsOpen(false), selectedRef, optionsRef);

    const changeOptionHandler = (event: React.MouseEvent) => {
        setIsOptionsOpen(false);
        changeHandler(event)
    }

    return (
        <div className={`${styles.selectWrapper} ${isOptionsOpen ? styles.active : ''}`}>
            <div
                ref={selectedRef}
                className={styles.select}
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
                <span className={styles.selected}>
                    {selectedOption}
                </span>
                <ToggleArrow />
            </div>
            <div className={`${styles.options} ${modalPosition === 'top' ? styles.top : styles.bottom}`} ref={optionsRef}>
                {options.length ? (
                    <div className={styles.optionsList}>
                        {options.map((option) => (
                            <div
                                key={option.id}
                                id={option.id}
                                onClick={changeOptionHandler}
                                className={styles.optionsItem}
                            >
                                {option.text}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.noGroups}>You haven't created any groups yet.</div>
                )}
                {showAddGroup && <NewGroup />}
            </div>
        </div>
    )
}

export default Select;