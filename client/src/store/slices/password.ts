import { IGroup } from './../../types/group';
import { IPasswordState } from './../../types/password';
import { createSlice } from "@reduxjs/toolkit";


const initialState: IPasswordState = {
    passwordCollection: {},
    groupsCollection: {},
    totalPasswords: 0,
    totalGroups: 0
}

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        setPasswordData: (state, action) => {
            // state.passwordData = Object.assign({}, action.payload.);
            state.totalPasswords = action.payload.length;
        },
        setGroups: (state, action) => {
            state.groupsCollection = Object.assign({}, ...action.payload.map((group: IGroup) => ({ [group._id]: group })))
            state.totalGroups = action.payload.length;
            console.log(state.groupsCollection)
        },
    }
})

export const { setPasswordData, setGroups } = passwordSlice.actions;
export default passwordSlice.reducer;