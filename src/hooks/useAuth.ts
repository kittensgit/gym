export const useAuth = () => {
    if (localStorage.getItem('user')) {
        const { email, id, token, username, avatarUrl } = JSON.parse(
            localStorage.getItem('user')!
        );
        return {
            isAuth: !!email,
            email,
            id,
            token,
            username,
            avatarUrl,
        };
    } else {
        return {
            isAuth: false,
        };
    }
};
