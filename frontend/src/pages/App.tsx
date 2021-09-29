import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import '../style/app.css';
import '../style/shape.css';
import '../style/input.css';
import '../style/form.css';
import {CurrentUserProvider} from '../context/CurrentUserContext';
import SEO from '../components/SEO';
import Header from '../containers/Header';
import MainContent from '../containers/MainContent';
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

interface App {
}

const App: React.FC<App> = ({}) => {
    return (
        <CurrentUserProvider>
            <SEO/>
            <BrowserRouter>
                <Header/>
                <div className="main-container">
                    <Switch>
                        <Route exact path="/" component={MainContent}/>
                        <AnonymousUserRoute exact={true} path={'/login/'} component={LoginPage}/>
                        <LoggedUserRoute exact={true} path={'/logout/'} component={LogoutPage}
                                         min_user_role={UserRole.User}/>
                        <AnonymousUserRoute exact={true} path={'/register/'} component={RegisterPage}/>
                        <Route exact path="/statute/" component={StatutePage}/>
                        <AnonymousUserRoute exact={true} path={'/active-user/:key/'} component={ActivePage}/>
                        <AnonymousUserRoute exact={true} path={'/reset-password'} component={RequestResetPasswordPage}/>
                        <AnonymousUserRoute exact={true} path={'/reset-password/:key/'} component={ResetPasswordPage}/>
                        <Route exact={true} path={'/user/:login/'} component={UserPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
            <Footer/>
        </CurrentUserProvider>
    );
};

export default App;