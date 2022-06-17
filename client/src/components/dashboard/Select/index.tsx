import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useOnclickOutside';
import Button from '../../common/Button';
import Input from '../../common/Input';
import ToggleArrow from '../../icons/ToggleArrow';
import styles from './style.module.scss';

interface ISelectProps {
    selectedOption: string;
    options: any[];
}

const Select: React.FC<ISelectProps> = ({
    selectedOption = 'No group',
    options,
}) => {

    const selectedRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(() => setIsOptionsOpen(false), selectedRef, optionsRef);

    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

    return (
        <div className={`${styles.selectWrapper} ${isOptionsOpen ? styles.active : ''}`}>
            <div className={styles.select} ref={selectedRef} onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                <span className={styles.selected}>{selectedOption}</span>
                <ToggleArrow />
            </div>
            <div className={styles.options} ref={optionsRef}>
                {options.length ? options.map((option, index) => (
                    <div>{option}</div>
                )) : (
                    <div className={styles.noGroups}>You haven't created any groups yet.</div>
                )}
                <span className={styles.hr} />
                <Input
                    type={'text'}
                    label="Group name"
                    name="username"
                    // value={formData.username}
                    handler={() => {}}
                    style={{ borderColor: '#000000', marginBottom: '20px', display: 'flex'}}
                />
                <div className={styles.newGroupButton}>

                    <Button
                        title='ADD NEW GROUP'
                        style={{
                            minHeight: '26px',
                            width: '100%',
                            fontSize:'11px'
                        }}
                    />
                </div>

            </div>
        </div>
    )
}

export default Select;