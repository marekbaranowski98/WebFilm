import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import '../style/app.css';
import SEO from '../components/SEO';
import Header from '../containers/Header';
import MainContent from '../containers/MainContent';
import Footer from '../components/Footer';

interface App {

}

const App: React.FC<App> = () => {
    return (
        <div>
            <SEO />
            <Header />
            <div className="main-container">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={MainContent}/>
                    </Switch>
                </BrowserRouter>
            </div>
            <Footer />
        </div>
    );
};

export default App;
