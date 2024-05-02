import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'types/user/user';

interface IInitialState {
    user: IUser;
}

const initialState: IInitialState = {
    user: {
        email: '',
        id: '',
        token: '',
        username: '',
    },
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user.email = action.payload.email;
            state.user.id = action.payload.id;
            state.user.token = action.payload.token;
            state.user.username = action.payload.username;
        },
        removeUser: (state) => {
            state.user.email = '';
            state.user.id = '';
            state.user.token = '';
            state.user.username = '';
        },
    },
});

export const { setUser, removeUser } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;