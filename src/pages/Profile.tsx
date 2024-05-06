import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import ProfileContent from 'components/profileContent/ProfileContent';

import { useAuth } from 'hooks/useAuth';

const Profile: FC = () => {
    const { isAuth, username, id } = useAuth();

    return (
        <>
            {isAuth ? (
                <ProfileContent userId={id} username={username} />
            ) : (
                <Navigate replace to={'/signin'} />
            )}
        </>
    );
};

export default Profile;
