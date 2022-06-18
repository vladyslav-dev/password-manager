import { IGroup } from './../types/group';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import GroupService from '../services/GroupService';
import { setGroups } from '../store/slices/password';
import { RootState } from '../store';

export default function useFetchGlobalData() {

    const { isAuth } = useSelector((state: RootState) => state.authReducer);

    const [isFetched, setIsFetched] = useState<boolean>(false);
    const [skipFetch, setSkipFetch] = useState<boolean>(false);

    const dispatch = useDispatch()

    useEffect(() => {

        if (!isAuth) {
            return setSkipFetch(true);
        }

        if (isAuth && !isFetched) {

            GroupService.getAll()
            .then((groups: IGroup[]) => dispatch(setGroups(groups)))
            .catch(err => console.log(err))

            setIsFetched(true)

            setSkipFetch(false)
        }

    }, [isAuth])

    return { isFetched, skipFetch }
}