import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
    const { email, id, password, token, username } = useAppSelector(
        (state) => state.profile.user
    );
    return {
        isAuth: !!email,
        email,
        id,
        password,
        token,
        username,
    };
};
