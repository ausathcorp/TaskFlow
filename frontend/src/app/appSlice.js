import { createSlice } from '@reduxjs/toolkit'

const initialState = ({
    state: 'running'
});

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppState: (state, action) => {
            state.state = action.payload;
        }
    },
    selectors: {
        getAppState: (state) => state.state,
    }
});

export const { setAppState } = appSlice.actions;
export const { getAppState } = appSlice.selectors;

export default appSlice.reducer;