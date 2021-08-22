import React from 'react';

import '../style/app.css';
import SEO from '../components/SEO';
import Head from '../containers/Head';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

interface App {

}

const App: React.FC<App> = () => {
    return (
        <div>
            <SEO />
            <Head />
            <MainContent />
            <Footer />
        </div>
    );
};

export default App;
