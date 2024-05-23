import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
    const { email, id, token, username, avatarUrl } = useAppSelector(
        (state) => state.profile.user
    );
    return {
        isAuth: !!email,
        email,
        id,
        token,
        username,
        avatarUrl,
    };
};
