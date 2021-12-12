import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import './style.css';
import {AlertType, ResultType} from '../../types/ErrorType';
import {MovieTileType} from '../../types/MovieType';
import Alert from '../../components/Alert';
import MovieTile from '../../components/MovieTile';
import {
    getListLatestMovies,
    getPremiereMovies,
    getTopMovies,
    getTopMoviesByName
} from '../../helpers/api/movie/movieCall';
import CarouselTiles from '../../containers/CarouselTiles';
import useListFilms from '../../hooks/useListFilms';

interface MainPageProps {
}

const MainPage: React.FC<MainPageProps> = ({}) => {
    const location = useLocation<ResultType>();
    const history = useHistory();
    const [notification, setNotification] = useState<AlertType>();
    const carouselListMovies: {
        list: { listMovies: MovieTileType[], notification: AlertType | null }, header: string,
    }[] = [
        {list: useListFilms({getMoviesList: getListLatestMovies,},), header: 'Najnowsze filmy',},
        {list: useListFilms({getMoviesList: getTopMovies,},), header: 'Najlepsze filmy',},
        {
            list: useListFilms({
                getMoviesList: () => {
                    return getTopMoviesByName('countries', 'PL');
                }
            }),
            header: 'Polskie filmy',
        },
        {list: useListFilms({getMoviesList: getPremiereMovies,},), header: 'Nadchodzące premiery',},
    ];

    useEffect(() => {
        if (location.state?.alertMessage) {
            setNotification(location.state?.alertMessage);
            history.replace({pathname: location.pathname, state: undefined});
        }
    }, []);

    return (
        <div className="main-content">
            <Helmet>
                <title>WebFilm</title>
            </Helmet>
            {notification && <Alert
                icon={notification.icon}
                message={notification.message}
            />}
            {carouselListMovies.map(
                (movies, index) =>
                    <CarouselTiles sizeTileInRem={10} infiniteLoop={true} key={index}
                                   header={movies.header} notification={movies.list.notification}>
                        {movies.list.listMovies.map(x =>
                            <MovieTile movie={x} key={x.id}/>
                        )}
                    </CarouselTiles>
            )}
        </div>
    );
};

export default MainPage;
