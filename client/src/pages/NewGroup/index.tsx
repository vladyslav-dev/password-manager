import React from 'react';
import GroupForm from '../../components/dashboard/GroupForm';
import styles from './style.module.scss';

const NewGroupPage: React.FC = () => (
    <main className={styles.newGroup}>
        <GroupForm
            type='create'
            title='Create new group'
        />
    </main>
)

export default NewGroupPage;