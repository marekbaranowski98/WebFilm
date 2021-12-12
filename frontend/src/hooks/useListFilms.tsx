import React, {useEffect, useState} from 'react';

import error from '../images/error.svg';
import {MovieTileType} from '../types/MovieType';
import {getImage} from '../helpers/api/photo';
import {AlertType} from '../types/ErrorType';

interface useListFilmsProps {
    getMoviesList: () => Promise<unknown>,
}

const useListFilms = ({getMoviesList}: useListFilmsProps) => {
    const [listMovies, setListMovies] = useState<MovieTileType[]>([]);
    const [notification, setNotification] = useState<AlertType | null>(null);

    useEffect(() => {
        getMoviesList().then((res) => {
            let r = res as Response;
            if (r.status === 200) {
                r.json().then(async (movies) => {
                    const tmpMovies = [];

                    for (let m of movies) {
                        let tmpMovie = m;
                        tmpMovie.release_date = new Date(tmpMovie.release_date);
                        tmpMovies.push(tmpMovie)
                    }
                    setListMovies(tmpMovies);
                    await downloadImagesMovies(tmpMovies);
                });
            } else {
                throw new Error();
            }
        }, () => { throw new Error(); }).catch((e) => {
            setNotification({
                icon: error,
                message: 'Nie znaleziono filmów.',
            });
        });
    }, []);

   const downloadImagesMovies = async (movies: MovieTileType[]) => {
        const tmpListMovies: MovieTileType[] = [];

        for (let movie of movies) {
            movie.poster_url.poster = await getImage('movies', movie.poster_url.url);
            tmpListMovies.push(movie);
        }

        setListMovies(tmpListMovies);
    };

    return { listMovies, notification };
};

export default useListFilms;
