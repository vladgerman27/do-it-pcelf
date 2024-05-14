import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: {
        displayName: string;
        email: string;
        uid: string;
    } | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
        },
    },
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
