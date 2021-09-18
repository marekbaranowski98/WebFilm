import React from 'react';

import './style.css';

interface StatutePageProps {

}

const StatutePage: React.FC<StatutePageProps> = ({}) => {
    return(
        <main>
            <article className="statute-container">
               <h2>Polityka prywatności serwisu</h2>
                <p>Treść regulaminu</p>
            </article>
        </main>
    );
}

export default StatutePage;
