import React, {useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, useParams} from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';

import './style.css';
import error from '../../images/error.svg';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {MovieType, PosterType} from '../../types/MovieType';
import {getMovieDescribe} from '../../helpers/api/movie/movieCall';
import {getImage} from '../../helpers/api/photo';
import {convertMinuteToHourMinute} from '../../helpers/calc';
import RatingPanel from '../../components/RatingPanel';
import ListTiles from '../../containers/ListTiles';
import PersonTile from '../../components/PersonTile';
import {DEFAULT_UUID} from '../../helpers/ConstType'
import PhotoTile from '../../components/PhotoTile';
import {AlertType} from '../../types/ErrorType';
import Alert from '../../components/Alert';
import {UserRole} from '../../types/UserType';

interface MoviePageProps {
}

interface MoviePageParam {
    movie_id: string,
}

const MoviePage: React.FC<MoviePageProps> = () => {
    const {movie_id} = useParams<MoviePageParam>();
    const userContext = useContext(CurrentUserContext);
    const [movie, setMovie] = useState<MovieType>();
    const [userIsLogged, setUserIsLogged] = useState<boolean>(false);
    const [notification, setNotification] = useState<AlertType>()
    const [galleryMovie, setGalleryMovie] = useState<PosterType[]>([]);

    useEffect(() => {
        getMovieDescribe(movie_id).then((res) => {
            let response = res as Response;

            if (response.status === 200) {
                response.json().then(async (m) => {
                    let tmpMovie = m
                    tmpMovie.release_date = new Date(tmpMovie.release_date);
                    setMovie(tmpMovie);

                    const tmpGallery: PosterType[] = [];
                    for (let tmp of tmpMovie.poster_url) {
                        tmp.poster = await getImage('movies', tmp.url);
                        if (tmp.url !== DEFAULT_UUID) {
                            tmpGallery.push(tmp);
                        }
                    }
                    setMovie(undefined);
                    setMovie(tmpMovie);
                    setGalleryMovie(tmpGallery);

                    for (let tmpCast of tmpMovie.cast) {
                        for (let tmpPoster of tmpCast.person.poster_url) {
                            tmpPoster.poster = await getImage('people', tmpPoster.url);
                        }
                    }
                    setMovie(undefined);
                    setMovie(tmpMovie);

                    for (let tmpCrew of tmpMovie.crew) {
                        for (let tmpPoster of tmpCrew.person.poster_url) {
                            tmpPoster.poster = await getImage('people', tmpPoster.url);
                        }
                    }
                    setMovie(undefined);
                    setMovie(tmpMovie);
                });
            } else {
                throw new Error();
            }
        }, (e) => {
            throw new Error();
        }).catch((e) => {
            setNotification({
                icon: error,
                message: 'Nie znaleziono szukanego filmu',
            })
        });
    }, [movie_id]);

    useEffect(() => {
        userContext?.checkIsUserLogged().then((r) => {
            if (r > UserRole.AnonymousUser) {
                setUserIsLogged(true);
            }else {
                throw new Error();
            }
        }, () => {
            throw new Error();
        }).catch(() =>
            setUserIsLogged(false)
        );
    }, [userContext]);

    return (
        <>
            {movie ?
                <>
                    <Helmet>
                        <title>{movie.title} - WebFilm</title>
                    </Helmet>
                    <header className="header-movie" style={{
                        backgroundImage:
                            movie.poster_url[1]?.url !== DEFAULT_UUID ? `url(${movie.poster_url[1]?.poster})` : '',
                    }}>
                        <img src={movie.poster_url[0]?.poster}/>
                        <div className="short-movie-info">
                            <h2 className="title-movie">{movie.title}</h2>
                            <div className="movie-info-line">
                                {movie.original_title && <span>{movie.original_title}</span>}
                                {movie.release_date && <span>{movie.release_date.getFullYear()}</span>}
                                {movie.collection && <span>{movie.collection.name}</span>}
                            </div>
                            <div className="movie-info-line">
                                {movie.average_vote &&
                                <>
                                    <div className="star icon-star"/>
                                    <span>{movie.average_vote}</span>
                                </>
                                }
                                {movie.count_vote && <span>{movie.count_vote} ocen</span>}
                            </div>
                        </div>
                    </header>
                    <article className="movie-describe">
                        {movie.tagline && <h3>{movie.tagline}</h3>}
                        <div className="movie-primary-info-rating">
                            <div className="settings-grid">
                                {movie.genres &&
                                <>
                                    <div>Gatunki:</div>
                                    <div>{movie.genres.map(g =>
                                        <span
                                            className="element-movie-list element-list-describe-movie"
                                            key={g.id}
                                        >
                                            {g.name}
                                        </span>
                                    )}</div>
                                </>
                                }
                                {movie.release_date &&
                                <>
                                    <div>Premiera:</div>
                                    <div>{movie.release_date.toLocaleDateString()}</div>
                                </>
                                }
                                {movie.production_countries.length > 0 &&
                                <>
                                    <div>Produkcja:</div>
                                    <div>
                                        <span
                                            className="element-movie-list element-list-describe-movie"
                                        >
                                            <ReactCountryFlag
                                                countryCode={movie.production_countries[0].iso_3166_1}
                                                style={{fontSize: '2rem', lineHeight: '2rem',}}
                                            />
                                        </span>
                                    </div>
                                </>
                                }
                                {movie.runtime &&
                                <>
                                    <div>Czas trwania:</div>
                                    <div>{convertMinuteToHourMinute(movie.runtime)}</div>
                                </>
                                }
                            </div>
                            {userIsLogged && <RatingPanel/>}
                        </div>
                        {movie.overview &&
                        <div>
                            <h3>Opis</h3>
                            <div className="movie-overview">{movie.overview}</div>
                        </div>
                        }
                        {movie.cast.length > 0 &&
                        <ListTiles header="Obsada filmu">
                            {movie.cast.map(c =>
                                <PersonTile key={c.id} person={c.person} describe={c.character}/>
                            )}
                        </ListTiles>
                        }
                        {movie.crew.length > 0 &&
                        <ListTiles header="Twórcy filmu">
                            {movie.crew.map(c =>
                                <PersonTile key={c.id} person={c.person} describe={c.job}/>
                            )}
                        </ListTiles>
                        }
                        {galleryMovie?.length > 0 &&
                        <ListTiles header="Galeria zdjęć">
                            {galleryMovie.map(p =>
                                <PhotoTile key={p.url} poster={p.poster}/>
                            )}
                        </ListTiles>
                        }
                        <h2>Dodatkowe informacje</h2>
                        <div className="settings-grid">
                            {movie.original_language &&
                            <>
                                <div>Oryginalny język:</div>
                                <div>{movie.original_language.name}</div>
                            </>
                            }
                            {movie.spoken_languages &&
                            <>
                                <div>Języki:</div>
                                <div className="list-info-movie">
                                    {movie.spoken_languages.map(language =>
                                        <span className="element-movie-list" key={language.iso_639_1}>
                                            {language.iso_639_1}
                                        </span>
                                    )}
                                </div>
                            </>
                            }
                            {movie.production_countries.length > 0 &&
                            <>
                                <div>Kraje:</div>
                                <div>
                                    {movie.production_countries.map(country =>
                                        <span
                                            className="element-movie-list"
                                            key={country.iso_3166_1}
                                        >
                                            <ReactCountryFlag
                                                countryCode={country.iso_3166_1}
                                                style={{
                                                    fontSize: '2rem',
                                                    lineHeight: '2rem',
                                                }}
                                            />
                                        </span>
                                    )}
                                </div>
                            </>
                            }
                            {movie.production_companies.length > 0 &&
                            <>
                                <div>Producenci:</div>
                                <div className="list-info-movie">
                                    {movie.production_companies.map(company =>
                                        <span className="element-movie-list" key={company.id}>
                                            {company.name}
                                        </span>
                                    )}
                                </div>
                            </>
                            }
                            <div>Budżet:</div>
                            <div>{movie.budget > 0 ? <>{movie.budget} $</> : '-'}</div>
                            <div>Przychody:</div>
                            <div>{movie.revenue > 0 ? <>{movie.revenue} $</> : '-'}</div>
                            {movie.homepage &&
                            <>
                                <div>Strona domowa:</div>
                                <Link to={{pathname: movie.homepage}} target="_blank">Kliknij tutaj</Link>
                            </>
                            }
                            {movie.keywords.length > 0 &&
                            <>
                                <div>Słowa kluczowe:</div>
                                <div className="list-info-movie">
                                    {movie.keywords.map(keyword =>
                                        <span className="element-movie-list" key={keyword.id}>
                                            {keyword.name}
                                        </span>
                                    )}
                                </div>
                            </>
                            }
                        </div>
                    </article>
                </>
                : notification ?
                    <Alert icon={notification.icon} message={notification.message}/>
                    :
                    <h2 className="loading-movie">Trwa wczytywanie...</h2>
            }
        </>
    );
}

export default MoviePage;
