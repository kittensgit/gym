import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import CreateArticleContent from 'components/createArticleContent/CreateArticleContent';

import { useAuth } from 'hooks/useAuth';

const CreateArticle: FC = () => {
    const { isAuth } = useAuth();
    return (
        <div className="container">
            {/* {isAuth ? <CreateArticleContent /> : <Navigate to={'/signin'} />} */}
            <CreateArticleContent />
        </div>
    );
};

export default CreateArticle;
