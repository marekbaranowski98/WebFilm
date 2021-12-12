import React from 'react';

import './style.css';
import {PersonType} from '../../types/MovieType';

interface PersonTileProps {
    person: PersonType,
    describe: string
}

const PersonTile: React.FC<PersonTileProps> = ({person, describe}) => {
    return (
        <div className="person-tile">
            <div className="person-avatar">
                <img src={person.poster_url[0].poster} alt={['Zdjęcie', person.name, person.surname].join(' ')} />
            </div>
            <div className="person-identity-tile">
                <p className="person-name">{person.name} {person.surname}</p>
                <p className="describe-tile">{describe}</p>
            </div>
        </div>
    );
};

export default PersonTile;
