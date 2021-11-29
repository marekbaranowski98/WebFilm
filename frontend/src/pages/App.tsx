import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import '../style/app.css';
import '../style/shape.css';
import '../style/input.css';
import '../style/form.css';
import {CurrentUserProvider} from '../context/CurrentUserContext';
import SEO from '../components/SEO';
import Header from '../containers/Header';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import RegisterPage from './RegisterPage';
import StatutePage from './StatutePage';
import Footer from '../components/Footer';
import ActivePage from './ActivePage';
import RequestResetPasswordPage from './RequestResetPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import AnonymousUserRoute from '../components/AnonymousUserRoute';
import LoggedUserRoute from '../components/LoggedUserRoute';
import UserPage from './UserPage/';
import {UserRole} from '../types/UserType';
import SettingsPage from './SettingsPage';
import MoviePage from './MoviePage';
import Search from '../components/Search';
import useWindowsDimensions from '../hooks/useWindowsDimensions';

interface App {
}

const App: React.FC<App> = ({}) => {
    const {heightWindow, widthWindow} = useWindowsDimensions();

    return (
        <CurrentUserProvider>
            <HelmetProvider>
                <SEO/>
                <BrowserRouter>
                    <Header/>
                    <div className="main-container">
                        {widthWindow < 600 && <Search/>}
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <AnonymousUserRoute exact={true} path={'/login/'} component={LoginPage}/>
                            <LoggedUserRoute exact={true} path={'/logout/'} component={LogoutPage}
                                             min_user_role={UserRole.User}/>
                            <AnonymousUserRoute exact={true} path={'/register/'} component={RegisterPage}/>
                            <Route exact path="/statute/" component={StatutePage}/>
                            <AnonymousUserRoute exact={true} path={'/active-user/:key/'} component={ActivePage}/>
                            <AnonymousUserRoute exact={true} path={'/reset-password'}
                                                component={RequestResetPasswordPage}/>
                            <AnonymousUserRoute exact={true} path={'/reset-password/:key/'}
                                                component={ResetPasswordPage}/>
                            <Route exact={true} path={'/user/:login/'} component={UserPage}/>
                            <LoggedUserRoute exact={true} path={'/settings/'} component={SettingsPage}
                                             min_user_role={UserRole.User}/>
                            <Route exact={true} path={'/movie/:movie_id/'} component={MoviePage}/>
                        </Switch>
                    </div>
                </BrowserRouter>
                <Footer/>
            </HelmetProvider>
        </CurrentUserProvider>
    );
};

export default App;
