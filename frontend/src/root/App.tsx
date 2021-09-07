import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import '../style/app.css';
import '../style/shape.css';
import '../style/input.css';
import {CurrentUserProvider} from '../context/CurrentUserContext';
import SEO from '../components/SEO';
import Header from '../containers/Header';
import MainContent from '../containers/MainContent';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import RegisterPage from '../pages/RegisterPage';
import Footer from '../components/Footer';

interface App {

}

const App: React.FC<App> = ({}) => {
    return (
        <CurrentUserProvider>
            <SEO />
            <BrowserRouter>
                <Header />
                <div className="main-container">
                    <Switch>
                        <Route exact path="/" component={MainContent}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/logout" component={LogoutPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
            <Footer />
        </CurrentUserProvider>
    );
};

export default App;
