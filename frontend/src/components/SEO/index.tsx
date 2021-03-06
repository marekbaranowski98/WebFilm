import React from 'react';
import {Helmet} from 'react-helmet-async';

import icon from '../../images/logo.svg';

interface SEOProps {
}

const SEO: React.FC<SEOProps> = ({}) => {
    return (
        <Helmet>
            <link
                rel="icon"
                type="image/svg+xml"
                href={icon}
            />
            <link
                rel="mask-icon"
                href={icon}
                color="#1755B3"
            />
            <meta
                name="author"
                content="Marek Baranowski"
            />
            <meta
                name="keywords"
                content="film,wyszukiwarka filmów, katalog filmów,praca dyplomowa,ranking filmów, sugerowanie filmów"
            />
            <meta
                name="desciption"
                content="Projekt związany z pracą dyplomową pisaną w 2021 roku 'Projekt i realizacja serwisu rekomendującego produkcje filmowe.'"
            />
            <meta
                name="robots"
                content="index"
            />
        </Helmet>
    );
};

export default SEO;
