import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticatedUser: (state, action) => {
            state.user = action.payload;
        },
        removeAuthenticatedUser: (state) => {
            state.user = null;
        }
    },
    selectors: {
        getAuthenticatedUser: (state) => {
            return state.user;
        }
    }
});

export const { getAuthenticatedUser } = authSlice.selectors;
export const { 
    setAuthenticatedUser,
    removeAuthenticatedUser } = authSlice.actions;
    
export default authSlice.reducer;