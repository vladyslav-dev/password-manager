import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupForm from '../../components/dashboard/GroupForm';
import GroupService from '../../services/GroupService';
import { IGroup } from '../../types/group';
import styles from './style.module.scss';

const EditGroup: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState<IGroup | null>(null);

    useEffect(() => {

        if (!id) {
            navigate('/dashboard');
            return
        }

        GroupService.getOne(id)
            .then((data: IGroup) => setGroupData(data))
            .catch(err => console.log(err));

    }, [])

    if (groupData === null) {
        return null
    }

    return (
        <main className={styles.editGroup}>
            <GroupForm title={'Update group'} groupData={groupData} type='update' />
        </main>
    )
}

export default EditGroup;