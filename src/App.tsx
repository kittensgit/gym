import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

import Home from 'pages/Home';
import Blog from 'pages/Blog';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import Profile from 'pages/Profile';

import { useAuth } from 'hooks/useAuth';

const App: FC = () => {
    const { isAuth, username, id } = useAuth();
    return (
        <div className="app">
            <Header isAuth={isAuth} userId={id} username={username} />
            <main className="main_wrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                    <Route path="*" element={<div>Not found page</div>} />
                </Routes>
            </main>
            <Footer isAuth={isAuth} username={username} userId={id} />
        </div>
    );
};

export default App;
