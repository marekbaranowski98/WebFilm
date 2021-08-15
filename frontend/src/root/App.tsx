import React from 'react';

import '../style/app.css';
import SEO from '../components/SEO';
import Head from '../components/Head';

const App = () => {
    return (
        <div className="mainContainer">
            <SEO />
            <Head />
        </div>
    );
};

export default App;
