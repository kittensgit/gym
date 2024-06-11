import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import Loading from 'components/common/loading/Loading';

import {
    LazyArticlePage,
    LazyBlogPage,
    LazyCreateArticlePage,
    LazyHomePage,
    LazyProfilePage,
    LazySignInPage,
    LazySignUpPage,
    LazyUserArticlesPage,
    LazyWorkoutPage,
} from 'lazy';

import { useAuth } from 'hooks/useAuth';

const App: FC = () => {
    const { isAuth, username, id, avatarUrl } = useAuth();
    return (
        <div className="app">
            <Header isAuth={isAuth} userId={id} avatarUrl={avatarUrl} />
            <main className="main_wrapper">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<LazyHomePage />} />
                        <Route path="/gym" element={<LazyHomePage />} />
                        <Route path="/blog" element={<LazyBlogPage />} />
                        <Route
                            path="/create"
                            element={<LazyCreateArticlePage />}
                        />
                        <Route
                            path="/article/:articleId"
                            element={<LazyArticlePage />}
                        />
                        <Route path="/signup" element={<LazySignUpPage />} />
                        <Route path="/signin" element={<LazySignInPage />} />
                        <Route
                            path="/profile/:userId"
                            element={<LazyProfilePage />}
                        >
                            <Route path="" element={<LazyWorkoutPage />} />
                            <Route
                                path="articles"
                                element={<LazyUserArticlesPage />}
                            />
                        </Route>
                        <Route path="*" element={<div>Not found page</div>} />
                    </Routes>
                </Suspense>
            </main>
            <Footer isAuth={isAuth} username={username} userId={id} />
        </div>
    );
};

export default App;
