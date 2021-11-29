import React from 'react';
import {Helmet} from 'react-helmet-async';

interface StatutePageProps {

}

const StatutePage: React.FC<StatutePageProps> = ({}) => {
    return (
        <main className="main-content">
            <Helmet>
                <title>Regulamin - WebFilm</title>
            </Helmet>
            <article className="content-container">
                <h2>Polityka prywatności serwisu</h2>
                <p>Treść regulaminu</p>
            </article>
        </main>
    );
}

export default StatutePage;
