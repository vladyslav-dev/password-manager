import React from 'react';
import Button from '../../common/Button';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';

interface IInfoCardProps {
    title: string;
    total: number;
    linkTo: string;
}

const InfoCard: React.FC<IInfoCardProps> = ({
    title,
    total,
    linkTo
}) => {

    const navigate = useNavigate()

    const navigateTo = () => navigate(linkTo)

    return (
        <div className={styles.card}>
            <div className={styles.cardRow}>
                <h2 className={styles.cardTitle}>{title}</h2>
            </div>
            <div className={styles.cardRow}>
                <div className={styles.cardButton}>
                    <Button
                        title={'ADD NEW'}
                        onClick={navigateTo}
                        style={{
                            padding: '0 36px',
                        }}
                    />
                </div>
                <span className={styles.cardTotal}>{total}</span>
            </div>
        </div>
    )
}

export default InfoCard;