import { FC } from 'react';

import HomeContent from 'components/homeContent/HomeContent';

import { useAuth } from 'hooks/useAuth';

const Home: FC = () => {
    const { id } = useAuth();
    return (
        <>
            <HomeContent />
        </>
    );
};

export default Home;
