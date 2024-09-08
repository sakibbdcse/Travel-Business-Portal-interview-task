import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
