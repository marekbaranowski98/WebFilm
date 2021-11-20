import React, {useEffect, useState} from 'react';
import {MovieTileType} from '../types/MovieType';
import {getImage} from '../helpers/api/photo';

interface useListFilmsProps {
    getMovieList: () => Promise<unknown>,
}

const useListFilms = ({getMovieList}: useListFilmsProps) => {
    const [listMovies, setListMovies] = useState<MovieTileType[]>([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getMovieList().then((res) => {
            let r = res as Response;
            if (r.status === 200) {
                r.json().then(async (movies) => {
                    setListMovies(movies);
                    await downloadImagesMovies(movies);
                });
            } else {
                throw new Error;
            }
        }, () => { throw new Error; }).catch(() => {
            setIsError(true)
        });
    }, []);

   const downloadImagesMovies = async (movies: MovieTileType[]) => {
        const tmpListMovies: MovieTileType[] = [];

        for (let movie of movies) {
            movie.posterURL.poster = await getImage('movies', movie.posterURL.url);
            tmpListMovies.push(movie);
        }

        setListMovies(tmpListMovies);
    };

    return { listMovies, isError };
};

export default useListFilms;
