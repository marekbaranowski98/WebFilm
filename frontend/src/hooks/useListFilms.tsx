import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import error from '../images/error.svg';
import {MovieTileType} from '../types/MovieType';
import {getImage} from '../helpers/api/photo';
import useCancelledPromise from './useCancelledPromise';
import Alert from '../components/Alert';

interface useListFilmsProps {
    getMoviesList: () => Promise<unknown>,
}

const useListFilms = ({getMoviesList}: useListFilmsProps) => {
    const [listMovies, setListMovies] = useState<MovieTileType[]>([]);
    const [notificationNode, setNotificationNodeNode] = useState<React.ReactNode>(null);
    const {promise, cancelPromise} = useCancelledPromise();

    useEffect(() => {
        promise(getMoviesList()).then((res) => {
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
            setNotificationNodeNode(
                <Alert icon={error} message="Nie znaleziono filmów." />
            );
        });

        return () => {
            cancelPromise();
        };
    }, []);

   const downloadImagesMovies = async (movies: MovieTileType[]) => {
        const tmpListMovies: MovieTileType[] = [];

        for (let movie of movies) {
            movie.poster_url.poster = await getImage('movies', movie.poster_url.url);
            tmpListMovies.push(movie);
        }

        setListMovies(tmpListMovies);
    };

    return { listMovies, notificationNode };
};

export default useListFilms;
