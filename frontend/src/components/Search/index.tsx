import React, {useEffect, useRef, useState} from 'react';

import './style.css';
import {MovieSearch, MovieTileType} from '../../types/MovieType';
import {ErrorType} from '../../types/ErrorType';
import {getTopMovies} from '../../helpers/api/movie/movieCall';
import AutoHideOutsideClick from '../../helpers/AutoHideOutsideClick';
import useForm from '../../hooks/useForm';
import useCancelledPromise from '../../hooks/useCancelledPromise';
import {getImage} from '../../helpers/api/photo';
import MiniMovieTile from '../MiniMovieTile';


interface SearchProps {
}

const Search: React.FC<SearchProps> = ({}) => {
    const {promise, cancelPromise} = useCancelledPromise();
    const [listMovies, setListMovies] = useState<MovieTileType[]>([]);
    const wrapperSearchListMoviesRef = useRef<HTMLDivElement>(null);
    const [showListSearchMovies, setShowListSearchMovies] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            cancelPromise();
        };
    }, []);

    const validateSearch = async (
        {search}: MovieSearch,
        nameValidate?: string,
    ): Promise<boolean> => {
        switch (nameValidate) {
            case 'search':
                return Boolean(search) && search.length >= 3;
            default:
                return true;
        }
    };

    const sendRequestAuthToAPI = (form: MovieSearch, setErrors: (errors: ErrorType) => void): void => {
        promise(getTopMovies(form.search)).then((res) => {
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
                    setShowListSearchMovies(true)
                });
            }
        }, (e) => {
            setErrors({
                non_field_errors: e.message
            });
        });
    };

    const {updateValue, submitHandler, errors} = useForm({
        initialObject: {
            search: '',
        },
        validateObject: validateSearch,
        sendRequestToAPI: sendRequestAuthToAPI,
    });

    const downloadImagesMovies = async (movies: MovieTileType[]) => {
        const tmpListMovies: MovieTileType[] = [];

        for (let movie of movies) {
            movie.poster_url.poster = await getImage('movies', movie.poster_url.url);
            tmpListMovies.push(movie);
        }

        setListMovies(tmpListMovies);
    };

    AutoHideOutsideClick(wrapperSearchListMoviesRef, showListSearchMovies, setShowListSearchMovies);

    return (
        <div className="container-panel-search">
            <form className="container-search" onSubmit={submitHandler}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Szukaj"
                    name="search"
                    tabIndex={0}
                    onChange={updateValue}
                    autoFocus
                />
                <button className="button search-button" tabIndex={0} disabled={
                    Object.keys(errors).filter((x) => x !== 'non_field_errors').length > 0
                }>
                    <div className="magnifying-glass" tabIndex={0}/>
                </button>
            </form>
            {showListSearchMovies &&
                <div className="container-list-search" ref={wrapperSearchListMoviesRef}>
                    {listMovies.map(movie =>
                        <MiniMovieTile key={movie.id} movie={movie} setShowListSearch={setShowListSearchMovies}/>)
                    }
                </div>
            }
        </div>
    );
}

export default Search;
