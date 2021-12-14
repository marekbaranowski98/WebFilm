import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import './style.css';
import tv from '../../images/tv.svg';
import error from '../../images/error.svg';
import {RatingType, UserRatingIdentityType, UserRatingType} from '../../types/MovieType';
import {RedirectType} from '../../types/ErrorType';
import {putUserRatingForMovie, deleteUserRatingForMovie} from '../../helpers/api/evaluations/evaluationsCall';
import useCancelledPromise from '../../hooks/useCancelledPromise';

interface RatingPanelProps {
    movie: number,
    rating_movie: number,
    rating_estimate?: number,
}

const RatingPanel: React.FC<RatingPanelProps> = ({movie, rating_movie, rating_estimate}) => {
    const [rating, setRating] = useState(rating_movie);
    const [estimate, setEstimate] = useState(rating_estimate);
    const [block, setBlock] = useState(false);
    const [tmpRating, setTmpRating] = useState(0);
    const [movieToWatch, setMovieToWatch] = useState(false);
    const [url, setURL] = useState<RedirectType>();
    const {promise, cancelPromise} = useCancelledPromise();

    useEffect(() => {
        return () => {
            cancelPromise();
        };
    }, []);

    useEffect(() => {
        setTmpRating(rating);
    }, [rating]);

    const handlerUpdateRating = (e: React.MouseEvent) => {
        if (!block) {
            setBlock(true);
            const r = parseInt(e.currentTarget.getAttribute('data-key') || '0');
            setRating(r);

            let tmpRating: UserRatingType = {
                movie: movie,
                rating: r,
            }
            promise(putUserRatingForMovie(tmpRating)).then((r) => {
                let response = r as Response;

                if (response.status === 204) {
                    setEstimate(undefined);
                } else {
                    throw new Error();
                }
            }, (e) => {
                throw new Error();
            }).catch((e) => {
                setRating(0);
                setURL({
                    pathname: `/movie/${movie}`,
                    state: {
                        alertMessage: {
                            icon: error,
                            message: 'Coś poszło nie tak! Spróbuj ponownie później.',
                        },
                    },
                });
            }).then(() => {
                setBlock(false);
            });
        }
    };

    const handlerMouseEnter = (e: React.MouseEvent) => {
        if(!block) {
            setTmpRating(parseInt(e.currentTarget.getAttribute('data-key') || '0'));
        }
    };

    const handlerMouseLeave = (e: React.MouseEvent) => {
        if(!block) {
            setTmpRating(rating);
        }
    }

    const handlerClearRating = (e: React.MouseEvent) => {
        if(!block) {
            setBlock(true);
            let tmpRating: UserRatingIdentityType = {
                movie: movie,
            }
            promise(deleteUserRatingForMovie(tmpRating)).then((r) => {
                let response = r as Response;

                if (response.status === 200) {
                    response.json().then((j) => {
                        setRating(0);
                        setEstimate((j as RatingType).estimate);
                    })
                } else {
                    throw new Error();
                }
            }, (e) => {
                throw new Error();
            }).catch((e) => {
                setURL({
                    pathname: `/movie/${movie}`,
                    state: {
                        alertMessage: {
                            icon: error,
                            message: 'Coś poszło nie tak! Spróbuj ponownie później.',
                        },
                    },
                });
            }).then((f) => {
                setBlock(false);
            });
        }
    };

    return (
        <div className="movie-panel-rating">
            {url && <Redirect to={url}/>}
            {estimate ? <h4>Na {Math.round(estimate * 10)}% w twoim guście</h4> : <h4>Twoja ocena: {rating}/10</h4>}
            <div className="subpanel">
                <h3 className="container-login-button">
                    <div>Oceń</div>
                    {(rating != 0 && !block) &&
                    <div className="button close-menu-button small-cross" onClick={handlerClearRating}>
                        <div className="cross"/>
                    </div>
                    }
                </h3>
                <div>
                    {Array.from(Array(10).keys()).map(i =>
                        <span
                            key={i}
                            data-key={i + 1}
                            className={['star', 'click-star', tmpRating > i && 'icon-star', ].join(' ')}
                            onClick={handlerUpdateRating}
                            onMouseEnter={handlerMouseEnter}
                            onMouseLeave={handlerMouseLeave}
                        />
                    )}
                </div>
            </div>
            <div className="subpanel">
                <h3>Do obejrzenia</h3>
                <div
                    className={['movie-to-watch', movieToWatch && 'clicked-movie-to-watch'].join(' ')}
                    style={{backgroundImage: `url(${tv})`}}
                    onClick={(e) => setMovieToWatch(!movieToWatch)}
                />
            </div>
        </div>
    );
};

export default RatingPanel;
