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
        avatarUrl: '',
    },
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { email, id, token, username, avatarUrl } = action.payload;
            state.user.email = email;
            state.user.id = id;
            state.user.token = token;
            state.user.username = username;
            state.user.avatarUrl = avatarUrl;
        },
        removeUser: (state) => {
            state.user.email = '';
            state.user.id = '';
            state.user.token = '';
            state.user.username = '';
            state.user.avatarUrl = '';
        },
    },
});

export const { setUser, removeUser } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
