import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import './style.css';
import {AlertType, ResultType} from '../../types/ErrorType';
import Alert from '../../components/Alert';
import {getListLatestMovies, getTopMovies, getTopMoviesByName} from '../../helpers/api/movie/movieCall';
import MovieTile from '../../components/MovieTile';
import CarouselTiles from '../../containers/CarouselTiles';
import useListFilms from '../../hooks/useListFilms';

interface MainPageProps {
}

const MainPage: React.FC<MainPageProps> = ({}) => {
    const location = useLocation<ResultType>();
    const history = useHistory();
    const [notification, setNotification] = useState<AlertType>();
    const latestMovies = useListFilms({getMoviesList: getListLatestMovies});
    const topAllMovies = useListFilms({getMoviesList: getTopMovies});
    const topCountryMovies = useListFilms(
        {getMoviesList: () => {return getTopMoviesByName('countries', 'PL');}}
    );

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
            <CarouselTiles sizeTileInRem={10} infiniteLoop={true}
                           header="Najnowsze filmy" notification={latestMovies.notification}>
                {latestMovies.listMovies.map((x) =>
                    <MovieTile movie={x} key={x.id}/>
                )}
            </CarouselTiles>
            <CarouselTiles sizeTileInRem={10} infiniteLoop={true}
                           header="Najlepsze filmy" notification={topAllMovies.notification}>
                {topAllMovies.listMovies.map((x) =>
                    <MovieTile movie={x} key={x.id}/>
                )}
            </CarouselTiles>
            <CarouselTiles sizeTileInRem={10} infiniteLoop={true}
                           header="Polskie filmy" notification={topCountryMovies.notification}>
                {topCountryMovies.listMovies.map((x) =>
                    <MovieTile movie={x} key={x.id}/>
                )}
            </CarouselTiles>
        </div>
    );
};

export default MainPage;
