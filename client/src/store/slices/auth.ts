import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../interfaces/auth";

const initialState: IAuthState = {
    user: null,
    isAuth: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    }
})

export const { setUser, setAuth } = authSlice.actions;
export default authSlice.reducer;