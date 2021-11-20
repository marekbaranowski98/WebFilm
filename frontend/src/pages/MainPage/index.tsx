import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import './style.css';
import useWindowsDimensions from '../../hooks/useWindowsDimensions';
import Search from '../../components/Search';
import {AlertType, ResultType} from '../../types/ErrorType';
import Alert from '../../components/Alert';
import {getListLatestMovies} from '../../helpers/api/movie/movieCall';
import MovieTile from '../../components/MovieTile';
import CarouselTiles from '../../containers/CarouselTiles';
import useListFilms from '../../hooks/useListFilms';

interface MainPageProps {
}

const MainPage: React.FC<MainPageProps> = ({}) => {
    const {heightWindow, widthWindow} = useWindowsDimensions();
    const location = useLocation<ResultType>();
    const history = useHistory();
    const [notification, setNotification] = useState<AlertType>();
    const latestMovies = useListFilms({getMovieList: getListLatestMovies});

    useEffect(() => {
        if (location.state?.alertMessage) {
            setNotification(location.state?.alertMessage);
            history.replace({pathname: location.pathname, state: undefined});
        }
    }, []);

    return (
        <>
            {widthWindow < 600 && <Search/>}
            {notification && <Alert
                icon={notification.icon}
                message={notification.message}
            />}
            <CarouselTiles sizeTileInRem={10} infiniteLoop={true}
                           header={'Najnowsze filmy'} isError={latestMovies.isError}>
                {latestMovies.listMovies.map((x) =>
                    <MovieTile movie={x} key={x.id}/>
                )}
            </CarouselTiles>
        </>
    );
};

export default MainPage;
