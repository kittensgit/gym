import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

const Profile: FC = () => {
    const { isAuth } = useAuth();

    return (
        <div className="container">
            {isAuth ? <div>Profile</div> : <Navigate replace to={'/signin'} />}
        </div>
    );
};

export default Profile;
