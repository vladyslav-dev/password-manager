import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    passwordData: [],
    groups: [],
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setPasswordData: (state, action) => {
            state.passwordData = action.payload;
        },
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
    }
})

export const { setPasswordData, setGroups } = authSlice.actions;
export default authSlice.reducer;