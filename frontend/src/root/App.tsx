import React from 'react';

import '../style/app.css';
import SEO from '../components/SEO';
import Head from '../containers/Head';

const App = () => {
    return (
        <div className="mainContainer">
            <SEO />
            <Head />
        </div>
    );
};

export default App;
