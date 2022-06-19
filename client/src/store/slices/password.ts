import { IPassword } from '../../../../server/interfaces/index';
import { IGroup } from '../../interfaces/group';
import { IPasswordState } from '../../interfaces/password';
import { createSlice } from '@reduxjs/toolkit';


const initialState: IPasswordState = {
    passwordCollection: {},
    groupsCollection: {},
    totalPasswords: 0,
    totalGroups: 0,
    isFetched: false
};

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        setPasswordData: (state, action) => {
            state.passwordCollection = Object.assign({}, ...action.payload.map((password: IPassword) => {
                return {
                    [password._id]: password
                }
            }));
            state.totalPasswords = action.payload.length;
            state.isFetched = true;
        },
        setGroups: (state, action) => {
            state.groupsCollection = Object.assign({}, ...action.payload.map((group: IGroup) => {
                return {
                    [group._id]: group
                }
            }));
            state.totalGroups = action.payload.length;
        },
    }
})

export const { setPasswordData, setGroups } = passwordSlice.actions;
export default passwordSlice.reducer;