import React from 'react';

import './style.css';
import {MovieTileType} from '../../types/MovieType';

interface MovieTileProps {
    movie: MovieTileType
}


const MovieTile: React.FC<MovieTileProps> = ({movie}) => {
    return (
        <div className="movie-tile">
            <div className="poster-movie-tile">
                <img src={movie.posterURL.poster} alt="Plakat filmowy"/>
            </div>
            <div className="title-movie-tile">{movie.title}</div>
        </div>
    );
};

export default MovieTile;
