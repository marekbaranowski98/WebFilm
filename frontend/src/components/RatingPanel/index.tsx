import React, {useState} from 'react';

import './style.css';
import tv from '../../images/tv.svg';

interface RatingPanelProps {
}

const RatingPanel: React.FC<RatingPanelProps> = ({}) => {
    const [rating, setRating] = useState(0);
    const [tmpRating, setTmpRating] = useState(0);
    const [movieToWatch, setMovieToWatch] = useState(false);

    const handlerUpdateRating = (e: React.MouseEvent) => {
        let tmp = parseInt(e.currentTarget.getAttribute('data-key') || '0');
        setRating(tmp);
        setTmpRating(tmp)
    };

    const handlerMouseEnter = (e: React.MouseEvent) => {
        setTmpRating(parseInt(e.currentTarget.getAttribute('data-key') || '0'));
    };

    const handlerMouseLeave = (e: React.MouseEvent) => {
        setTmpRating(rating);
    }

    const handlerClearRating = (e: React.MouseEvent) => {
        setRating(0);
        setTmpRating(0);
    };

    return (
        <div className="movie-panel-rating">
            <h4>Na 90% w twoim guście</h4>
            <div className="subpanel">
                <h3 className="container-login-button">
                    <div>Oceń</div>
                    {rating != 0 &&
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
                            className={['star', 'click-star', tmpRating > i ? 'icon-star' : ''].join(' ')}
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
