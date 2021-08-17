import React from 'react';

import '../style/app.css';
import SEO from '../components/SEO';
import Head from '../containers/Head';

interface App {

}

const App: React.FC<App> = () => {
    return (
        <div className="mainContainer">
            <SEO />
            <Head />
        </div>
    );
};

export default App;
